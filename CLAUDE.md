# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal slides website hosting multiple Slidev presentations:

- `slidev/<deck>/` — self-contained decks (`slides.md`, `components/`, `uno.config.ts`), one pnpm workspace package each
- `home/` — Hono Worker serving the homepage, slide routing and demo pages
- `scripts/` — operational scripts
- `dist/` — build output, mirrored to R2 and served through the `ASSETS` binding

## Commands

```bash
cd slidev/<deck> && pnpm run dev          # per-deck preview
pnpm run build                            # every deck + home
pnpm run test                             # vitest
pnpm run typecheck                        # scripts/, .github/scripts/, e2e/
pnpm --filter slide-home run typecheck    # home/; needs .dev.vars (cp .dev.vars.sample .dev.vars)
pnpm --filter slide-home run lint[:fix]   # biome; root has no lint script
```

## Slide decks

`./create-slide.sh` scaffolds a new deck.
The homepage listing and OGP tags are generated from every deck's `slides.md` headmatter by `home/scripts/generateManifest.ts` into `home/generated/manifest.ts` (generated, not committed).

| Key | Required | Format | Meaning |
|---|---|---|---|
| `title` | ✓ | string | Homepage and `og:title` |
| `date` | ✓ | `'YYYY/MM/DD'` | Sorted descending |
| `event` | ✓ | string | `非公開発表` when there is none |
| `eventLink` | | URL | Omit the key when there is none |
| `order` | | number | Position within one event, defaults to 0, ascending |

Quote the values: a `#` after a space starts a YAML comment.
Decks sharing a `date` and an `event` show as one entry, so their `eventLink` has to match.
A missing or malformed key fails the build with the file path and the key name.
