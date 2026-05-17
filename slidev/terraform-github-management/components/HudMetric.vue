<script setup lang="ts">
import { hudToneClass, hudToneFill } from '../utils/hudTone'

defineProps<{
  label: string
  value: string
  percent: number
  tone?: 'default' | 'green' | 'red' | 'orange'
}>()
</script>

<template>
  <div>
    <div class="flex justify-between text-base">
      <span>{{ label }}</span>
      <span :class="hudToneClass(tone)">{{ value }}</span>
    </div>
    <div class="hud-bar mt-0.5">
      <div class="hud-bar-fill" :style="{ width: percent + '%', background: hudToneFill(tone) }" />
    </div>
  </div>
</template>
