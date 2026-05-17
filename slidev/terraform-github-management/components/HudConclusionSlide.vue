<script setup lang="ts">
defineProps<{
  fromText: string
  toText: string
  actions: string[]
}>()
</script>

<template>
  <HudSlide>
    <div class="grid">
      <HudPanel label="[ DECISION ]" panel-class="col-span-12 row-span-4 flex flex-col items-center justify-center p-6">
        <div class="from-label">FROM</div>
        <div class="from-text">{{ fromText }}</div>
        <div class="arrow">↓</div>
        <div class="to-label">TO</div>
        <div class="to-text">{{ toText }}</div>
      </HudPanel>

      <HudPanel label="[ NEXT ACTION ]" panel-class="col-span-12 row-span-2 p-4 flex items-center">
        <div class="next">
          <div v-for="(a, i) in actions" :key="i" v-html="`<span class='hud-orange'>▸</span> ` + a" />
        </div>
      </HudPanel>
    </div>
  </HudSlide>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: repeat(6, 1fr); gap: 0.75rem; height: 100%; }
.from-label { font-size: 10px; letter-spacing: 0.4em; color: #cc1100; margin-bottom: 0.5rem; }
.from-text { font-weight: 900; font-size: 2rem; opacity: 0.5; text-decoration: line-through; letter-spacing: 0.02em; }
.arrow { font-weight: 900; font-size: 3.5rem; margin: 0.75rem 0; }
.to-label { font-size: 10px; letter-spacing: 0.4em; color: #0a7a3a; margin-bottom: 0.5rem; }
.to-text { font-weight: 900; font-size: 4rem; color: #0a7a3a; letter-spacing: 0.02em; }
.next { font-size: 1.5rem; margin-top: 0.5rem; margin-left: 0.5rem; line-height: 1.8; }
.next :deep(code) { font-family: 'JetBrains Mono', monospace; color: #0a7a3a; }
</style>
