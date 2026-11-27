<script setup lang="ts">
withDefaults(defineProps<{ x: number, y: number, width: number, height: number, r?: number, inset?: number, stitchClass?: string | string[], fill?: string }>(), {
  r: 10,
  inset: 5,
  stitchClass: '',
  fill: '#ffffff',
})
</script>

<template>
  <g>
    <rect :x="x" :y="y + 4" :width="width" :height="height" :rx="r" class="shadow" />
    <rect :x="x" :y="y" :width="width" :height="height" :rx="r" :fill="fill" />
    <rect :x="x + inset" :y="y + inset" :width="width - inset * 2" :height="height - inset * 2" :rx="Math.max(r - inset / 2, 2)" :class="['stitch', stitchClass]" />
  </g>
</template>

<style scoped>
.shadow {
  fill: rgba(34, 34, 34, 0.06);
}

.stitch {
  fill: none;
  stroke: #a7a7a7;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-dasharray: 4 5;
}

.stitch.blink {
  stroke: var(--orange);
  stroke-width: 2.5;
  animation: blink 1.2s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}
</style>
