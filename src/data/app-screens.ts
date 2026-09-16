/**
 * Screen galleries, extracted from the SCBX Screen Estate capture.
 *
 * GENERATED — do not hand-edit. Regenerate from the source capture if it is
 * refreshed. `total` is how many screens the inventory holds for that app;
 * `screens` is the subset carried into this repo.
 *
 * Alt text is the inventory author's own screen description, kept verbatim.
 * See product-context/research/studies/STU-001_scb-easy-benchmark-desk-research/
 * inputs/documents/scbx-screen-estate.md
 */

export interface Screen {
  src: string;
  alt: string;
}

export interface AppScreens {
  name: string;
  /** Screens held in the source inventory. */
  total: number;
  /** Screens carried into this repo. */
  screens: Screen[];
}

export const appScreens: Record<string, AppScreens> = {
  "scb-easy": {
    "name": "SCB EASY",
    "total": 46,
    "screens": [
      {
        "src": "/apps/scb-easy/01.jpg",
        "alt": "Store creative of the home shortcut grid — Scan / My QR bar, tiles for family transfers, mobile top-up, transactions, Easy Pass and bills, then a promo carousel and a COVID-19 relief card."
      },
      {
        "src": "/apps/scb-easy/02.jpg",
        "alt": "Same home creative, taller crop — also shows the five-item bottom bar and an Apply Loan & Credit Card row."
      },
      {
        "src": "/apps/scb-easy/03.jpg",
        "alt": "Home dashboard: photo header, greeting, Scan / My QR bar, six service tiles, theme-store promotion, Easy Store strip, loan CTA, icon-only bottom bar"
      },
      {
        "src": "/apps/scb-easy/04.jpg",
        "alt": "Just4U spending insight — savings and credit-card tabs, a donut of April spend 32,655.45 with category breakdown and a View monthly spending button."
      },
      {
        "src": "/apps/scb-easy/05.jpg",
        "alt": "Just4U spending insight — savings and credit-card tabs, a donut of April spend 32,655.45 with category breakdown and a View monthly spending button."
      },
      {
        "src": "/apps/scb-easy/06.jpg",
        "alt": "Account summary — deposits and shops, each section a one-card carousel with a pager dot"
      },
      {
        "src": "/apps/scb-easy/07.jpg",
        "alt": "Account summary scrolled — cards, revolving loans and insurances"
      },
      {
        "src": "/apps/scb-easy/08.jpg",
        "alt": "My deposits — balance right-aligned and unlabelled, More services dropdown pill"
      },
      {
        "src": "/apps/scb-easy/09.jpg",
        "alt": "My deposits — account details expanded"
      },
      {
        "src": "/apps/scb-easy/10.jpg",
        "alt": "Transaction history — uncategorised rows, free-text notes"
      },
      {
        "src": "/apps/scb-easy/11.jpg",
        "alt": "Transaction period filter"
      },
      {
        "src": "/apps/scb-easy/12.jpg",
        "alt": "Credit card details"
      }
    ]
  },
  "scbam-fund-click": {
    "name": "SCBAM Fund Click",
    "total": 13,
    "screens": [
      {
        "src": "/apps/scbam-fund-click/01.jpg",
        "alt": "Fund Click home — greeting row with cart and search, a purple promo carousel, fund-category tabs (recommended / popular / best return / e-class) and fund cards with YTD returns, then a market-summary strip and a five-tab bottom bar."
      },
      {
        "src": "/apps/scbam-fund-click/02.jpg",
        "alt": "Fund Click home — greeting row with cart and search, a purple promo carousel, fund-category tabs (recommended / popular / best return / e-class) and fund cards with YTD returns, then a market-summary strip and a five-tab bottom bar."
      },
      {
        "src": "/apps/scbam-fund-click/03.jpg",
        "alt": "Tablet rendering of the home screen — the same carousel and fund cards in a wider two-column layout."
      },
      {
        "src": "/apps/scbam-fund-click/04.jpg",
        "alt": "Portfolio — an e-class allowance card with a progress bar, four tabs, a donut allocation chart with a seven-row legend, and a holding card for SCBS&P500E."
      },
      {
        "src": "/apps/scbam-fund-click/05.jpg",
        "alt": "Portfolio — an e-class allowance card with a progress bar, four tabs, a donut allocation chart with a seven-row legend, and a holding card for SCBS&P500E."
      }
    ]
  },
  "cardx": {
    "name": "CardX",
    "total": 14,
    "screens": [
      {
        "src": "/apps/cardx/01.jpg",
        "alt": "Card home: carousel of CardX VISA ····5789 with POINTX 531 and available credit 145,100.25, quick actions for instalment conversion, split payment and statement request, an application-status tile and an offers card."
      },
      {
        "src": "/apps/cardx/02.jpg",
        "alt": "Card home: carousel of CardX VISA ····5789 with POINTX 531 and available credit 145,100.25, quick actions for instalment conversion, split payment and statement request, an application-status tile and an offers card."
      },
      {
        "src": "/apps/cardx/03.jpg",
        "alt": "Home screen right edge: balance tile, pay-card and application-status shortcuts, a personalised offer card and a promotions carousel."
      },
      {
        "src": "/apps/cardx/04.jpg",
        "alt": "Instalment conversion — a checkbox list of eligible purchases (Fuji ฿2,000 and ZARA ฿2,500 selected), running total ฿4,500 and a Next button."
      },
      {
        "src": "/apps/cardx/05.jpg",
        "alt": "Instalment conversion — a checkbox list of eligible purchases (Fuji ฿2,000 and ZARA ฿2,500 selected), running total ฿4,500 and a Next button."
      }
    ]
  },
  "finnix": {
    "name": "FINNIX",
    "total": 12,
    "screens": [
      {
        "src": "/apps/finnix/01.jpg",
        "alt": "FINNIX home — coin balance pill, a ฿250 bonus banner, an orange Nano FINNIX credit-line card showing ฿100,000.00 available, a request-higher-limit row and a Withdraw CTA over a two-tab bottom bar."
      },
      {
        "src": "/apps/finnix/02.jpg",
        "alt": "FINNIX home — coin balance pill, a ฿250 bonus banner, an orange Nano FINNIX credit-line card showing ฿100,000.00 available, a request-higher-limit row and a Withdraw CTA over a two-tab bottom bar."
      },
      {
        "src": "/apps/finnix/03.jpg",
        "alt": "Loan repayment — minimum-pay / pay-any toggle, total due ฿10,271.23, editable amount, interest breakdown, principal rolled to the next bill, a coupon row and a Pay now CTA."
      },
      {
        "src": "/apps/finnix/04.jpg",
        "alt": "Loan repayment — minimum-pay / pay-any toggle, total due ฿10,271.23, editable amount, interest breakdown, principal rolled to the next bill, a coupon row and a Pay now CTA."
      },
      {
        "src": "/apps/finnix/05.jpg",
        "alt": "Withdraw — remaining limit ฿100,000, a stepper and slider from ฿2,000 to ฿100,000, instalment due-date picker, per-day interest rows and a disbursement-account selector offering an SCB account or PromptPay."
      }
    ]
  },
  "moneythunder": {
    "name": "MoneyThunder",
    "total": 12,
    "screens": [
      {
        "src": "/apps/moneythunder/01.jpg",
        "alt": "Logged-in home — a hero card for 24-hour online lending with a browse-loans CTA, a three-icon quick-action row, a news carousel and a Bank of Thailand trust strip."
      },
      {
        "src": "/apps/moneythunder/02.jpg",
        "alt": "Home, fuller crop — brand lockup, an offer card for a cash loan up to ฿1,000,000, four quick actions, a credit-tip banner and a four-tab bottom bar."
      },
      {
        "src": "/apps/moneythunder/03.jpg",
        "alt": "Application step — a green-ticked checklist of general info, mobile-phone data and bank statement, with nine Thai bank tiles as statement sources and a Continue button."
      },
      {
        "src": "/apps/moneythunder/04.jpg",
        "alt": "Application step — a green-ticked checklist of general info, mobile-phone data and bank statement, with nine Thai bank tiles as statement sources and a Continue button."
      },
      {
        "src": "/apps/moneythunder/05.jpg",
        "alt": "A PDPA banner over an in-app support screen — 24-hour help illustration and a LINE contact chip."
      }
    ]
  },
  "ngern-chaiyo": {
    "name": "เงินไชโย · Ngern Chaiyo",
    "total": 13,
    "screens": [
      {
        "src": "/apps/ngern-chaiyo/01.jpg",
        "alt": "App home — yellow header greeting with mascot avatar and a 1,000-point chip, an active car-loan card showing ฿1,800.00 due 1 Jan, then a loan-category carousel and a promo banner."
      },
      {
        "src": "/apps/ngern-chaiyo/02.jpg",
        "alt": "App home — yellow header greeting with mascot avatar and a 1,000-point chip, an active car-loan card showing ฿1,800.00 due 1 Jan, then a loan-category carousel and a promo banner."
      },
      {
        "src": "/apps/ngern-chaiyo/03.jpg",
        "alt": "Loan detail — a car-loan card marked not yet due with a ฿1,800.00 instalment and a Pay CTA, then a Chaiyo card showing ฿0.00 used against a ฿20,000.00 limit, with details and transactions tabs."
      },
      {
        "src": "/apps/ngern-chaiyo/04.jpg",
        "alt": "Loan detail — a car-loan card marked not yet due with a ฿1,800.00 instalment and a Pay CTA, then a Chaiyo card showing ฿0.00 used against a ฿20,000.00 limit, with details and transactions tabs."
      },
      {
        "src": "/apps/ngern-chaiyo/05.jpg",
        "alt": "Payment — instalment 1 of 12, ฿1,800.00 due, and a payment-channel picker offering SCB Easy with no fee or QR / barcode where a fee may apply."
      }
    ]
  },
  "pointx": {
    "name": "POINTX",
    "total": 13,
    "screens": [
      {
        "src": "/apps/pointx/01.jpg",
        "alt": "PointX home — greeting, a 25,000 point balance chip, quick actions for partner points, cashback, airlines and coupons, a top-sellers carousel and a flash-deal rail with Baht + point pricing. Tab bar: Home / Shop / SCB EASY hub / X Store / My POINTX."
      },
      {
        "src": "/apps/pointx/02.jpg",
        "alt": "PointX home — greeting, a 25,000 point balance chip, quick actions for partner points, cashback, airlines and coupons, a top-sellers carousel and a flash-deal rail with Baht + point pricing. Tab bar: Home / Shop / SCB EASY hub / X Store / My POINTX."
      },
      {
        "src": "/apps/pointx/03.jpg",
        "alt": "PointX home — own navigation, colour and type; partner points, coupons, cashback, airlines, transfer"
      },
      {
        "src": "/apps/pointx/04.jpg",
        "alt": "My POINTX — balance card with history link, linked-card strip and an all-partners list (AIS, Amaze, Bangchak, blueplus+, J Point, MAX CARD) with balances and conversion rates."
      },
      {
        "src": "/apps/pointx/05.jpg",
        "alt": "My POINTX — balance card with history link, linked-card strip and an all-partners list (AIS, Amaze, Bangchak, blueplus+, J Point, MAX CARD) with balances and conversion rates."
      }
    ]
  },
  "invx": {
    "name": "INVX",
    "total": 12,
    "screens": [
      {
        "src": "/apps/invx/01.jpg",
        "alt": "INVX dark home — avatar with PLATINUM tier chip, a points promo card, a purple portfolio card showing ฿1,789,487,320 and +1.24%, a price-change row and a deposit nudge."
      },
      {
        "src": "/apps/invx/02.jpg",
        "alt": "INVX dark home — avatar with PLATINUM tier chip, a points promo card, a purple portfolio card showing ฿1,789,487,320 and +1.24%, a price-change row and a deposit nudge."
      },
      {
        "src": "/apps/invx/03.jpg",
        "alt": "Port Analytics — asset breakdown donut with a weight / P&L toggle and rows for bonds, stocks, structured notes, cash, intelligent port, digital assets and funds."
      },
      {
        "src": "/apps/invx/04.jpg",
        "alt": "Port Analytics — asset breakdown donut with a weight / P&L toggle and rows for bonds, stocks, structured notes, cash, intelligent port, digital assets and funds."
      },
      {
        "src": "/apps/invx/05.jpg",
        "alt": "Trade — symbol search and price alert, asset-class tabs, recently viewed tiles, INVX Picks chips and a watchlist top-gainer card."
      }
    ]
  },
  "token-x": {
    "name": "Token X",
    "total": 10,
    "screens": [
      {
        "src": "/apps/token-x/01.jpg",
        "alt": "Home — avatar and Thai greeting, three circular quick actions for tokens, orders and wallet, then an editorial card and a utility-token card."
      },
      {
        "src": "/apps/token-x/02.jpg",
        "alt": "Home — avatar and Thai greeting, three circular quick actions for tokens, orders and wallet, then an editorial card and a utility-token card."
      },
      {
        "src": "/apps/token-x/03.jpg",
        "alt": "Wallet — total token value ฿265,000.00, a copyable wallet-address chip, three actions for transfer, receive and history, and a my-tokens list."
      },
      {
        "src": "/apps/token-x/04.jpg",
        "alt": "Wallet — total token value ฿265,000.00, a copyable wallet-address chip, three actions for transfer, receive and history, and a my-tokens list."
      },
      {
        "src": "/apps/token-x/05.jpg",
        "alt": "Token listing — a featured XYZ Investment Token carousel card with its subscription window, tabs for open, upcoming and past offerings, and an ABC Investment Token row priced at ฿20."
      }
    ]
  }
};
