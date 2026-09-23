#!/usr/bin/env node
/**
 * Publishes the portable build into the Box-synced folder, beside the project.
 *
 * The workspace already lives in Box, so there is nothing to upload — Box syncs
 * the filesystem. This copies the built site out of `product-codebase/dist`,
 * which is buried and git-ignored, into a folder colleagues can find:
 *
 *   SCB Easy/AI Folder/Knowledge Library/index.html
 *
 * Run it after changing research or the site. Colleagues get the update when
 * Box syncs; nobody re-downloads anything.
 *
 *   node scripts/publish-library.mjs [target]
 */

import { cpSync, rmSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const DIST = 'dist';

/**
 * Two destinations, written together from one build so they cannot drift.
 *
 *  library/            inside the repo, tracked by git. This is what colleagues
 *                      download from GitHub, and what GitHub Desktop shows as
 *                      changes to commit.
 *  ../../Knowledge Library/   beside the project in Box, for anyone who reaches
 *                      the work through Box rather than GitHub.
 */
const TARGETS = process.argv[2]
  ? [resolve(process.argv[2])]
  : [resolve('library'), resolve('..', '..', 'Knowledge Library')];

if (!existsSync(DIST)) {
  console.error('publish-library: no dist/ — run `npm run build` first');
  process.exit(1);
}

const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');

for (const TARGET of TARGETS) {
// Replace wholesale. A partial copy would leave pages that no longer exist,
// and a stale page is worse than a missing one.
rmSync(TARGET, { recursive: true, force: true });
mkdirSync(TARGET, { recursive: true });
cpSync(DIST, TARGET, { recursive: true });

writeFileSync(
  join(TARGET, 'READ ME FIRST.txt'),
  `SCB Easy Knowledge Library
Published ${stamp}

Open index.html in a browser. Nothing to install.

WHAT THIS IS
An internal research library for the SCB Easy overhaul. Market analysis,
product research, cultural analysis and a design audit of twelve apps.

HOW TO READ IT
Much of this is deliberately unvalidated. Pages carry their own confidence
markers — evidence quality, and notes such as "needs-research" or
"needs-verification". Some pages are marked retired and kept only so older
references still resolve.

Start with the Plan Overview of a stream before its evidence pages. It says
what that stream can and cannot establish.

Nothing here has been tested with an SCB Easy user. Claims about what users
need or want are hypotheses until primary research happens.

STALENESS
This is a copy, published at the date above. Ask ${process.env.USER ?? 'the owner'} to
re-publish if it looks out of date.
`
);

console.log(`publish-library: published to ${TARGET}`);
}

console.log('');
console.log('  GitHub: commit and push in GitHub Desktop, then colleagues open the');
console.log('          repo, click library/, and download or view index.html');
console.log('  Box:    colleagues open "AI Folder/Knowledge Library/index.html"');
