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
  /** Representative home screen, copied from the Screen Estate capture. */
  image: string;
  /** Screen description, carried over from the inventory's own alt text. */
  alt: string;
}

export const PILLARS = [
  'Banking & Wealth',
  'Consumer & Digital Finance',
  'Platforms & Technology',
] as const;

export const sisterApps: SisterApp[] = [
  {
    name: 'SCB EASY',
    image: '/apps/scb-easy.jpg',
    alt: 'Store creative of the home shortcut grid — Scan / My QR bar, tiles for family transfers, mobile top-up, transactions, Easy Pass and bills, then a promo carousel and a COVID-19 relief card.',
    pillar: 'Banking & Wealth',
    domain: 'Retail banking',
    installs: '10M+',
    rating: 4.3,
    screens: 46,
  },
  {
    name: 'SCBAM Fund Click',
    image: '/apps/scbam-fund-click.jpg',
    alt: 'Fund Click home — greeting row with cart and search, a purple promo carousel, fund-category tabs (recommended / popular / best return / e-class) and fund cards with YTD returns, then a market-summary strip and a five-tab bottom bar.',
    pillar: 'Banking & Wealth',
    domain: 'Mutual funds',
    installs: '100K+',
    rating: 2.3,
    screens: 13,
  },
  {
    name: 'CardX',
    image: '/apps/cardx.jpg',
    alt: 'Card home: carousel of CardX VISA ····5789 with POINTX 531 and available credit 145,100.25, quick actions for instalment conversion, split payment and statement request, an application-status tile and an offers card.',
    pillar: 'Consumer & Digital Finance',
    domain: 'Credit cards & personal loans',
    installs: '1M+',
    rating: 3.9,
    screens: 14,
  },
  {
    name: 'FINNIX',
    image: '/apps/finnix.jpg',
    alt: 'FINNIX home — coin balance pill, a ฿250 bonus banner, an orange Nano FINNIX credit-line card showing ฿100,000.00 available, a request-higher-limit row and a Withdraw CTA over a two-tab bottom bar.',
    pillar: 'Consumer & Digital Finance',
    domain: 'Nano-credit',
    installs: '10M+',
    rating: 4.8,
    screens: 12,
  },
  {
    name: 'MoneyThunder',
    image: '/apps/moneythunder.jpg',
    alt: 'Logged-in home — a hero card for 24-hour online lending with a browse-loans CTA, a three-icon quick-action row, a news carousel and a Bank of Thailand trust strip.',
    pillar: 'Consumer & Digital Finance',
    domain: 'Personal & nano lending',
    installs: '5M+',
    rating: 4.8,
    screens: 12,
  },
  {
    name: 'เงินไชโย · Ngern Chaiyo',
    image: '/apps/ngern-chaiyo.jpg',
    alt: 'App home — yellow header greeting with mascot avatar and a 1,000-point chip, an active car-loan card showing ฿1,800.00 due 1 Jan, then a loan-category carousel and a promo banner.',
    pillar: 'Consumer & Digital Finance',
    domain: 'Lending (AutoX)',
    installs: '500K+',
    rating: 4.0,
    screens: 13,
  },
  {
    name: 'POINTX',
    image: '/apps/pointx.jpg',
    alt: 'PointX home — greeting, a 25,000 point balance chip, quick actions for partner points, cashback, airlines and coupons, a top-sellers carousel and a flash-deal rail with Baht + point pricing. Tab bar: Home / Shop / SCB EASY hub / X Store / My POINTX.',
    pillar: 'Platforms & Technology',
    domain: 'Loyalty points',
    installs: '500K+',
    rating: 4.7,
    screens: 13,
  },
  {
    name: 'INVX',
    image: '/apps/invx.jpg',
    alt: 'INVX dark home — avatar with PLATINUM tier chip, a points promo card, a purple portfolio card showing ฿1,789,487,320 and +1.24%, a price-change row and a deposit nudge.',
    pillar: 'Platforms & Technology',
    domain: 'Investing (InnovestX)',
    installs: '1M+',
    rating: 4.8,
    screens: 12,
  },
  {
    name: 'Token X',
    image: '/apps/token-x.jpg',
    alt: 'Home — avatar and Thai greeting, three circular quick actions for tokens, orders and wallet, then an editorial card and a utility-token card.',
    pillar: 'Platforms & Technology',
    domain: 'Digital assets',
    installs: '10K+',
    rating: 4.2,
    screens: 10,
  },
];
