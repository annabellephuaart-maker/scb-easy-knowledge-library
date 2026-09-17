#!/usr/bin/env node
/**
 * Zips the portable build for sharing through Box.
 *
 * Named with the build date so a colleague can tell at a glance whether the
 * copy they were sent is the current one — the weakness of sharing a folder
 * rather than a URL.
 */
import { execFileSync } from 'node:child_process';
import { rmSync, statSync } from 'node:fs';

const stamp = new Date().toISOString().slice(0, 10);
const out = `scb-easy-knowledge-library-${stamp}.zip`;

rmSync(out, { force: true });
execFileSync('zip', ['-qr', out, 'dist'], { stdio: 'inherit' });

const mb = (statSync(out).size / 1e6).toFixed(1);
console.log(`zip-folder: ${out} (${mb} MB)`);
console.log('  upload to Box, colleagues unzip and open dist/index.html');
