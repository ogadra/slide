#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Usage function
usage() {
    echo "Usage: $0 <slide-name>"
    echo "Creates a new Slidev presentation with the given name"
    echo "Example: $0 my-awesome-presentation"
    exit 1
}

# Check if slide name is provided
if [ $# -eq 0 ]; then
    echo -e "${RED}Error: No slide name provided${NC}"
    usage
fi

SLIDE_NAME=$1

# Validate slide name (kebab-case)
if ! [[ "$SLIDE_NAME" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
    echo -e "${RED}Error: Slide name must be in kebab-case (lowercase letters, numbers, and hyphens only)${NC}"
    echo -e "${YELLOW}Example: my-awesome-presentation${NC}"
    exit 1
fi

# Check if directory already exists
SLIDE_DIR="slidev/$SLIDE_NAME"
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
  "name": "$SLIDE_NAME",
  "type": "module",
  "version": "0.0.1",
  "private": true,
  "author": "ogadra",
  "scripts": {
    "build": "npm run build:slidev && npm run build:copy",
    "build:copy": "cp -r ./slides-export ../../dist/$SLIDE_NAME",
    "build:slidev": "slidev build --base /$SLIDE_NAME/ --out ../../dist/$SLIDE_NAME",
    "dev": "slidev --open",
    "export": "slidev export",
    "export:png": "slidev export --format png"
  }
}
EOF

# Create slides.md
echo -e "${GREEN}Creating slides.md...${NC}"
cat > "$SLIDE_DIR/slides.md" <<'EOF'
---
theme: seriph
background: https://cover.sli.dev
title: Welcome to Slidev
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Welcome to Slidev

Presentation slides for developers

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/slidevjs/slidev" target="_blank" alt="GitHub" title="Open in GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---
transition: fade-out
---

# What is Slidev?

Slidev is a slides maker and presenter designed for developers, consist of the following features

- 📝 **Text-based** - focus on the content with Markdown, and then style them later
- 🎨 **Themable** - theme can be shared and used with npm packages
- 🧑‍💻 **Developer Friendly** - code highlighting, live coding with autocompletion
- 🤹 **Interactive** - embedding Vue components to enhance your expressions
- 🎥 **Recording** - built-in recording and camera view
- 📤 **Portable** - export into PDF, PNGs, or even a hostable SPA
- 🛠 **Hackable** - anything possible on a webpage

<br>
<br>

Read more about [Why Slidev?](https://sli.dev/guide/why)

---

# Navigation

Hover on the bottom-left corner to see the navigation's controls panel, [learn more](https://sli.dev/guide/navigation.html)

## Keyboard Shortcuts

|     |     |
| --- | --- |
| <kbd>right</kbd> / <kbd>space</kbd>| next animation or slide |
| <kbd>left</kbd>  / <kbd>shift</kbd><kbd>space</kbd> | previous animation or slide |
| <kbd>up</kbd> | previous slide |
| <kbd>down</kbd> | next slide |

---
layout: center
class: text-center
---

# Learn More

[Documentations](https://sli.dev) · [GitHub](https://github.com/slidevjs/slidev) · [Showcases](https://sli.dev/showcases.html)
EOF

# Create components/Footer.vue
echo -e "${GREEN}Creating components/Footer.vue...${NC}"
cat > "$SLIDE_DIR/components/Footer.vue" <<'EOF'
<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $slidev } = useSlideContext()
const slideNumber = computed(() => $slidev.nav.currentPage)
const totalSlides = computed(() => $slidev.nav.total)
</script>

<template>
  <footer
    v-if="slideNumber > 1"
    class="absolute bottom-0 left-0 right-0 p-2 text-gray-400"
  >
    <p class="text-xs text-center">
      @ogadra - {{ slideNumber }} / {{ totalSlides }}
    </p>
  </footer>
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
/* Custom styles for the presentation */

.slidev-layout h1 {
  @apply text-4xl font-bold mb-4;
}

.slidev-layout h2 {
  @apply text-3xl font-semibold mb-3;
}

.slidev-layout h3 {
  @apply text-2xl font-medium mb-2;
}

.slidev-layout p {
  @apply mb-4;
}

.slidev-layout ul, .slidev-layout ol {
  @apply mb-4 ml-6;
}

.slidev-layout li {
  @apply mb-2;
}

.slidev-layout code {
  @apply bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm;
}

.slidev-layout pre {
  @apply mb-4;
}

/* Custom animations */
.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
EOF

# Create uno.config.ts
echo -e "${GREEN}Creating uno.config.ts...${NC}"
cat > "$SLIDE_DIR/uno.config.ts" <<'EOF'
import { defineConfig } from 'unocss'
import config from '@slidev/client/uno.config'

export default defineConfig({
  ...config,
  shortcuts: {
    ...config.shortcuts,
    // Custom shortcuts can be added here
  },
  rules: [
    ...config.rules || [],
    // Custom rules can be added here
  ],
})
EOF

# Success message
echo -e "${GREEN}✨ Successfully created slide: $SLIDE_NAME${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo -e "  1. cd $SLIDE_DIR"
echo -e "  2. npm install @slidev/cli @slidev/theme-seriph"
echo -e "  3. npm run dev"
echo ""
echo -e "${GREEN}Happy presenting! 🚀${NC}"
