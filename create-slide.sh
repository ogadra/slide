#!/usr/bin/env bash

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
echo -e "${GREEN}Creating slide...${NC}"
mkdir -p "$SLIDE_DIR"
mkdir -p "$SLIDE_DIR/components"
mkdir -p "$SLIDE_DIR/slides-export"
mkdir -p "$SLIDE_DIR/imgs"
mkdir -p "$SLIDE_DIR/setup"

# Create package.json
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

<div style="height: 100px"/>

# $SLIDE_NAME_JA

<div style="height: 30px" />

## ogadra

---

<div style="position: absolute; top: 50%; left: 30%; transform: translate(-50%, -50%);">
  <img src="/imgs/qr.png" alt="このスライドのQRコード" style="width: 350px;" />
</div>

<div style="position: absolute; top: 50%; right: 5%; transform: translateY(-50%); text-align: center;">
  <p style="font-size: 1.75rem !important; color: #ff6b6b; font-weight: bold;">写真撮影はご遠慮ください</p>
  <p style="font-size: 1.3rem !important; margin-top: 1rem; color: #aaa;">発表者は顔出しNGのため</p>
</div>

<div style="position: absolute; right: 4rem; top: 3rem;">
  <div style="display: flex; flex-direction: column; align-items: flex-end;">
    <span style="font-size: 1.5rem; transform: rotate(-45deg); margin-bottom: 0.25rem;">→</span>
    <span style="font-size: 0.9rem; color: #4ec9b0;">タップでスライド同期をオフにできます</span>
  </div>
</div>

---
layout: image-x
image: https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif
imageOrder: 2
---

## Thank you for listening!

Done is better than perfect.

- Twitter: [@const_myself](https://twitter.com/const_myself)
- GitHub: [ogadra](https://github.com/ogadra)

<PoweredBySlidev mt-10 />

EOF

# Create components/Footer.vue
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
cat > "$SLIDE_DIR/global-bottom.vue" <<'EOF'
<template>
  <Footer />
</template>
EOF

# Create global-top.vue
cat > "$SLIDE_DIR/global-top.vue" <<'EOF'
<template>
  <LiveIcon />
</template>
EOF

# Create setup/connectionState.ts
cat > "$SLIDE_DIR/setup/connectionState.ts" <<'EOF'
import { ref } from "vue";

export const ConnectionStatusEnum = {
	Connected: "Connected",
	Connecting: "Connecting",
	Disconnected: "Disconnected",
};

export const connectionStatus = ref<ConnectionState>(
	ConnectionStatusEnum.Connecting,
);

type ConnectionState =
	(typeof ConnectionStatusEnum)[keyof typeof ConnectionStatusEnum];

// WebSocketインスタンスへの参照
let wsInstance: WebSocket | null = null;

export const setWsInstance = (ws: WebSocket | null) => {
	wsInstance = ws;
};

export const getWsInstance = () => wsInstance;

export const changeConnectionState = (newState: ConnectionState) => {
	connectionStatus.value = newState;
};
EOF

# Create components/LiveIcon.vue
cat > "$SLIDE_DIR/components/LiveIcon.vue" <<'EOF'
<script setup lang="ts">
import {
  ConnectionStatusEnum,
  changeConnectionState,
  connectionStatus,
  getWsInstance,
} from '../setup/connectionState';

const changeConnectionStatus = () => {
  switch (connectionStatus.value) {
    case ConnectionStatusEnum.Connected:
    case ConnectionStatusEnum.Connecting:
      changeConnectionState(ConnectionStatusEnum.Disconnected);
      break;

    case ConnectionStatusEnum.Disconnected: {
      const ws = getWsInstance();
      if (ws && ws.readyState === WebSocket.OPEN) {
        changeConnectionState(ConnectionStatusEnum.Connected);
      } else {
        changeConnectionState(ConnectionStatusEnum.Connecting);
      }
      break;
    }
  }
};

</script>

<template>
  <div class="fixed top-4 right-4 z-50">
    <button
      @click="changeConnectionStatus"
      class="relative flex items-center w-24 h-8 px-2 rounded-full transition-colors duration-300"
      :class="{
        'bg-red-600 shadow-lg shadow-red-500/50': connectionStatus === ConnectionStatusEnum.Connected,
        'bg-yellow-600 shadow-lg shadow-yellow-500/50': connectionStatus === ConnectionStatusEnum.Connecting,
        'bg-gray-700 hover:bg-gray-600': connectionStatus === ConnectionStatusEnum.Disconnected
      }"
    >
      <span
        class="absolute w-3 h-3 rounded-full transition-all duration-300 ease-in-out"
        :class="{
          'bg-white animate-pulse left-[calc(100%-1rem)]': connectionStatus === ConnectionStatusEnum.Connected,
          'bg-yellow-200 animate-ping left-1/2 -translate-x-1/2': connectionStatus === ConnectionStatusEnum.Connecting,
          'bg-gray-500 left-2': connectionStatus === ConnectionStatusEnum.Disconnected
        }"
      />
      <span
        class="w-full text-center text-xs font-semibold uppercase tracking-wide"
        :class="{
          'text-white': connectionStatus === ConnectionStatusEnum.Connected || connectionStatus === ConnectionStatusEnum.Connecting,
          'text-gray-300': connectionStatus === ConnectionStatusEnum.Disconnected
        }"
      >
        <template v-if="connectionStatus === ConnectionStatusEnum.Connected">Live</template>
        <template v-else-if="connectionStatus === ConnectionStatusEnum.Connecting"><span class="text-[11.5px]">Connecting</span></template>
        <template v-else>Off</template>
      </span>
    </button>
  </div>
