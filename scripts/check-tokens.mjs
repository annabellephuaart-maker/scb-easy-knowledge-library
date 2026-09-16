#!/usr/bin/env node
/**
 * Token conformance check.
 *
 * Fails the build when a stylesheet or component references a CSS custom
 * property that the token layer does not define.
 *
 * This exists because of a real failure: the token layer was renamed from
 * Carbon's `--p-spacing-*` to `--p-space-*`, one consumer kept the old names,
 * and nothing complained. Undefined CSS variables do not error — the
 * declaration is simply dropped. The result was a metadata strip whose gap,
 * padding and margin silently disappeared, which looked like a layout bug
 * rather than a rename.
 *
 * Variables set at runtime by script (--lane, --lanes) are exempt: they are
 * assigned inline and always read with a fallback.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const TOKENS = 'src/styles/tokens.css';
const ROOT = 'src';
const RUNTIME_SET = new Set(['--lane', '--lanes']);

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const defined = new Set(
  [...readFileSync(TOKENS, 'utf8').matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1])
);

const problems = [];
for (const file of walk(ROOT)) {
  if (!['.astro', '.css'].includes(extname(file))) continue;
  const text = readFileSync(file, 'utf8');
  text.split('\n').forEach((line, i) => {
    for (const match of line.matchAll(/var\((--[a-z0-9-]+)/g)) {
      const name = match[1];
      if (defined.has(name) || RUNTIME_SET.has(name)) continue;
      problems.push(`${file}:${i + 1}  ${name} is not defined in ${TOKENS}`);
    }
  });
}

if (problems.length) {
  console.error(`check-tokens: ${problems.length} undefined token reference(s)\n`);
  problems.forEach((p) => console.error('  ' + p));
  console.error(`\nDefine it in ${TOKENS}, or use an existing token.`);
  process.exit(1);
}

console.log(`check-tokens: ok — ${defined.size} tokens defined, no undefined references`);
