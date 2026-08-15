<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 96 })

const dots: { x: number, y: number }[] = []
for (let row = -2; row <= 2; row++) {
  const dy = row * 13
  const half = Math.sqrt(34 ** 2 - dy ** 2)
  const count = Math.floor(half / 11)
  for (let i = -count; i <= count; i++)
    dots.push({ x: 60 + i * 11, y: 52 + dy })
}
</script>

<template>
  <svg
    :width="size"
    :height="size * (240 / 120)"
    viewBox="0 0 120 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- grille head -->
    <circle cx="60" cy="52" r="44" fill="#14141F" stroke="#F5F1E6" stroke-width="6" />
    <circle
      v-for="(dot, i) in dots"
      :key="i"
      :cx="dot.x"
      :cy="dot.y"
      r="3.4"
      fill="#F5D90A"
      opacity="0.85"
    />
    <!-- neck band -->
    <path d="M38 92 H82 V108 H40 Z" fill="#FF2E88" />
    <!-- body: near-cylindrical, rounded bottom -->
    <path
      d="M42 108 H78 L76 192 Q76 210 60 210 Q44 210 44 192 Z"
      fill="#1E1E2A"
      stroke="#F5F1E6"
      stroke-width="6"
      stroke-linejoin="round"
    />
    <!-- accent stripes on body -->
    <path d="M45 130 H75 V142 H45 Z" fill="#F5D90A" />
    <path d="M45.5 156 H74.5 V162 H45.5 Z" fill="#2EE6D6" />
    <!-- power dot -->
    <circle cx="60" cy="186" r="5" fill="#FF2E88" />
  </svg>
</template>
