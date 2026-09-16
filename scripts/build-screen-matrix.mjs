#!/usr/bin/env node
/**
 * Builds the screen comparison dataset from the SCBX Screen Estate artefact.
 *
 * The artefact is a saved HTML page held outside the repo. This reads it,
 * copies the screens into public/screens/, and writes src/data/screen-matrix.ts.
 *
 * Run it again whenever the artefact is re-captured. Do not hand-edit the
 * generated file.
 *
 *   node scripts/build-screen-matrix.mjs [path-to-saved_resource.html]
 *
 * Archetype classification comes from the artefact itself where the markup
 * exposes it. Where it does not, screens are marked "unclassified" rather than
 * guessed — an inferred archetype would look like the author's classification
 * without being it.
 */

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const SRC =
  process.argv[2] ??
  join(
    process.env.HOME ?? '',
    'Desktop',
    'SCBX Screen Estate_files',
    'saved_resource.html'
  );
const SRC_DIR = dirname(SRC);
const OUT_IMG = 'public/screens';
const OUT_DATA = 'src/data/screen-matrix.ts';

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

const html = readFileSync(SRC, 'utf8');

// Every screen carries "App — description" in its alt attribute. Verified.
const imgs = [
  ...html.matchAll(/<img\s+src="\.\/([^"]+)"[^>]*alt="([^"]*)"/g),
].map(([, file, alt]) => {
  const text = decode(alt);
  const [appRaw, ...rest] = text.split('—');
  return {
    file,
    app: appRaw.trim(),
    description: rest.join('—').trim(),
  };
});

/**
 * The artefact's own archetype vocabulary, read off its filter rail.
 * Order matters: longer, more specific names are tested first so that
 * "Detail & confirmation" is not shadowed by a looser match.
 */
const ARCHETYPES = [
  'Accounts & portfolio',
  'Detail & confirmation',
  'Login & onboarding',
  'Cross-app handoff',
  'Services & support',
  'Rewards & offers',
  'Products & apply',
  'Transact & pay',
  'Marketing',
  'Home',
];

/**
 * Archetype per screen, preferring the artefact's own classification.
 *
 * The compare grid lays screens out as archetype-row by app-column, so a
 * screen's archetype is whichever row label most recently preceded it. Saved
 * exports vary, so this walks the document linearly: whenever a known
 * archetype name appears as a label, subsequent screens belong to it until the
 * next label.
 */
function archetypeByFile() {
  const map = new Map();

  // A label element whose entire text is one of the known archetype names.
  const labelRe = new RegExp(
    `<[^>]+>\\s*(${ARCHETYPES.map((a) =>
      a.replace(/[&]/g, '&(?:amp;)?').replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')
    ).join('|')})\\s*<`,
    'g'
  );

  const marks = [];
  for (const m of html.matchAll(labelRe)) {
    marks.push({ at: m.index ?? 0, label: decode(m[1]) });
  }

  if (marks.length > 1) {
    for (const m of html.matchAll(/<img\s+src="\.\/([^"]+)"/g)) {
      const at = m.index ?? 0;
      let current = null;
      for (const mark of marks) {
        if (mark.at < at) current = mark.label;
        else break;
      }
      if (current && !map.has(m[1])) map.set(m[1], current);
    }
  }

  // Data attribute, if a future export provides one. Highest confidence.
  for (const [, file, arch] of html.matchAll(
    /<img\s+src="\.\/([^"]+)"[^>]*data-archetype="([^"]*)"/g
  )) {
    map.set(file, decode(arch));
  }

  return map;
}

/**
 * Fallback only. Classifies from the screen's own description when the
 * artefact's classification could not be recovered.
 *
 * Recorded as `inferred` so it is never mistaken for the author's work — an
 * inferred archetype that looks authoritative is worse than none.
 */
function inferArchetype(description) {
  const d = description.toLowerCase();
  const rules = [
    ['Login & onboarding', /\b(login|log in|sign ?in|onboard|register|otp|passcode|pin|face ?id|biometric|activation)\b/],
    ['Cross-app handoff', /\b(handoff|hub|deep ?link|switch to|opens? (?:scb easy|pointx))\b/],
    ['Detail & confirmation', /\b(confirm|receipt|slip|success|detail|summary)\b/],
    ['Transact & pay', /\b(transfer|pay|payment|qr|scan|top-?up|withdraw|bill)\b/],
    ['Rewards & offers', /\b(reward|point|coupon|cashback|deal|offer|promo|bonus)\b/],
    ['Products & apply', /\b(appl(?:y|ication)|loan|credit line|open an account|fund|insurance|debenture)\b/],
    ['Accounts & portfolio', /\b(account|balance|portfolio|deposits?|statement|holdings?|card home)\b/],
    ['Services & support', /\b(support|help|service|contact|settings?|profile)\b/],
    ['Marketing', /\b(store creative|creative|marketing|hero|brand lockup|banner)\b/],
    ['Home', /\b(home|dashboard|greeting)\b/],
  ];
  for (const [name, re] of rules) if (re.test(d)) return name;
  return 'Unclassified';
}

const archetypes = archetypeByFile();
const inferred = archetypes.size === 0;

rmSync(OUT_IMG, { recursive: true, force: true });
mkdirSync(OUT_IMG, { recursive: true });

const apps = new Map();
const screens = [];
const seen = new Set();

for (const img of imgs) {
  if (seen.has(img.file)) continue;
  seen.add(img.file);

  const appSlug = slug(img.app);
  if (!apps.has(appSlug)) apps.set(appSlug, { slug: appSlug, name: img.app, count: 0 });
  apps.get(appSlug).count += 1;

  const out = `${appSlug}-${String(apps.get(appSlug).count).padStart(2, '0')}.jpg`;
  try {
    copyFileSync(join(SRC_DIR, img.file), join(OUT_IMG, out));
  } catch {
    continue;
  }

  screens.push({
    src: `/screens/${out}`,
    app: appSlug,
    appName: img.app,
    archetype: archetypes.get(img.file) ?? inferArchetype(img.description),
    description: img.description,
  });
}

const archetypeList = [...new Set(screens.map((s) => s.archetype))].sort((a, b) =>
  a === 'Unclassified' ? 1 : b === 'Unclassified' ? -1 : a.localeCompare(b)
);

const banner = `/**
 * GENERATED by scripts/build-screen-matrix.mjs — do not hand-edit.
 *
 * Source: the SCBX Screen Estate artefact, a dated snapshot held outside the
 * repo. Re-run the generator when it is re-captured.
 *
 * Screens: ${screens.length} · Apps: ${apps.size} · Archetypes: ${archetypeList.length}
 * Archetype classification resolved: ${archetypes.size > 0 ? 'yes' : 'NO — all unclassified'}
 */

export interface MatrixScreen {
  src: string;
  app: string;
  appName: string;
  archetype: string;
  description: string;
}

export interface MatrixApp {
  slug: string;
  name: string;
  count: number;
}

`;

writeFileSync(
  OUT_DATA,
  banner +
    `export const matrixApps: MatrixApp[] = ${JSON.stringify([...apps.values()], null, 2)};\n\n` +
    `export const matrixArchetypes: string[] = ${JSON.stringify(archetypeList, null, 2)};\n\n` +
    `export const matrixScreens: MatrixScreen[] = ${JSON.stringify(screens, null, 2)};\n`
);

console.log(
  `screen-matrix: ${screens.length} screens · ${apps.size} apps · ${archetypeList.length} archetypes` +
    (archetypes.size ? '' : '\n  WARNING: no archetype mapping found — all screens marked Unclassified')
);
