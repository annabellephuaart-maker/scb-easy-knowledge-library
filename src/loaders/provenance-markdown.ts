import type { Loader, LoaderContext } from 'astro/loaders';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';

/**
 * Loader for product-context markdown.
 *
 * Every artefact in product-context carries a provenance header as an HTML
 * comment ABOVE its YAML frontmatter:
 *
 *     <!-- artifact: … | mode: … | updated: … | evidence: … -->
 *     ---
 *     id: STU-001
 *     ---
 *
 * That ordering is the house convention and it is what makes staleness
 * visible. It also means the frontmatter is not the first thing in the file,
 * so Astro's stock glob loader never sees it.
 *
 * The site adapts to the source, not the other way round. This loader lifts
 * the provenance comment out, parses it into `data.provenance`, then hands the
 * remainder on as an ordinary frontmatter document.
 */

const PROVENANCE = /^\s*<!--\s*artifact:(?<body>[\s\S]*?)-->\s*/;
const FRONTMATTER = /^---\r?\n(?<yaml>[\s\S]*?)\r?\n---\r?\n?/;

export interface ProvenanceMarkdownOptions {
  /** Directory to read, relative to the project root. */
  base: string;
}

function parseProvenance(body: string): Record<string, string> {
  // `artifact: x | mode: y | updated: z | evidence: w`
  const out: Record<string, string> = {};
  for (const part of body.split('|')) {
    const idx = part.indexOf(':');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (key) out[key] = value;
  }
  return out;
}

async function walk(dir: string): Promise<string[]> {
  const found: string[] = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return found;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.git' || entry.name === 'node_modules') continue;
      found.push(...(await walk(full)));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      found.push(full);
    }
  }
  return found;
}

export function provenanceMarkdown(options: ProvenanceMarkdownOptions): Loader {
  return {
    name: 'provenance-markdown',
    async load(context: LoaderContext) {
      const { store, parseData, renderMarkdown, config, logger, watcher } = context;

      const root = fileURLToPath(config.root);
      const baseDir = path.resolve(root, options.base);

      const files = await walk(baseDir);
      store.clear();

      for (const file of files) {
        const raw = await readFile(file, 'utf8');

        let rest = raw;
        let provenance: Record<string, string> | undefined;

        const provMatch = rest.match(PROVENANCE);
        if (provMatch?.groups) {
          provenance = parseProvenance('artifact:' + provMatch.groups.body);
          rest = rest.slice(provMatch[0].length);
        }

        const fmMatch = rest.match(FRONTMATTER);
        let frontmatter: Record<string, unknown> = {};
        if (fmMatch?.groups) {
          try {
            frontmatter = (parseYaml(fmMatch.groups.yaml) as Record<string, unknown>) ?? {};
          } catch (error) {
            logger.warn(
              `provenance-markdown: could not parse frontmatter in ${path.relative(baseDir, file)} — ${String(error)}`
            );
          }
          rest = rest.slice(fmMatch[0].length);
        }

        const id = path
          .relative(baseDir, file)
          .replace(/\.md$/, '')
          .split(path.sep)
          .join('/');

        // The page chrome renders the title from frontmatter, so a leading H1
        // in the body would show it twice. Drop it; keep every other heading.
        rest = rest.replace(/^\s*#\s+.*\r?\n/, '');

        // Astro requires filePath to be relative to the project root. The
        // content lives in a sibling repo, so this is a `../` path.
        const relPath = path.relative(root, file).split(path.sep).join('/');

        const data = await parseData({
          id,
          data: { ...frontmatter, provenance },
          filePath: relPath,
        });

        const rendered = await renderMarkdown(rest);

        store.set({ id, data, rendered, filePath: relPath, body: rest });
      }

      // Rebuild when the source markdown changes, so `astro dev` stays live
      // against product-context.
      watcher?.add(baseDir);
      logger.info(`Loaded ${files.length} artefact(s) from ${options.base}`);
    },
  };
}
