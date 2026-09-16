/**
 * Thai retail banking apps, from the Apple App Store and Google Play (TH).
 *
 * GENERATED from the iTunes Lookup API on 2026-09-17 — do not hand-edit.
 * Ratings are lifetime cumulative and move continuously; re-generate rather
 * than editing a number in place.
 *
 * Play install bands and ratings were read from the public store listing on the
 * same date. Ratings are NOT comparable across stores — every app here rates
 * 4.3-4.7 on Play and 3.40-3.92 on iOS. Compare within a store, never across.
 *
 * Install bands are lifetime cumulative and count reinstalls and second
 * devices. They are not users and definitely not active users.
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
  /** Google Play, TH — lifetime install band, crude but the only public download figure. */
  installs: string;
  installsRank: number;
  playRating: number;
  playUrl: string;
  /** Competitive tier, per the competitive analysis stream. */
  category: string;
  categoryRank: number;
}

export const competitorApps: CompetitorApp[] = [
  {
    slug: "scb-easy",
    installs: "10M+",
    installsRank: 10000000,
    playRating: 4.3,
    playUrl: "https://play.google.com/store/apps/details?id=com.scb.phone",
    category: "Domestic",
    categoryRank: 1,
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
    installs: "50M+",
    installsRank: 50000000,
    playRating: 4.7,
    playUrl: "https://play.google.com/store/apps/details?id=com.kasikorn.retail.mbanking.wap",
    category: "Domestic",
    categoryRank: 1,
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
    installs: "10M+",
    installsRank: 10000000,
    playRating: 4.4,
    playUrl: "https://play.google.com/store/apps/details?id=com.bbl.mobilebanking",
    category: "Domestic",
    categoryRank: 1,
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
    installs: "10M+",
    installsRank: 10000000,
    playRating: 4.6,
    playUrl: "https://play.google.com/store/apps/details?id=com.TMBTOUCH.PRODUCTION",
    category: "Domestic",
    categoryRank: 1,
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
    installs: "50M+",
    installsRank: 50000000,
    playRating: 4.3,
    playUrl: "https://play.google.com/store/apps/details?id=ktbcs.netbank",
    category: "Domestic",
    categoryRank: 1,
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
