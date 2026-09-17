# Hosting the Knowledge Library

Private, password-protected, free. Source stays on GitHub; the site is served by
Cloudflare Pages with HTTP Basic Auth in front of it.

## Why not GitHub Pages

**GitHub Pages cannot serve a private site** on Free, Pro or Team plans. Publishing from a
private repository makes the *site* public — repository visibility and site visibility are
separate things. Private Pages needs GitHub Enterprise Cloud.

A JavaScript password gate on GitHub Pages is not a substitute. The content is downloaded
before the script runs, and the password is in the page source. For a library holding client
research and competitors' copyrighted store assets, that is worse than no lock, because it
looks like one.

## The shape of it

Build locally, deploy the output. **The research repo never leaves your machine** — the site
reads `../product-context` at build time, so only rendered HTML and images are uploaded.
Building in CI would mean putting SCB research on GitHub, which this arrangement avoids.

```
product-context/   ─ read at build time, stays local
product-codebase/  ─ source on GitHub
  dist/            ─ built output, the only thing deployed
  functions/       ─ Basic Auth, runs at Cloudflare's edge
```

## One-time setup

1. Create a Cloudflare account, then a Pages project (Workers & Pages → Create → Pages →
   Direct Upload). Name it, e.g. `scb-easy-knowledge-library`.

2. Set the password. In the project: **Settings → Environment variables → Production**, add

   ```
   SITE_PASSWORD = scb
   ```

   Set it for Preview too, or preview deployments will refuse to serve. The middleware fails
   closed: with no password set, it returns 503 rather than serving the site openly.

3. Install the CLI once:

   ```bash
   npm install -D wrangler
   ```

## Deploying

```bash
npm run deploy
```

That builds and uploads `dist/`. Colleagues get a `*.pages.dev` URL, are prompted for a
password, and any username works.

## What this protects, and what it does not

**Protects:** nothing is served until the password is accepted — pages, images, everything.
Responses are marked `no-store` and `noindex`, so they are not cached by proxies or indexed
by search engines.

**Does not protect:** one shared password is one shared password. It cannot be revoked per
person, it does not say who viewed what, and anyone given it can pass it on. Fine for a small
internal team; not an access-control system.

If you later need per-person access, revocation or an audit trail, **Cloudflare Access** on
the same project gives email one-time-PIN or Google/Microsoft SSO free for up to 50 users.
That is a settings change, not a rebuild.

## Before sharing the link

Two non-technical checks.

**Client material on a third-party host.** Whoever owns the SCB relationship should confirm
this is acceptable. The library contains client research, and the screen galleries contain
SCB's and competitors' copyrighted store assets, used here for internal reference.

**Confidence markers.** Much of the library is explicitly unvalidated — pages carry
`needs-research`, `needs-verification`, evidence ceilings, and retired artefacts kept for
traceability. A colleague arriving cold can mistake a hypothesis for a finding. Point people
at the Plan Overview of each stream first.
