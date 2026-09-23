#!/usr/bin/env node
/**
 * Pushes the built library to a `library` branch of the private repo.
 *
 * Colleagues with repo access switch to that branch, download the ZIP, and
 * open index.html. Distribution without a public URL, and versioned — an older
 * publish can be recovered from the branch history.
 *
 * Built locally and pushed as output, because the site reads
 * `../product-context` at build time. Building in CI would mean putting the
 * SCB research on GitHub; this way only rendered HTML and images go.
 *
 * The branch is deliberately NOT called gh-pages. On a personal account a
 * Pages site is PUBLIC regardless of repository visibility, so enabling Pages
 * on this repo would publish client research to an open URL. Keep Pages off.
 *
 *   node scripts/deploy-pages.mjs
 */

import { execFileSync } from 'node:child_process';
import { cpSync, rmSync, writeFileSync, mkdtempSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BRANCH = 'library';
const DIST = 'dist';

const git = (args, opts = {}) =>
  execFileSync('git', args, { encoding: 'utf8', ...opts }).trim();

if (!existsSync(DIST)) {
  console.error('deploy-pages: no dist/ — run `npm run publish` first');
  process.exit(1);
}

let remote;
try {
  remote = git(['remote', 'get-url', 'origin']);
} catch {
  console.error('deploy-pages: no `origin` remote. Create the repo, then:');
  console.error('  git remote add origin git@github.com:<you>/<repo>.git');
  process.exit(1);
}

if (remote.startsWith('file://')) {
  console.error(`deploy-pages: origin is still the local placeholder (${remote}).`);
  console.error('  Point it at the real repository first:');
  console.error('  git remote set-url origin git@github.com:<you>/<repo>.git');
  process.exit(1);
}

const isPublicHost = /(^|[@/])github\.com([:/]|$)/.test(remote);

// A worktree keeps the branch's history without disturbing the working copy.
const work = mkdtempSync(join(tmpdir(), 'ghpages-'));
const hasBranch = (() => {
  try {
    git(['ls-remote', '--exit-code', '--heads', 'origin', BRANCH]);
    return true;
  } catch {
    return false;
  }
})();

try {
  if (hasBranch) {
    git(['fetch', 'origin', BRANCH]);
    git(['worktree', 'add', '--force', work, `origin/${BRANCH}`]);
    git(['switch', '-C', BRANCH], { cwd: work });
  } else {
    git(['worktree', 'add', '--force', '--detach', work]);
    git(['switch', '--orphan', BRANCH], { cwd: work });
  }

  // Replace wholesale: a page left behind after being deleted is worse than
  // a missing one.
  for (const entry of git(['ls-files'], { cwd: work }).split('\n').filter(Boolean)) {
    rmSync(join(work, entry), { force: true });
  }
  cpSync(DIST, work, { recursive: true });

  // Without this, GitHub Pages hides every folder whose name starts with "_".
  writeFileSync(join(work, '.nojekyll'), '');

  git(['add', '-A'], { cwd: work });
  const staged = git(['diff', '--cached', '--name-only'], { cwd: work });
  if (!staged) {
    console.log('deploy-pages: nothing changed since the last deploy');
  } else {
    const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
    git(['commit', '-q', '-m', `publish: knowledge library ${stamp}`], { cwd: work });
    git(['push', '-u', 'origin', BRANCH], { cwd: work, stdio: 'inherit' });
    console.log(`deploy-pages: pushed to ${BRANCH}`);
  }

  console.log(`  Colleagues: open the repo, switch to the "${BRANCH}" branch,`);
  console.log('  then Code → Download ZIP, unzip, and open index.html.');
  if (isPublicHost) {
    console.log('');
    console.log('  NOTE: keep GitHub Pages DISABLED on this repository. On a personal');
    console.log('  account a Pages site is public even from a private repo, which would');
    console.log('  expose client research.');
  }
} finally {
  git(['worktree', 'remove', '--force', work]);
}
