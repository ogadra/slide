<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 96 })
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 140 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- impact sparks -->
    <line x1="70" y1="6" x2="70" y2="22" stroke="#F5D90A" stroke-width="7" stroke-linecap="round" />
    <line x1="40" y1="14" x2="50" y2="26" stroke="#F5D90A" stroke-width="7" stroke-linecap="round" />
    <line x1="100" y1="14" x2="90" y2="26" stroke="#F5D90A" stroke-width="7" stroke-linecap="round" />
    <circle cx="28" cy="40" r="4.5" fill="#FF2E88" />
    <circle cx="112" cy="40" r="4.5" fill="#FF2E88" />

    <!-- back hand (left) -->
    <g fill="#CBC3AF" transform="translate(52 72) rotate(-24)">
      <rect x="-22" y="-2" width="44" height="46" rx="12" />
      <rect x="-19" y="-26" width="9" height="30" rx="4.5" />
      <rect x="-7.5" y="-32" width="9" height="36" rx="4.5" />
      <rect x="4" y="-30" width="9" height="34" rx="4.5" />
      <rect x="15" y="-22" width="8" height="26" rx="4" />
      <rect x="-36" y="4" width="10" height="28" rx="5" transform="rotate(32 -31 8)" />
    </g>

    <!-- front hand (right) -->
    <g fill="#F5F1E6" transform="translate(88 76) rotate(24) scale(-1 1)">
      <rect x="-22" y="-2" width="44" height="46" rx="12" />
      <rect x="-19" y="-26" width="9" height="30" rx="4.5" />
      <rect x="-7.5" y="-32" width="9" height="36" rx="4.5" />
      <rect x="4" y="-30" width="9" height="34" rx="4.5" />
      <rect x="15" y="-22" width="8" height="26" rx="4" />
      <rect x="-36" y="4" width="10" height="28" rx="5" transform="rotate(32 -31 8)" />
    </g>
  </svg>
</template>
