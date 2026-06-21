<script setup lang="ts">
import bunshinImage from '../imgs/bunshin_architecture.png'

defineProps<{
  caseNo: string
  caseName: string
  source?: string
}>()
</script>

<template>
  <div class="case-canvas bunshin">
    <div class="bunshin-top">
      <div class="case-meta">
        <strong>CASE :: {{ caseNo }}</strong> ·  RESOLUTION  ·  {{ caseName }}
      </div>
      <div class="case-stamp">SHIPPED</div>
    </div>

    <div class="bunshin-head">
      <div class="bunshin-headline">だから私はマルチリージョン。</div>
      <div v-if="source" class="bunshin-src">{{ source }}</div>
    </div>
    <div class="bunshin-rule" />

    <div class="bunshin-diagram">
      <img :src="bunshinImage" alt="bunshin architecture" />
    </div>
  </div>
</template>

<style scoped>
.bunshin {
  gap: 0.8rem;
}

.bunshin-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 8px;
}

.bunshin-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.bunshin-headline {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 1.75rem;
  letter-spacing: -0.01em;
  color: var(--ink);
}
.bunshin-src {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.18em;
  color: var(--ink-soft);
  text-transform: uppercase;
}
.bunshin-rule {
  height: 2px;
  background: var(--ink);
}

.bunshin-diagram {
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow: hidden;
}
.bunshin-diagram img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
