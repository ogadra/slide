# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal slides website that hosts multiple Slidev presentations. The architecture consists of:
- Individual slide decks in `slidev/` directory
- A homepage in `home/` that serves as a slide archive
- Cloudflare Workers deployment with dynamic HTML rewriting
- All static files stored in R2 and served through the `ASSETS` binding

## Common Commands

### Development
```bash
# Run the Worker locally (seeds dist/ into the local R2 first)
pnpm run dev

# Run root workspace build (builds all slides and home)
pnpm run build

# Develop a specific slide deck
cd slidev/[slide-name]
pnpm run dev

# Develop the homepage
cd home
pnpm run dev
```

### Building Individual Slides
```bash
# Inside any slidev/[slide-name] directory
pnpm run build          # Build the deck and export its PNGs into dist
pnpm run build:png      # Export the PNGs only
```

`build:png` runs `slidev export --format png`, so it needs the Playwright Chromium that
`pnpm install` pulls in. It writes into `dist/slides/[slide-name]/slides-export/` after
`build:slidev`, which empties that directory first.

### Deployment
Production deploys from `.github/workflows/deploy.yml` on every push to `main`. Cloudflare's
own Workers Builds is not used, so the R2 sync and the Worker deploy always happen together.

CI builds the homepage plus the decks that push touched, then syncs and deploys. A change to
the root `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml` or `patches/` rebuilds every
deck, and so does a manual `workflow_dispatch` run.

```bash
pnpm run deploy:dev   # dev is deployed by hand
pnpm run deploy:prd   # the same three steps, building everything

pnpm run sync:dev     # mirror dist/ into R2 without deploying
pnpm run sync:prd
```

Both deploy commands build, mirror `dist/` into R2, then deploy the Worker. `syncAssets.ts`
uploads whatever `dist/` holds and leaves the rest of the bucket alone, which is what lets CI
build a subset. `rclone sync --checksum` then uploads only the files that actually differ.

Syncing requires `rclone` (provided by the Nix dev shell) and the R2 credentials in `.env`.
Each environment has its own API token, so a dev sync can never write to production.
See `.env.sample`. CI reads the same names from repository secrets, plus
`CLOUDFLARE_API_TOKEN` for `wrangler deploy`. `CLOUDFLARE_ACCOUNT_ID` serves both, since
the R2 endpoint host is the account id.

### Quality Assurance
```bash
# Run type checking for scripts/ (from the repository root)
pnpm run typecheck

# Run type checking (from home directory)
cd home
pnpm run typecheck

# Run linting
pnpm run lint          # Check for issues
pnpm run lint:fix      # Auto-fix issues

# Pre-commit hooks automatically run:
# - Type checking
# - Secrets detection with gitleaks
# - Code formatting and linting
```

`.github/workflows/check.yml` runs the same lint and type checks on every pull request,
so a commit that skipped the hooks still gets caught before it reaches `main`.

## Architecture

### Monorepo Structure
- **Root**: pnpm workspace configuration
- **home/**: Hono-based server for homepage and routing
- **slidev/**: Individual slide presentations
- **scripts/**: Operational scripts (`syncAssets.ts`)
- **dist/home/**: Homepage output, uploaded to R2 under `home/`
- **dist/slides/**: Slide deck output, uploaded to R2 under `slides/`

### Key Components

#### Homepage (`home/`)
- **server.ts**: Hono server with asset handling and slide routing
- **htmlRewriterHandler.ts**: Dynamic HTML manipulation for slide metadata
- **app/index.tsx**: React-based landing page displaying all slide presentations
- **scripts/generateManifest.ts**: Reads every deck's headmatter into `generated/manifest.ts`
- **demo/**: Demo functionality routes (e.g., iOS Safari App Experience)

#### Slide Presentations (`slidev/`)
Each slide deck is self-contained with:
- **slides.md**: Main slide content
- **components/**: Vue components (Footer.vue, etc.)
- **uno.config.ts**: UnoCSS configuration

### Build Process
1. Each slide deck builds with Slidev, outputs to `../../dist/slides/[slide-name]/`
2. The same build exports one PNG per slide into `slides-export/`, which serves the OGP
   image and the homepage thumbnail. The PNGs live only in `dist/` and R2, never in git
3. Homepage builds separately with Vite into `dist/home/`
4. `syncAssets.ts` mirrors `dist/` into the R2 bucket with `rclone sync --checksum`, keeping the same layout

### Technologies
- **Slidev**: Presentation framework
- **Hono**: Lightweight web framework
- **Cloudflare Workers**: Hosting platform
- **Cloudflare R2**: Static file storage
- **UnoCSS**: CSS framework
- **Vite**: Build tool
- **TypeScript**: Type safety

## Development Notes

### Adding New Slides
`./create-slide.sh` does all of this. It takes no arguments and asks for the
Japanese name, the English name, the presentation date, the event name and the event
page URL, then writes them into the headmatter along with everything else a deck
needs. The English name is the directory under `slidev/`, the URL and the package
name, so it is asked again while it is not kebab-case or already taken.

By hand:
1. Create new directory in `slidev/`
2. Copy package.json structure from existing slide
3. Update build scripts with correct paths
4. Add workspace entry if needed
5. Fill in the headmatter of `slides.md` (see below)
6. Publish with `pnpm run deploy:prd`; the new deck is picked up automatically

Nothing under `home/` has to be touched. The homepage listing and the OGP tags both
come from the headmatter.

### Slide Metadata
`home/scripts/generateManifest.ts` reads the headmatter of every `slidev/*/slides.md`
and writes `home/generated/manifest.ts`, which `home/app/index.tsx` and
`home/htmlRewriterHandler.ts` import. The file is generated, not committed, so it is
rebuilt by `pnpm run dev`, `pnpm run build` and `pnpm run typecheck`.

| Key | Required | Format | Meaning |
|---|---|---|---|
| `title` | ✓ | string | Shown on the homepage and in `og:title` |
| `date` | ✓ | `'YYYY/MM/DD'` | Presentation date. Sorted descending |
| `event` | ✓ | string | Event name. `非公開発表` when there is none |
| `eventLink` | | URL | Event page. Omit the key when there is none |
| `order` | | number | Position within one event. Defaults to 0, ascending |

Quote the values. A `#` after a space starts a YAML comment, which would truncate an
event name like `埼京.dev #3【俺の考えた最強の◯◯】` without any error. Decks that share a
`date` and an `event` are shown as one entry, so their `eventLink` has to match.
A missing or malformed key fails the build with the file path and the key name.

### Slide Routing
- Homepage: `/`
- Slide deck: `/:slide-name/`
- Specific slide: `/:slide-name/:slide-number`
- Demo pages: `/demo/*` (e.g., `/demo/ios-safari-app-experience`)

### Asset Handling
The bucket mirrors `dist/`, so every file is read with `c.env.ASSETS.get()`. `/assets/*` maps to
`home/assets/*` and everything else to `slides/*`. There is no static assets binding.

### Development Workflow
1. **Code Quality**: Lefthook pre-commit hooks enforce type checking, linting, and secrets detection
2. **Monorepo Management**: pnpm workspaces handle dependencies across slide decks and homepage
3. **Build Pipeline**: Each slide deck builds independently into `dist/slides/`
4. **Local Development**: `pnpm run dev` seeds `dist/` into the local R2, so a build has to come first
5. **Publishing**: pushing to `main` runs `deploy:prd` in GitHub Actions
