<script setup lang="ts">
const swatches = [
  { name: 'Base', hex: '#EAE6DE', bg: '#EAE6DE', fg: '#211E18', sub: '#6C6557', flex: 1.4, border: true },
  { name: 'Ink', hex: '#211E18', bg: '#211E18', fg: '#EAE6DE', sub: '#A79E8D', flex: 1.4 },
  { name: 'Clay', hex: '#C24631', bg: '#C24631', fg: '#FFFFFF', sub: 'rgba(255,255,255,0.85)', flex: 1 },
  { name: 'Tan', hex: '#AE7A42', bg: '#AE7A42', fg: '#2E1D12', sub: 'rgba(46,29,18,0.75)', flex: 1 },
  { name: 'Cherry', hex: '#E83D5D', bg: '#E83D5D', fg: '#FFFFFF', sub: 'rgba(255,255,255,0.85)', flex: 1 },
]
</script>

<template>
  <div class="theme-slide">
    <h2 class="theme-slide__title">デザインテーマ</h2>

    <div class="theme-slide__palette">
      <div
        v-for="s in swatches"
        :key="s.name"
        class="theme-slide__swatch"
        :class="{ 'has-border': s.border }"
        :style="{ background: s.bg, color: s.fg, flex: s.flex }"
      >
        <div class="theme-slide__swatch-name">{{ s.name }}</div>
        <div class="theme-slide__swatch-hex" :style="{ color: s.sub }">{{ s.hex }}</div>
      </div>
    </div>

    <div class="theme-slide__typo">
      <div class="theme-slide__typo-jp">ゴシックで、魂を燃やせ</div>
      <div class="theme-slide__typo-mono">print "LT\n";</div>
    </div>
  </div>
</template>

<style scoped>
.theme-slide {
  position: absolute;
  inset: 0;
  background: var(--base);
  color: var(--ink);
  padding: 130px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.theme-slide__title {
  font-weight: 700;
  font-size: 88px;
  margin-bottom: 90px;
  letter-spacing: -0.02em;
}

.theme-slide__palette {
  display: flex;
  height: 230px;
  margin-bottom: 100px;
}

.theme-slide__swatch {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px 32px;
}

.theme-slide__swatch.has-border {
  border: 2px solid var(--ink);
  box-sizing: border-box;
}

.theme-slide__swatch-name {
  font-weight: 700;
  font-size: 30px;
}

.theme-slide__swatch-hex {
  font-family: var(--font-mono);
  font-size: 24px;
  margin-top: 4px;
}

.theme-slide__typo {
  display: flex;
  gap: 120px;
  align-items: baseline;
}

.theme-slide__typo-jp {
  font-weight: 700;
  font-size: 64px;
  letter-spacing: -0.02em;
}

.theme-slide__typo-mono {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 40px;
  color: var(--ink-soft);
}
</style>
