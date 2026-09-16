/**
 * Thai retail banking apps, from the Apple App Store (TH storefront).
 *
 * GENERATED from the iTunes Lookup API on 2026-09-17 — do not hand-edit.
 * Ratings are lifetime cumulative and move continuously; re-generate rather
 * than editing a number in place.
 *
 * iOS only. Google Play has no equivalent public API, and its ratings are NOT
 * comparable — SCB EASY rates 3.4 here and 4.3 on Play. Compare within a
 * store, never across them.
 */

export interface CompetitorApp {
  slug: string;
  name: string;
  seller: string;
  rating: number;
  ratingCount: number;
  version: string;
  updated: string;
  released: string;
  storeUrl: string;
  icon: string;
  shots: string[];
  isUs?: boolean;
}

export const competitorApps: CompetitorApp[] = [
  {
    slug: "scb-easy",
    name: "SCB EASY",
    seller: "The Siam Commercial Bank PCL",
    rating: 3.4,
    ratingCount: 25496,
    version: "3.106.5",
    updated: "2026-08-25",
    released: "2012-10-24",
    storeUrl: "https://apps.apple.com/th/app/scb-easy/id568388474?uo=4",
    icon: "/competitors/scb-easy/icon.png",
    shots: ["/competitors/scb-easy/01.jpg", "/competitors/scb-easy/02.jpg", "/competitors/scb-easy/03.jpg"],
    isUs: true,
  },
  {
    slug: "k-plus",
    name: "K PLUS",
    seller: "KASIKORNBANK PUBLIC COMPANY LIMITED",
    rating: 3.68,
    ratingCount: 32807,
    version: "5.22.2",
    updated: "2026-09-04",
    released: "2010-03-27",
    storeUrl: "https://apps.apple.com/th/app/k-plus/id361170631?uo=4",
    icon: "/competitors/k-plus/icon.png",
    shots: ["/competitors/k-plus/01.jpg", "/competitors/k-plus/02.jpg", "/competitors/k-plus/03.jpg"],
  },
  {
    slug: "bangkok-bank",
    name: "Bangkok Bank Mobile Banking",
    seller: "Bangkok Bank Public Company Limited",
    rating: 3.92,
    ratingCount: 32360,
    version: "3.50.0",
    updated: "2026-09-03",
    released: "2013-12-18",
    storeUrl: "https://apps.apple.com/th/app/bangkok-bank-mobile-banking/id660238716?uo=4",
    icon: "/competitors/bangkok-bank/icon.png",
    shots: ["/competitors/bangkok-bank/01.jpg", "/competitors/bangkok-bank/02.jpg", "/competitors/bangkok-bank/03.jpg"],
  },
  {
    slug: "ttb-touch",
    name: "ttb touch",
    seller: "TMBThanachart Bank Public Company Limited",
    rating: 3.61,
    ratingCount: 27643,
    version: "5.17.2",
    updated: "2026-08-06",
    released: "2014-09-27",
    storeUrl: "https://apps.apple.com/th/app/ttb-touch/id884079963?uo=4",
    icon: "/competitors/ttb-touch/icon.png",
    shots: ["/competitors/ttb-touch/01.jpg", "/competitors/ttb-touch/02.jpg", "/competitors/ttb-touch/03.jpg"],
  },
  {
    slug: "krungthai-next",
    name: "Krungthai NEXT",
    seller: "Krung Thai Bank",
    rating: 3.41,
    ratingCount: 52930,
    version: "26.7.1",
    updated: "2026-08-05",
    released: "2011-05-17",
    storeUrl: "https://apps.apple.com/th/app/krungthai-next/id436753378?uo=4",
    icon: "/competitors/krungthai-next/icon.png",
    shots: ["/competitors/krungthai-next/01.jpg", "/competitors/krungthai-next/02.jpg", "/competitors/krungthai-next/03.jpg"],
  },
];
