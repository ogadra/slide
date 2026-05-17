<script setup lang="ts">
defineProps<{
  name: string
  handle: string
  initial: string
  profile: { label: string; value: string }[]
  about: string
  stats: { label: string; value: string; percent: number; tone?: 'default' | 'green' | 'red' | 'orange' }[]
  stack: { name: string; status: string; tone: 'default' | 'green' | 'red' | 'orange' }[]
}>()

const dotClass = (tone: string) => {
  if (tone === 'green') return 'hud-green'
  if (tone === 'red') return 'hud-red'
  if (tone === 'orange') return 'hud-orange'
  return ''
}
</script>

<template>
  <HudSlide>
    <div class="grid">
      <HudPanel label="[ PROFILE ]" panel-class="col-span-4 row-span-6 p-4 flex flex-col items-center justify-center">
        <div class="avatar">{{ initial }}</div>
        <div class="name">{{ name }}</div>
        <div class="handle">{{ handle }}</div>
        <div class="meta">
          <div v-for="(m, i) in profile" :key="i"><span>{{ m.label }}</span><span>{{ m.value }}</span></div>
        </div>
      </HudPanel>

      <HudPanel label="[ ABOUT ]" panel-class="col-span-5 row-span-3 p-3">
        <div class="about" v-html="about" />
      </HudPanel>

      <HudPanel label="[ STATS ]" panel-class="col-span-3 row-span-3 p-3">
        <div class="stats">
          <HudMetric v-for="(s, i) in stats" :key="i" v-bind="s" />
        </div>
      </HudPanel>

      <HudPanel label="[ STACK ]" panel-class="col-span-8 row-span-3 p-3">
        <div class="stack">
          <div v-for="(s, i) in stack" :key="i">
            <span><span :class="dotClass(s.tone)">●</span> {{ s.name }}</span>
            <span :class="s.tone === 'green' ? 'dim' : dotClass(s.tone)">{{ s.status }}</span>
          </div>
        </div>
      </HudPanel>
    </div>
  </HudSlide>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: repeat(6, 1fr); gap: 0.5rem; height: 100%; }
.avatar { width: 140px; height: 140px; border: 2px solid #1a1a1a; border-radius: 9999px; display: flex; align-items: center; justify-content: center; font-family: 'Bodoni Moda', serif; font-weight: 900; font-size: 3rem; margin-top: 1rem; }
.name { font-family: 'Bodoni Moda', serif; font-weight: 900; font-size: 2.25rem; margin-top: 1rem; }
.handle { font-size: 10px; letter-spacing: 0.15em; margin-top: 0.5rem; opacity: 0.6; }
.meta { border-top: 1px solid #1a1a1a; width: 100%; margin-top: 1rem; padding-top: 0.75rem; font-size: 9px; display: flex; flex-direction: column; gap: 0.25rem; }
.meta > div { display: flex; justify-content: space-between; }
.about { font-size: 1.25rem; margin-top: 1rem; line-height: 1.6; }
.about :deep(.motto) { font-weight: 900; font-size: 1.875rem; display: inline-block; }
.stats { margin-top: 1rem; display: flex; flex-direction: column; gap: 0.75rem; }
.stack { display: grid; grid-template-columns: repeat(3, 1fr); column-gap: 1rem; row-gap: 0.5rem; font-size: 1rem; margin-top: 1rem; }
.stack > div { display: flex; justify-content: space-between; border-bottom: 1px solid rgba(26, 26, 26, 0.2); padding-bottom: 0.125rem; }
.dim { opacity: 0.6; }
</style>
