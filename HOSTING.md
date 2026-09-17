# Sharing the Knowledge Library

Two ways, depending on whether colleagues need a folder or a URL.

## The simple one: publish into Box

The workspace already lives in Box, so **there is nothing to upload**. Box syncs the
filesystem; publishing just means putting the built site where colleagues can find it.

```bash
npm run publish
```

That builds, rewrites the output to work without a server, and copies it to

```
SCB Easy/AI Folder/Knowledge Library/index.html
```

beside the project rather than buried in `product-codebase/dist`, which is git-ignored and
not somewhere anyone would look. Colleagues open that file from their own Box sync. Re-run it
after changing research and they get the update when Box syncs — nobody downloads anything.

A `READ ME FIRST.txt` goes in alongside, with the publish date and a short note on how to
read the confidence markers.

**Box is the access control**, which is a better arrangement than it sounds: per-person
permissions, revocable, with a record of who opened what. A shared site password gives you
none of that.

### Why the build needs rewriting

Astro builds for a web server — links are absolute (`/studies/…`) and pages are directories
served by an implicit `index.html`. From `file://`, absolute paths resolve to the filesystem
root and a link to a directory shows a listing. `scripts/make-portable.mjs` rewrites both:

```
/studies/foo/   ->  ../../studies/foo/index.html
/screens/x.jpg  ->  ../../screens/x.jpg
```

Interactivity survives — the screen matrix, filters, galleries and lightbox all work —
because the site's scripts are inline modules with no imports, so nothing is fetched at
runtime. Google Fonts are the one exception: without a connection the pages fall back to
system fonts, which changes how Thai text is set but not whether it reads.

### The honest limitation

**A colleague reading it while you re-publish may see a half-synced state**, since the target
folder is replaced wholesale. It resolves itself once Box finishes. Publish when nobody is
mid-read if that matters.

## The other one: a private URL

Host on **Cloudflare Pages** with a password. Free, and the password is checked at
Cloudflare's edge before any page or image is served.

```bash
npm run deploy
```

Setup, once:

1. Create a Cloudflare Pages project (Workers & Pages → Create → Pages → Direct Upload).
2. Settings → Environment variables → add `SITE_PASSWORD` for Production **and** Preview.
3. `npm install -D wrangler`

`functions/_middleware.js` enforces it. It fails closed: with no password set it returns 503
rather than serving the site openly, and the password lives in the Cloudflare project rather
than the repo.

One shared password cannot be revoked per person and travels wherever it is forwarded. If you
need per-person access later, Cloudflare Access on the same project gives email one-time-PIN
or Google/Microsoft SSO free for up to 50 users.

### Not GitHub Pages

GitHub Pages cannot serve a private site below Enterprise Cloud. Publishing from a private
repository makes the **site** public — repository visibility and site visibility are separate.
A JavaScript password gate is not a substitute: the content downloads before the script runs,
and the password sits in the page source.

## Either way

**The research repo never leaves your machine.** The site reads `../product-context` at build
time; only rendered HTML and images are shared. Building in CI would mean putting SCB research
on a hosting provider, which both of these avoid.

Two non-technical checks before sharing:

**Client material.** Whoever owns the SCB relationship should be comfortable with this being
distributed, including the screen galleries, which contain SCB's and competitors' copyrighted
store assets used here for internal reference.

**Confidence markers.** Much of the library is explicitly unvalidated — pages carry
`needs-research`, `needs-verification`, evidence ceilings, and retired artefacts kept for
traceability. Someone arriving cold can read a hypothesis as a finding. Point people at each
stream's Plan Overview first.
