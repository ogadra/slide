# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal slides website that hosts multiple Slidev presentations. The architecture consists of:
- Individual slide decks in `slidev/` directory
- A homepage in `home/` that serves as a slide archive
- Cloudflare Workers deployment with dynamic HTML rewriting

## Common Commands

### Development
```bash
# Run root workspace build (builds all slides and home)
npm run build

# Develop a specific slide deck
cd slidev/[slide-name]
npm run dev

# Develop the homepage
cd home
npm run dev
```

### Building Individual Slides
```bash
# Inside any slidev/[slide-name] directory
npm run build          # Build slide deck and copy to dist
npm run export:png      # Export slides as PNG images
```

### Deployment
```bash
# Deploy to Cloudflare Workers
wrangler deploy
```

### Quality Assurance
```bash
# Run type checking (from home directory)
cd home
npm run typecheck

# Run linting
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix issues

# Pre-commit hooks automatically run:
# - Type checking
# - Secrets detection with gitleaks
# - Code formatting and linting
```

## Architecture

### Monorepo Structure
- **Root**: npm workspace configuration
- **home/**: Hono-based server for homepage and routing
- **slidev/**: Individual slide presentations
- **dist/**: Build output directory served by Cloudflare Workers

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
1. Each slide deck builds with Slidev, outputs to `../../dist/[slide-name]/`
2. PNG exports are copied to dist for thumbnail generation
3. Homepage builds separately with Vite
4. Cloudflare Workers serves static assets with dynamic routing

### Technologies
- **Slidev**: Presentation framework
- **Hono**: Lightweight web framework
- **Cloudflare Workers**: Hosting platform
- **UnoCSS**: CSS framework
- **Vite**: Build tool
- **TypeScript**: Type safety

## Development Notes

### Adding New Slides
1. Create new directory in `slidev/`
2. Copy package.json structure from existing slide
3. Update build scripts with correct paths
4. Add workspace entry if needed

### Slide Routing
- Homepage: `/`
- Slide deck: `/:slide-name/`
- Specific slide: `/:slide-name/:slide-number`
- Demo pages: `/demo/*` (e.g., `/demo/ios-safari-app-experience`)

### Asset Handling
Static assets are served through Cloudflare Workers binding with `c.env.ASSETS.fetch()`

### Development Workflow
1. **Code Quality**: Lefthook pre-commit hooks enforce type checking, linting, and secrets detection
2. **Monorepo Management**: npm workspaces handle dependencies across slide decks and homepage
3. **Build Pipeline**: Each slide deck builds independently to shared dist directory
4. **Local Development**: Use `wrangler dev --local` for full-stack testing with Workers runtime
