/**
 * The nine consumer apps in the SCBX portfolio.
 *
 * PROVENANCE: transcribed from the SCBX Screen Estate inventory —
 * product-context/research/studies/STU-001_scb-easy-benchmark-desk-research/
 * inputs/documents/scbx-screen-estate.md
 *
 * KNOWN DEBT: this is a copy, and copies drift. The list belongs in
 * product-context as a register the site reads, the same way it reads the
 * research markdown. It sits here only because the source currently holds it
 * inside a prose table rather than as structured data. Move it when the
 * register exists.
 *
 * Install counts and ratings are store-reported and dated 2026-09-16.
 */

export interface SisterApp {
  name: string;
  pillar: string;
  domain: string;
  installs: string;
  rating: number;
  /** Screens captured in the Screen Estate inventory. */
  screens: number;
}

export const PILLARS = [
  'Banking & Wealth',
  'Consumer & Digital Finance',
  'Platforms & Technology',
] as const;

export const sisterApps: SisterApp[] = [
  {
    name: 'SCB EASY',
    pillar: 'Banking & Wealth',
    domain: 'Retail banking',
    installs: '10M+',
    rating: 4.3,
    screens: 46,
  },
  {
    name: 'SCBAM Fund Click',
    pillar: 'Banking & Wealth',
    domain: 'Mutual funds',
    installs: '100K+',
    rating: 2.3,
    screens: 13,
  },
  {
    name: 'CardX',
    pillar: 'Consumer & Digital Finance',
    domain: 'Credit cards & personal loans',
    installs: '1M+',
    rating: 3.9,
    screens: 14,
  },
  {
    name: 'FINNIX',
    pillar: 'Consumer & Digital Finance',
    domain: 'Nano-credit',
    installs: '10M+',
    rating: 4.8,
    screens: 12,
  },
  {
    name: 'MoneyThunder',
    pillar: 'Consumer & Digital Finance',
    domain: 'Personal & nano lending',
    installs: '5M+',
    rating: 4.8,
    screens: 12,
  },
  {
    name: 'เงินไชโย · Ngern Chaiyo',
    pillar: 'Consumer & Digital Finance',
    domain: 'Lending (AutoX)',
    installs: '500K+',
    rating: 4.0,
    screens: 13,
  },
  {
    name: 'POINTX',
    pillar: 'Platforms & Technology',
    domain: 'Loyalty points',
    installs: '500K+',
    rating: 4.7,
    screens: 13,
  },
  {
    name: 'INVX',
    pillar: 'Platforms & Technology',
    domain: 'Investing (InnovestX)',
    installs: '1M+',
    rating: 4.8,
    screens: 12,
  },
  {
    name: 'Token X',
    pillar: 'Platforms & Technology',
    domain: 'Digital assets',
    installs: '10K+',
    rating: 4.2,
    screens: 10,
  },
];
