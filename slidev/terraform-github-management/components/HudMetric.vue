<script setup lang="ts">
defineProps<{
  label: string
  value: string
  percent: number
  tone?: 'default' | 'green' | 'red' | 'orange'
}>()

const fillColor = (tone?: string) => {
  if (tone === 'green') return '#0a7a3a'
  if (tone === 'red') return '#cc1100'
  if (tone === 'orange') return '#cc4400'
  return '#1a1a1a'
}

const valueClass = (tone?: string) => {
  if (tone === 'green') return 'hud-green'
  if (tone === 'red') return 'hud-red'
  if (tone === 'orange') return 'hud-orange'
  return ''
}
</script>

<template>
  <div>
    <div class="flex justify-between text-base">
      <span>{{ label }}</span>
      <span :class="valueClass(tone)">{{ value }}</span>
    </div>
    <div class="hud-bar mt-0.5">
      <div class="hud-bar-fill" :style="{ width: percent + '%', background: fillColor(tone) }" />
    </div>
  </div>
</template>
