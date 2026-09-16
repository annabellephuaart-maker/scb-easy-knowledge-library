#!/usr/bin/env node
/**
 * Builds a screen gallery for every app page in the Design Audit stream.
 *
 * Two sources, in order of preference:
 *
 *  1. The SCBX Screen Estate artefact, for apps it covers. Those screens carry
 *     the author's own descriptions, which are far better than anything a
 *     store listing provides. Requires build-screen-matrix.mjs to have run.
 *  2. The Apple App Store listing, for everything else — official screenshots
 *     via the public iTunes API, with the listing URL recorded so a reader can
 *     check the source.
 *
 * Store screenshots are marketing creatives chosen by the vendor. They show
 * how a product presents itself, not how it behaves. That distinction is
 * carried into the generated data as `kind`, and the component says so.
 *
 *   node scripts/build-audit-galleries.mjs
 */

import { writeFileSync, mkdirSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT_IMG = 'public/audit';
const OUT_DATA = 'src/data/audit-galleries.ts';
const MAX_STORE_SHOTS = 6;

/** Apps covered by the SCBX artefact: page slug → matrix app slug. */
const FROM_ARTEFACT = {
  'scb-easy': 'scb-easy',
  cardx: 'cardx',
  invx: 'invx',
  pointx: 'pointx',
};

/** Store lookup for icon and metrics, including artefact-sourced apps. */
const STORE_LOOKUP = {
  'scb-easy': { term: 'SCB EASY', country: 'th', match: /^scb easy$/i },
  cardx: { term: 'CardX', country: 'th', match: /^cardx/i },
  invx: { term: 'INVX InnovestX', country: 'th', match: /invx/i },
  pointx: { term: 'PointX', country: 'th', match: /pointx/i },
};

/** Everything else, looked up in the App Store. */
const FROM_STORE = {
  kbank: { term: 'K PLUS', country: 'th', match: /^K PLUS$/i },
  truemoney: { term: 'TrueMoney', country: 'th', match: /truemoney/i },
  dbs: { term: 'digibank by DBS', country: 'sg', match: /dbs/i },
  revolut: { term: 'Revolut', country: 'gb', match: /^revolut/i },
  nubank: { term: 'Nubank', country: 'br', match: /nubank|nu\b/i },
  grab: { term: 'Grab', country: 'sg', match: /^grab/i },
  claude: { term: 'Claude', country: 'us', match: /claude/i },
  chatgpt: { term: 'ChatGPT', country: 'us', match: /chatgpt/i },
};

const get = async (url) => {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res;
};

rmSync(OUT_IMG, { recursive: true, force: true });
mkdirSync(OUT_IMG, { recursive: true });

const galleries = {};

/** Finds an app in the App Store and returns its icon plus headline metrics. */
async function storeMeta(slug, cfg, dir) {
  const url =
    'https://itunes.apple.com/search?' +
    new URLSearchParams({ term: cfg.term, country: cfg.country, entity: 'software', limit: '8' });
  const results = (await (await get(url)).json()).results ?? [];
  const app = results.find((r) => cfg.match.test(r.trackName ?? '')) ?? results[0];
  if (!app) return null;

  let icon;
  const iconUrl = app.artworkUrl512 ?? app.artworkUrl100;
  if (iconUrl) {
    mkdirSync(dir, { recursive: true });
    const buf = Buffer.from(await (await get(iconUrl)).arrayBuffer());
    writeFileSync(join(dir, 'icon.png'), buf);
    icon = `/audit/${slug}/icon.png`;
  }
  return { app, icon };
}

// ---- 1. artefact-sourced apps -------------------------------------------
let matrix = null;
try {
  const raw = readFileSync('src/data/screen-matrix.ts', 'utf8');
  const json = raw.slice(raw.indexOf('matrixScreens: MatrixScreen[] = ') + 32);
  matrix = JSON.parse(json.slice(0, json.lastIndexOf(']') + 1));
} catch {
  console.warn('  note: screen-matrix data not found — run build-screen-matrix.mjs first');
}

if (matrix) {
  for (const [page, appSlug] of Object.entries(FROM_ARTEFACT)) {
    const screens = matrix.filter((s) => s.app === appSlug);
    if (!screens.length) continue;
    let meta = null;
    if (STORE_LOOKUP[page]) {
      try {
        meta = await storeMeta(page, STORE_LOOKUP[page], join(OUT_IMG, page));
      } catch (err) {
        console.warn(`  ${page}: store lookup failed — ${err.message}`);
      }
    }

    galleries[page] = {
      name: screens[0].appName,
      seller: meta?.app?.sellerName,
      source: 'SCBX Screen Estate artefact',
      storeUrl: meta?.app?.trackViewUrl,
      icon: meta?.icon,
      kind: 'mixed',
      rating: meta ? Math.round((meta.app.averageUserRating ?? 0) * 100) / 100 : undefined,
      ratingCount: meta?.app?.userRatingCount,
      screens: screens.map((s) => ({
        src: s.src,
        caption: s.description,
        archetype: s.archetype,
      })),
    };
    console.log(
      `  ${page}: ${screens.length} screens from the artefact` +
        (meta ? ` · icon + iOS ${galleries[page].rating}★` : '')
    );
  }
}

// ---- 2. store-sourced apps ----------------------------------------------
for (const [page, cfg] of Object.entries(FROM_STORE)) {
  if (galleries[page]) continue;
  try {
    const url =
      'https://itunes.apple.com/search?' +
      new URLSearchParams({
        term: cfg.term,
        country: cfg.country,
        entity: 'software',
        limit: '8',
      });
    const results = (await (await get(url)).json()).results ?? [];
    const app = results.find((r) => cfg.match.test(r.trackName ?? '')) ?? results[0];
    if (!app) {
      console.warn(`  ${page}: no App Store match`);
      continue;
    }

    const dir = join(OUT_IMG, page);
    mkdirSync(dir, { recursive: true });

    let icon;
    const iconUrl = app.artworkUrl512 ?? app.artworkUrl100;
    if (iconUrl) {
      writeFileSync(join(dir, 'icon.png'), Buffer.from(await (await get(iconUrl)).arrayBuffer()));
      icon = `/audit/${page}/icon.png`;
    }

    const screens = [];
    const shots = (app.screenshotUrls ?? []).slice(0, MAX_STORE_SHOTS);

    for (const [i, shotUrl] of shots.entries()) {
      const file = `${String(i + 1).padStart(2, '0')}.jpg`;
      const buf = Buffer.from(await (await get(shotUrl)).arrayBuffer());
      writeFileSync(join(dir, file), buf);
      screens.push({
        src: `/audit/${page}/${file}`,
        caption: `${app.trackName} — App Store screenshot ${i + 1}`,
        archetype: 'Store creative',
      });
    }

    galleries[page] = {
      name: app.trackName,
      seller: app.sellerName,
      source: `Apple App Store (${cfg.country.toUpperCase()})`,
      storeUrl: app.trackViewUrl,
      icon,
      kind: 'store',
      rating: Math.round((app.averageUserRating ?? 0) * 100) / 100,
      ratingCount: app.userRatingCount ?? 0,
      screens,
    };
    console.log(`  ${page}: ${screens.length} store screenshots — ${app.trackName}`);
  } catch (err) {
    console.warn(`  ${page}: failed — ${err.message}`);
  }
}

writeFileSync(
  OUT_DATA,
  `/**
 * GENERATED by scripts/build-audit-galleries.mjs — do not hand-edit.
 *
 * kind: "mixed"  screens from the SCBX artefact, carrying its own descriptions
 *       "store"  official App Store screenshots — marketing creatives chosen by
 *                the vendor, showing how a product presents itself rather than
 *                how it behaves
 */

export interface GalleryScreen {
  src: string;
  caption: string;
  archetype: string;
}

export interface Gallery {
  name: string;
  seller?: string;
  source: string;
  storeUrl?: string;
  icon?: string;
  kind: 'mixed' | 'store';
  rating?: number;
  ratingCount?: number;
  screens: GalleryScreen[];
}

export const galleries: Record<string, Gallery> = ${JSON.stringify(galleries, null, 2)};
`
);

const totalScreens = Object.values(galleries).reduce((n, g) => n + g.screens.length, 0);
console.log(
  `audit-galleries: ${Object.keys(galleries).length} apps · ${totalScreens} screens`
);
