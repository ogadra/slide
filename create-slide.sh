#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Usage function
usage() {
    echo "Usage: $0 <slide-name-en> <slide-name-ja>"
    echo "Creates a new Slidev presentation with the given name"
    echo "Example: $0 my-awesome-presentation 私の素晴らしいプレゼンテーション"
    exit 1
}

# Check if slide name is provided
if [ $# -eq 0 ]; then
    echo -e "${RED}Error: No slide name provided${NC}"
    usage
fi

SLIDE_NAME_EN=$1
SLIDE_NAME_JA=$2

# Validate slide name (kebab-case)
if ! [[ "$SLIDE_NAME_EN" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
    echo -e "${RED}Error: Slide name must be in kebab-case (lowercase letters, numbers, and hyphens only)${NC}"
    echo -e "${YELLOW}Example: my-awesome-presentation${NC}"
    exit 1
fi

# Check if directory already exists
SLIDE_DIR="slidev/$SLIDE_NAME_EN"
if [ -d "$SLIDE_DIR" ]; then
    echo -e "${RED}Error: Directory $SLIDE_DIR already exists${NC}"
    exit 1
fi

# Create directory structure
echo -e "${GREEN}Creating slide directory: $SLIDE_DIR${NC}"
mkdir -p "$SLIDE_DIR"
mkdir -p "$SLIDE_DIR/components"
mkdir -p "$SLIDE_DIR/slides-export"

# Create package.json
echo -e "${GREEN}Creating package.json...${NC}"
cat > "$SLIDE_DIR/package.json" <<EOF
{
  "name": "$SLIDE_NAME_EN",
  "type": "module",
  "version": "0.0.1",
  "private": true,
  "author": "ogadra",
  "scripts": {
    "build": "npm run build:slidev && npm run build:copy",
    "build:copy": "cp -r ./slides-export ../../dist/$SLIDE_NAME_EN",
    "build:slidev": "slidev build --base /$SLIDE_NAME_EN/ --out ../../dist/$SLIDE_NAME_EN",
    "dev": "slidev --open",
    "export": "slidev export",
    "export:png": "slidev export --format png"
  }
}
EOF

# Create slides.md
echo -e "${GREEN}Creating slides.md...${NC}"
cat > "$SLIDE_DIR/slides.md" <<EOF
---
theme: purplin
title: $SLIDE_NAME_JA
info: $SLIDE_NAME_JA
colorSchema: 'dark'
drawings:
  enabled: false
transition: slide-left
mdc: true
canvasWidth: 960
---

<style>
.slidev-layout {
  padding-top: 0 !important;
}

</style>

# $SLIDE_NAME_JA
## ogadra

---
layout: image-x
image: https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif
imageOrder: 2
---

# ogadra

Motto: Done is better than perfect.

Favorite languages: TypeScript, Go

---

- Twitter: [@const_myself](https://twitter.com/const_myself)
- GitHub: [ogadra](https://github.com/ogadra)

<PoweredBySlidev mt-10 />

EOF

# Create components/Footer.vue
echo -e "${GREEN}Creating components/Footer.vue...${NC}"
cat > "$SLIDE_DIR/components/Footer.vue" <<EOF
<style scoped>
div {
  font-size: 0.75rem;
}
</style>

<template>
  <div class="fixed left-0 bottom-0 bg-barBottom flex absolute w-full text-sm">
    <div class="text-left bg-barBottomLeft left-0 py-0.5 px-1">
      $SLIDE_NAME_JA
    </div>
    <div class="w-1/2 flex justify-end ml-auto px-2">
      <Item text="ogadra">
        <carbon:logo-github />
      </Item>
      <Item text="const_myself">
        <carbon:logo-twitter />
      </Item>
      <Item text="slide.ogadra.com">
        <carbon:link />
      </Item>
    </div>
  </div>
</template>
EOF

# Create global-bottom.vue
echo -e "${GREEN}Creating global-bottom.vue...${NC}"
cat > "$SLIDE_DIR/global-bottom.vue" <<'EOF'
<template>
  <Footer />
</template>
EOF

# Create style.css
echo -e "${GREEN}Creating style.css...${NC}"
cat > "$SLIDE_DIR/style.css" <<'EOF'
html {
  font-size: 125%;
}

h1 {
  line-height: 1.0 !important;
  padding-top: 0;
  font-size: 2rem !important;
}

h2 {
  font-size: 3rem !important;
  line-height: 1.25 !important;
  font-size: 2.25rem !important;
  padding-top: 1.5rem;
}

h3 {
  opacity: 1 !important;
  font-size: 1.5rem !important;
  line-height: 2 !important;
  padding-top: 1rem !important;
  margin-bottom: 1rem !important;
  border-bottom: 3px solid #4299e1;
}

p {
  font-size: 1.25rem !important;
  line-height: 1.5 !important;
}

li {
  font-size: 1.4rem !important;
  line-height: 2 !important;
}

code {
  font-size: 1rem !important;
}

.text-09675 * {
  font-size: 0.9675rem !important;
}

.text-094 * {
  font-size: 0.94rem !important;
}

img {
  margin: 0 auto;
}

EOF

# Create uno.config.ts
echo -e "${GREEN}Creating uno.config.ts...${NC}"
cat > "$SLIDE_DIR/uno.config.ts" <<'EOF'
import { resolve } from 'path'
import { defineConfig } from 'vite-plugin-windicss'

// extend the base config
export default defineConfig({
  extract: {
    include: [
      resolve(__dirname, '**/*.{vue,ts}'),
    ],
  },
  shortcuts: {
    // custom the default background
    'bg-main': 'bg-[#1E1E1E] text-[#D4D4D4]',
    'border-image': 'border border-[#121212] border-opacity-10 shadow-md shadow-[#121212]',
    'bg-barBottom': 'bg-[#007ACC] text-[#FFFFFF]',
    'bg-barBottomLeft': 'bg-[#16825D] text-[#FFFFFF]',
  },
  theme: {
    extend: {
      // fonts can be replaced here, remember to update the web font links in `index.html`
      fontFamily: {
        sans: '"Rubik", ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
        mono: '"Fira Code", monospace',
      }
    },
  },
})
EOF

# Install dependencies
echo -e "${GREEN}Installing dependencies...${NC}"
npm install

# Success message
echo ""
echo -e "${GREEN}✨ Successfully created slide: $SLIDE_NAME_EN${NC}"
echo -e "${GREEN}Starting development server...${NC}"
echo ""
echo -e "${GREEN}Happy presenting! 🚀${NC}"

# Start development server (this will block until stopped)
cd "$SLIDE_DIR" && npm run dev
