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
pnpm run build          # Build slide deck and copy to dist
pnpm run export:png      # Export slides as PNG images
```

### Deployment
Production deploys from `.github/workflows/deploy.yml` on every push to `main`, which runs
`deploy:prd`. Cloudflare's own Workers Builds is not used, so the R2 sync and the Worker
deploy always happen together.

```bash
pnpm run deploy:dev   # dev is deployed by hand
pnpm run deploy:prd   # what CI runs

pnpm run sync:dev     # mirror dist/ into R2 without deploying
pnpm run sync:prd
```

Each deploy command builds everything, mirrors `dist/` into R2, then deploys the Worker.
`rclone sync --checksum` uploads only what actually changed, so every file is compared on
every run and there is nothing to select by hand.

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
- **demo/**: Demo functionality routes (e.g., iOS Safari App Experience)

#### Slide Presentations (`slidev/`)
Each slide deck is self-contained with:
- **slides.md**: Main slide content
- **components/**: Vue components (Footer.vue, etc.)
- **slides-export/**: PNG exports for thumbnails
- **uno.config.ts**: UnoCSS configuration

### Build Process
1. Each slide deck builds with Slidev, outputs to `../../dist/slides/[slide-name]/`
2. PNG exports are copied there for thumbnail generation
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
1. Create new directory in `slidev/`
2. Copy package.json structure from existing slide
3. Update build scripts with correct paths
4. Add workspace entry if needed
5. Add the title to `titles()` in `home/htmlRewriterHandler.ts` and a `Section` entry in `home/app/index.tsx`
6. Publish with `pnpm run deploy:prd`; the new deck is picked up automatically

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
