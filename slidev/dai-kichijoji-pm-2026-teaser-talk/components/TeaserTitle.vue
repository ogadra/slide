<script setup lang="ts">
import ogp from '../imgs/lightning-talks-in-generative-ai-era.png'
</script>

<template>
  <div class="teaser-title">
    <img class="teaser-title__img" :src="ogp" alt="生成AI時代におけるLTの在り方" />
  </div>
</template>

<style scoped>
.teaser-title {
  position: absolute;
  inset: 0;
  background: var(--void);
  overflow: hidden;
}

.teaser-title__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
