# product-codebase

The code plane of this workspace. The **Develop** harness is the only role that writes
here; it reads the specs in the sibling `product-context/` repo as read-only intent.

## Status

One thing exists: the **internal reference site**. Phase one only — it renders the
research artefacts in `product-context/`. There is no design system documentation yet,
because there are no tokens or components yet.

## Stack

Astro 5, static output, no UI framework.

Chosen for one reason: it reads markdown natively and can glob content from **outside**
its own directory, which is what lets the site read `product-context/` rather than copy
it. That constraint comes from ADR-1.

> **Owed:** the stack decision is not yet recorded as an ADR. `decisions/` is outside
> every role's write-scope by design, so a human must place it. ADR-1 is the reference
> site; the stack record would be ADR-2.

## Commands

```bash
npm install
npm run dev      # live against product-context; markdown edits hot-reload
npm run build    # static output to dist/
npm run preview  # serve the built output
```

## How the site reads content

`src/loaders/provenance-markdown.ts` is a custom Astro loader, and it exists for a
specific reason worth knowing before you touch it.

Every artefact in `product-context/` carries its provenance header as an HTML comment
**above** the YAML frontmatter:

```
<!-- artifact: … | mode: … | updated: … | evidence: … -->
---
id: STU-001
---
```

That ordering is the house convention, and it is what makes staleness visible. It also
means the frontmatter is not the first thing in the file, so Astro's stock `glob()`
loader silently fails to parse it — you get file paths where titles should be. The
loader lifts the comment out into `data.provenance`, then parses the rest normally.

**The site adapts to the source convention, never the reverse.** Do not reorder headers
in `product-context` to suit the build.

## Token layer

`src/styles/tokens.css` is a **placeholder** for the site shell. Values are sampled from
scb.co.th (purple ramp `#7A58BF`–`#412775`, peach `#F6A969`, tint `#EBECF5`) so the shell
reads as SCB. They are not authoritative and carry no design decision. The file follows
the three-tier structure (primitive → semantic → component) so replacing it with generated
token output is a swap rather than a rewrite. Once the real pipeline exists it is
generated and never hand-edited.

**Typeface debt.** SCB's brand face is Sukhumvit Tadmai (Cadson Demak), which is licensed
and cannot be self-hosted here. The stack falls back to IBM Plex Sans Thai — also Cadson
Demak, similar humanist Thai construction — so proportions are close but not correct.
Licensing the real face is an open item.

**Data debt.** `src/data/sister-apps.ts` transcribes the nine-app portfolio from the SCBX
Screen Estate artefact. It is a copy, and copies drift. The list belongs in
product-context as a register the site reads; it sits in code only because the source
currently holds it inside a prose table rather than as structured data.

## House style

- **Design tokens, not raw values.** Consume the generated token output; never hardcode
  hex or px. Generated output is never hand-edited.
- **Accessibility is a floor, not a feature:** keyboard-operable, focus managed,
  `prefers-reduced-motion` honoured, contrast ≥ AA.
- **Never copy content from `product-context`.** Read it at build time. A copied value
  drifts from its source; a reference does not.
- Co-locate tests with the code they cover.
- Every change traces to a spec (`SPEC-<area>-<n>`); if a spec is wrong, amend it via the
  Design harness rather than diverging silently in code.

## Known caveat

This repo sits inside a Box-synced folder. `node_modules/` is git-ignored, but Box will
still try to sync its thousands of files, which is slow and can corrupt state mid-write.
If installs or builds behave strangely, exclude `node_modules/` from Box sync.