</template>

<style scoped>
button {
  cursor: pointer;
  border: none;
  outline: none;
}
</style>
EOF

# Create style.css
cat > "$SLIDE_DIR/style.css" <<'EOF'
html {
  font-size: 125%;
}

/* キーフレームアニメーション */
@keyframes shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

@keyframes rainbow {
  0% { background-position: 0% 50%; }
  100% { background-position: 400% 50%; }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px rgba(0, 212, 255, 0.3); }
  50% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.6); }
}

@keyframes shimmer-h2 {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

h1 {
  line-height: 1 !important;
  font-size: 3.5rem !important;
  background: linear-gradient(120deg, #007acc 0%, #00d4ff 97%, #007acc 100%);
  background-size: 300% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3.5s cubic-bezier(0, 0.8, 0.4, 1) infinite;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.2);
  white-space: pre-line;
}

h2 {
  font-size: 1.75rem !important;
  margin: 1.5rem 0 1rem !important;
  padding-bottom: 1rem !important;
  border-bottom: 5px solid transparent;
  background-image: linear-gradient(90deg,#4ec9b0 0%,#16825d 100%);
  background-size: 100% 5px;
  background-repeat: no-repeat;
  background-position: bottom;
  position: relative;
  transition: all 0.3s ease;
  color: #4ec9b0;
  text-shadow: 0 0 8px rgba(78, 201, 176, 0.4);
}



h3 {
  opacity: 1 !important;
  font-size: 1.5rem !important;
  line-height: 1.5 !important;
  padding: 0.75rem 0 !important;
  margin-bottom: 1rem !important;
  padding-left: 1rem !important;
  border-left: 3px solid #4ec9b0;
  color: #7dd3c0;
  position: relative;
}

h3::before {
  content: '';
  position: absolute;
  left: -3px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 60%;
  background: linear-gradient(180deg, #4ec9b0, #16825d);
  border-radius: 2px;
}

p {
  font-size: 1.4rem !important;
  line-height: 1.5 !important;
  white-space: pre-line;
}

ol {
  list-style-type: decimal !important;
  padding-left: 2rem !important;
}

li {
  font-size: 1.4rem !important;
  line-height: 1.75 !important;
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

blockquote {
  display: block;
  position: relative;
  font-style: italic;
  color: #d1d5db;
  border-left: 4px solid transparent;
  background-image:
    linear-gradient(135deg, rgba(78, 201, 176, 0.08), rgba(22, 130, 93, 0.05)),
    linear-gradient(90deg, #10af8f, #16825d);
  background-origin: border-box;
  padding: 0.625rem 2rem !important;
  margin: 1.1rem 0;
  border-radius: 0 8px 8px 0;
  box-shadow:
    0 4px 16px rgba(78, 201, 176, 0.25),
    0 0 30px rgba(78, 201, 176, 0.2);
  transition: all 0.3s ease;
}

blockquote p {
  font-size: 1.5rem !important;
  line-height: 1.6 !important;
  margin: 0;
}

blockquote::before {
  content: '"';
  position: absolute;
  top: 0;
  left: 0.5rem;
  font-size: 4rem;
  background: linear-gradient(225deg, #10af8f, #16825d);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.8;
  width: 2rem;
  line-height: 1;
  text-shadow: 0 0 10px rgba(78, 201, 176, 0.3);
}

blockquote::after {
  content: '"';
  position: absolute;
  bottom: -1.5rem;
  right: 0.5rem;
  font-size: 4rem;
  background: linear-gradient(45deg, #10af8f, #16825d);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.8;
  line-height: 1;
  width: 2rem;
  text-shadow: 0 0 10px rgba(78, 201, 176, 0.3);
}

/* コードブロックの装飾 */
pre {
  position: relative;
  background: rgba(18, 18, 18, 1) !important;
  border: 1px solid rgba(78, 201, 176, 0.15);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}


/* リストアイテムにアクセント */
li {
  font-size: 1.4rem !important;
  line-height: 1.75 !important;
  position: relative;
  transition: all 0.2s ease;
}

.slidev-layout {
  padding-top: 0 !important;
}

/* 本文中央配置用スタイル */
.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 350px;
}

.center-content p {
  font-size: 2.25rem !important;
}

.center-content ul,
.center-content ol {
  display: inline-block;
  text-align: left;
}

.center-content li {
  font-size: 2.25rem !important;
}
EOF

# Create uno.config.ts
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

# Create qr.png (empty)
touch "$SLIDE_DIR/imgs/qr.png"

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
