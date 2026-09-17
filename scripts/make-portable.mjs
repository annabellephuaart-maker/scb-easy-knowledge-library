#!/usr/bin/env node
/**
 * Makes the built site openable from a folder, with no server.
 *
 * Astro builds for a web server: links are absolute (`/studies/…`) and pages
 * are directories served by an implicit `index.html`. Neither works from
 * `file://` — absolute paths resolve to the filesystem root, and a link to a
 * directory shows a listing or nothing.
 *
 * This rewrites the built output in place so it can be zipped, dropped in
 * Box, unzipped and opened by double-clicking `index.html`:
 *
 *   /studies/foo/   ->  ../../studies/foo/index.html
 *   /screens/x.jpg  ->  ../../screens/x.jpg
 *   /              ->  ../../index.html
 *
 * Interactivity survives because the site's scripts are inline modules with no
 * imports, so nothing is fetched at runtime. Google Fonts still need a
 * connection; without one the pages fall back to system fonts.
 *
 *   node scripts/make-portable.mjs [dist-dir]
 */

import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, dirname, sep } from 'node:path';

const DIST = process.argv[2] ?? 'dist';

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

/** A path with no extension on its last segment is a page, not an asset. */
const isPage = (path) => !/\.[a-z0-9]+$/i.test(path.replace(/\/$/, ''));

let files = 0;
let rewrites = 0;

for (const file of walk(DIST)) {
  const isHtml = file.endsWith('.html');
  const isCss = file.endsWith('.css');
  if (!isHtml && !isCss) continue;

  const depth = relative(DIST, dirname(file)).split(sep).filter(Boolean).length;
  const prefix = depth === 0 ? './' : '../'.repeat(depth);

  let text = readFileSync(file, 'utf8');
  const before = text;

  if (isHtml) {
    // href="/…" and src="/…", but not "//host" (protocol-relative).
    text = text.replace(/(href|src)="\/(?!\/)([^"]*)"/g, (_m, attr, path) => {
      rewrites += 1;
      if (path === '') return `${attr}="${prefix}index.html"`;
      if (attr === 'href' && isPage(path)) {
        return `${attr}="${prefix}${path.replace(/\/$/, '')}/index.html"`;
      }
      return `${attr}="${prefix}${path}"`;
    });
  }

  if (isCss) {
    text = text.replace(/url\(\/(?!\/)([^)"']*)\)/g, (_m, path) => {
      rewrites += 1;
      return `url(${prefix}${path})`;
    });
  }

  if (text !== before) {
    writeFileSync(file, text);
    files += 1;
  }
}

console.log(`make-portable: rewrote ${rewrites} references across ${files} file(s) in ${DIST}`);
console.log('  open index.html directly — no server needed');
