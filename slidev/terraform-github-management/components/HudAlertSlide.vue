<script setup lang="ts">
defineProps<{
  sensors: { label: string; value: string; percent: number; tone: 'default' | 'green' | 'red' | 'orange' }[]
  timeline: { time: string; text: string; tone?: 'default' | 'green' | 'red' | 'orange' }[]
  nowText?: string
  symptoms: string[]
  recommendedAction?: string
}>()

const toneClass = (tone?: string) => {
  if (tone === 'green') return 'hud-green'
  if (tone === 'red') return 'hud-red'
  if (tone === 'orange') return 'hud-orange'
  return ''
}
</script>

<template>
  <HudSlide>
    <div class="grid">
      <HudPanel label="[ SENSORS ]" panel-class="col-span-3 row-span-6 p-3 flex flex-col">
        <div class="sensors">
          <HudMetric v-for="(s, i) in sensors" :key="i" v-bind="s" />
        </div>
      </HudPanel>

      <HudPanel label="[ ALERT / MAIN ]" panel-class="col-span-6 row-span-4 flex flex-col items-center justify-center p-4">
        <div class="label">⚠   W A R N I N G   ⚠</div>
        <div class="main"><slot name="message" /></div>
        <div v-if="recommendedAction" class="action" v-html="recommendedAction" />
      </HudPanel>

      <HudPanel label="[ TIMELINE ]" panel-class="col-span-3 row-span-4 p-3">
        <div class="timeline">
          <div v-for="(t, i) in timeline" :key="i">
            <span>{{ t.time }}</span><span :class="toneClass(t.tone)">{{ t.text }}</span>
          </div>
          <div v-if="nowText" class="now">
            <span class="hud-red">NOW</span><span class="hud-red">{{ nowText }}</span>
          </div>
        </div>
      </HudPanel>

      <HudPanel label="[ SYMPTOMS ]" panel-class="col-span-12 row-span-2 p-3">
        <div class="symptoms">
          <div v-for="(s, i) in symptoms" :key="i">▸ {{ s }}</div>
        </div>
      </HudPanel>
    </div>
  </HudSlide>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: repeat(6, 1fr); gap: 0.5rem; height: 100%; }
.sensors { margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.75rem; }
.label { font-size: 10px; letter-spacing: 0.4em; color: #cc1100; margin-bottom: 1rem; }
.main { font-family: 'Bodoni Moda', serif; font-weight: 900; font-size: 3rem; text-align: center; line-height: 1.2; }
.action { border-top: 1px solid #1a1a1a; margin-top: 1.5rem; padding-top: 0.75rem; font-size: 1rem; letter-spacing: 0.15em; font-weight: 900; text-align: center; width: 100%; }
.timeline { margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem; font-size: 1rem; }
.timeline > div { display: flex; gap: 0.5rem; }
.timeline > div > span:first-child { opacity: 0.5; width: 3.5rem; }
.now { border-top: 1px solid #1a1a1a; padding-top: 0.5rem; margin-top: 0.5rem; }
.now > span:first-child { opacity: 1 !important; }
.symptoms { display: grid; grid-template-columns: 1fr 1fr; column-gap: 1rem; row-gap: 0.5rem; font-size: 1rem; margin-top: 1rem; line-height: 1.6; }
</style>
