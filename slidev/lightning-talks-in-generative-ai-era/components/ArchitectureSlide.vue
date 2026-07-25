<script setup lang="ts">
import diagram from '../imgs/bunshin_architecture.png'
</script>

<template>
  <div class="architecture-slide">
    <img :src="diagram" alt="構成図" class="architecture-slide__figure" />
  </div>
</template>

<style scoped>
.architecture-slide {
  position: absolute;
  inset: 0;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  box-sizing: border-box;
}

.architecture-slide__figure {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}
</style>
