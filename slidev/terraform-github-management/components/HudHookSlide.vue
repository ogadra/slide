<script setup lang="ts">
// 装飾文字列はこのコンポーネントの責務
const words: { jp: string; ascii: string; tone?: 'green' | 'red' | 'orange' }[] = [
  { jp: '路上', ascii: 'STREET', tone: 'orange' },
  { jp: '大地', ascii: 'GROUND' },
  { jp: 'Terra', ascii: 'TERRA', tone: 'green' },
  { jp: 'Terraform', ascii: 'TERRAFORM', tone: 'green' },
]

const toneClass = (t?: string) => {
  if (t === 'green') return 'hud-green'
  if (t === 'red') return 'hud-red'
  if (t === 'orange') return 'hud-orange'
  return ''
}
</script>

<template>
  <HudSlide>
    <div class="hook-grid">
      <HudPanel label="[ BOOT SEQUENCE ]" panel-class="col-span-12 row-span-6 p-6 flex">
        <div class="seq-meta">
          <div>SEQ-001</div>
          <div class="opacity-50">// PRELUDE</div>
          <div class="opacity-50">// 4 KEYWORDS</div>
          <div class="hud-green">▶ READY</div>
        </div>
        <div class="words">
          <div v-for="(w, i) in words" :key="i" class="word-row">
            <div class="word-no">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="word-jp" :class="toneClass(w.tone)">{{ w.jp }}</div>
            <div class="word-bang">!</div>
            <div class="word-ascii">{{ w.ascii }}</div>
          </div>
        </div>
        <div class="seq-side">
          <div class="side-label">PHASE</div>
          <div class="phase">04 / 04</div>
          <div class="side-label mt">SIGNAL</div>
          <div class="hud-bar"><div class="hud-bar-fill" style="width: 100%" /></div>
          <div class="side-label mt">NEXT</div>
          <div>INTRO →</div>
        </div>
      </HudPanel>
    </div>
  </HudSlide>
</template>

<style scoped>
.hook-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 0.5rem;
  height: 100%;
}
.seq-meta {
  width: 11rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 10px;
  letter-spacing: 0.15em;
  border-right: 1px solid rgba(26, 26, 26, 0.3);
  padding-right: 1rem;
  margin-top: 0.75rem;
}
.words {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  padding-left: 1.5rem;
}
.word-row {
  display: grid;
  grid-template-columns: 3.5rem 1fr 2rem 1fr;
  align-items: baseline;
  gap: 1rem;
  border-bottom: 1px solid rgba(26, 26, 26, 0.3);
  padding-bottom: 0.25rem;
}
.word-no {
  font-size: 12px;
  opacity: 0.5;
  letter-spacing: 0.15em;
}
.word-jp {
  font-weight: 900;
  font-size: 4.5rem;
  line-height: 1;
}
.word-bang {
  font-weight: 900;
  font-size: 4.2rem;
  color: #cc1100;
  line-height: 1;
}
.word-ascii {
  font-size: 14px;
  letter-spacing: 0.3em;
  opacity: 0.55;
}
.seq-side {
  width: 9rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 11px;
  letter-spacing: 0.15em;
  border-left: 1px solid rgba(26, 26, 26, 0.3);
  padding-left: 1rem;
  margin-top: 0.75rem;
}
.side-label {
  font-size: 9px;
  opacity: 0.55;
}
.side-label.mt {
  margin-top: 0.75rem;
}
.phase {
  font-weight: 900;
  font-size: 1.5rem;
  letter-spacing: 0.05em;
}
</style>
