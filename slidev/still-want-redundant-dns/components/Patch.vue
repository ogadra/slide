<script setup lang="ts">
import { computed } from 'vue'

type Stitch = { d?: string; transform?: string }
type Filled = { kind: 'fill'; viewBox: string; outer: string; stitch: Stitch }
type Cord = { kind: 'cord'; viewBox: string; path: string; width: number }

// オフセットパスはSVGで描けないので、ステッチは外形を中心へ縮めて近似する
const shrink = (cx: number, cy: number, sx: number, sy: number): Stitch => ({
  transform: `translate(${cx} ${cy}) scale(${sx} ${sy}) translate(${-cx} ${-cy})`,
})

const shapes = {
  triangle: { kind: 'fill', viewBox: '0 0 200 170', outer: 'M104 6 Q150 80 198 160 Q100 166 4 166 Q50 90 104 6Z', stitch: shrink(103.5, 108.8, 0.8, 0.8) },
  square: { kind: 'fill', viewBox: '0 0 160 150', outer: 'M6 10 Q80 4 150 6 Q156 75 154 142 Q80 148 4 144 Q8 75 6 10Z', stitch: shrink(80, 75, 0.84, 0.83) },
  dome: { kind: 'fill', viewBox: '0 0 240 160', outer: 'M6 154 C8 70 50 8 120 8 C180 8 214 60 234 150 Q120 140 6 154Z', stitch: shrink(120, 85, 0.88, 0.84) },
  blob: { kind: 'fill', viewBox: '0 0 240 190', outer: 'M40 20 C70 0 100 20 118 30 C140 10 180 0 210 30 C240 60 236 120 200 160 C170 190 130 184 100 160 C70 170 20 170 10 120 C0 80 10 40 40 20Z', stitch: shrink(120, 95, 0.88, 0.86) },
  banner: { kind: 'fill', viewBox: '0 0 260 110', outer: 'M4 30 Q70 10 130 12 Q200 10 254 8 Q258 55 254 100 Q190 92 130 96 Q60 100 8 106 Q2 70 4 30Z', stitch: shrink(130, 57, 0.9, 0.75) },
  slant: { kind: 'fill', viewBox: '0 0 120 160', outer: 'M30 4 L116 22 L84 156 L4 140Z', stitch: shrink(60, 80, 0.8, 0.86) },
  // 縮めると縦棒のステッチが棒の太さに沿わないので、内側を直接書く
  t: { kind: 'fill', viewBox: '0 0 150 150', outer: 'M4 4 H146 V46 H96 V146 H54 V46 H4Z', stitch: { d: 'M12 12 H138 V38 H88 V138 H62 V38 H12Z' } },
  wave: { kind: 'cord', viewBox: '0 0 300 160', path: 'M40 130 C10 90 40 50 80 60 C110 68 100 100 130 90 C160 80 140 30 180 30 C220 30 200 80 240 70 C270 62 270 30 280 30', width: 34 },
  zigzag: { kind: 'cord', viewBox: '0 0 140 170', path: 'M30 20 C20 50 30 60 50 70 C70 80 40 100 60 110 L120 140', width: 30 },
} satisfies Record<string, Filled | Cord>

const props = defineProps<{
  shape: keyof typeof shapes
  color: 'orange' | 'blue' | 'mustard' | 'purple' | 'green'
}>()

const def = computed<Filled | Cord>(() => shapes[props.shape])
const fill = computed(() => `var(--${props.color})`)
</script>

<template>
  <svg :viewBox="def.viewBox" aria-hidden="true" class="patch">
    <template v-if="def.kind === 'fill'">
      <path :d="def.outer" :fill="fill" />
      <path :d="def.stitch.d ?? def.outer" :transform="def.stitch.transform" class="stitch" />
    </template>
    <template v-else>
      <path :d="def.path" fill="none" :stroke="fill" :stroke-width="def.width" stroke-linecap="round" stroke-linejoin="round" />
      <path :d="def.path" class="stitch" stroke-linecap="round" />
    </template>
  </svg>
</template>

<style scoped>
.patch {
  position: absolute;
  pointer-events: none;
  overflow: visible;
}

.stitch {
  fill: none;
  stroke: var(--stitch);
  stroke-width: 2;
  stroke-dasharray: 8 6;
  vector-effect: non-scaling-stroke;
}
</style>
