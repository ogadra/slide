<script setup lang="ts">
import logo from '../imgs/logo.svg'

withDefaults(defineProps<{ size?: number }>(), { size: 560 })
</script>

<template>
  <img :src="logo" :style="{ width: `${size}px`, height: 'auto', display: 'block' }" alt="大吉祥寺.pm" />
</template>
