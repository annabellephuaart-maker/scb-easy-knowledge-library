#!/usr/bin/env node
/**
 * Zips the published library so it can be sent to someone.
 *
 * The library is 39 HTML pages plus its images. Sending one .html file gives
 * the recipient the first page and a dead link on every navigation — the other
 * pages simply are not on their machine. The whole folder has to travel.
 *
 * The zip lands beside the Knowledge Library folder, in Box, so it can be
 * shared by link without a separate upload.
 *
 *   node scripts/package-library.mjs
 */

import { execFileSync } from 'node:child_process';
import { rmSync, statSync, existsSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';

const LIBRARY = resolve('..', '..', 'Knowledge Library');

if (!existsSync(LIBRARY)) {
  console.error('package-library: no Knowledge Library — run `npm run publish` first');
  process.exit(1);
}

const stamp = new Date().toISOString().slice(0, 10);
const out = resolve(dirname(LIBRARY), `SCB Easy Knowledge Library ${stamp}.zip`);

rmSync(out, { force: true });

// Zip the folder itself, not its contents, so unzipping produces one tidy
// folder rather than scattering 39 pages into the recipient's Downloads.
execFileSync('zip', ['-qr', out, basename(LIBRARY)], { cwd: dirname(LIBRARY) });

console.log(`package-library: ${basename(out)} (${(statSync(out).size / 1e6).toFixed(1)} MB)`);
console.log(`  ${out}`);
console.log('  Send the whole zip. Recipients unzip it, then open index.html inside.');
