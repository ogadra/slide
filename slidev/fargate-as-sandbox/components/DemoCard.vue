<script setup lang="ts">
import qrImage from '../imgs/qr.png'

defineProps<{
  url: string
  note?: string
}>()
</script>

<template>
  <div class="case-canvas demo-card">
    <div class="demo-top">
      <div class="case-meta">
        <strong>§ DEMO</strong> :: TRY IT OUT
      </div>
      <div class="case-stamp">LIVE</div>
    </div>

    <div class="demo-main">
      <div class="qr-frame">
        <div class="qr-corner tl" />
        <div class="qr-corner tr" />
        <div class="qr-corner bl" />
        <div class="qr-corner br" />
        <img :src="qrImage" alt="QR Code" class="qr-img" />
      </div>
    </div>

    <div class="demo-foot">
      <span class="demo-foot-arrow">→</span>
      <span class="demo-foot-url">{{ url }}</span>
    </div>
  </div>
</template>

<style scoped>
.demo-card {
  gap: 0.8rem;
}

.demo-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 8px;
}

.demo-main {
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-frame {
  position: relative;
  height: 100%;
  aspect-ratio: 1 / 1;
  padding: 14px;
  background: white;
  border: 2px solid var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
}
.qr-corner {
  position: absolute;
  width: 24px;
  height: 24px;
  border-color: var(--accent);
}
.qr-corner.tl { top: -3px; left: -3px; border-left: 5px solid; border-top: 5px solid; }
.qr-corner.tr { top: -3px; right: -3px; border-right: 5px solid; border-top: 5px solid; }
.qr-corner.bl { bottom: -3px; left: -3px; border-left: 5px solid; border-bottom: 5px solid; }
.qr-corner.br { bottom: -3px; right: -3px; border-right: 5px solid; border-bottom: 5px solid; }

.qr-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: pixelated;
}

.demo-foot {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.7rem;
  font-family: var(--font-mono);
  color: var(--ink-soft);
}
.demo-foot-arrow {
  font-family: var(--font-display);
  font-weight: 900;
  color: var(--accent);
}
.demo-foot-url {
  font-family: var(--font-mono);
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--ink);
}
</style>
