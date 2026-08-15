<script setup lang="ts">
import shot from '../imgs/lt-bad-example.png'
</script>

<template>
  <div class="teaser">
    <img class="teaser__img" :src="shot" alt="一般的にダメな例" />
    <span class="teaser__frame" />
    <p class="teaser__cite">引用: 「明日から役にたつLTをダメにする技術をあなたに」— 大吉祥寺.pm 2025</p>
  </div>
</template>

<style scoped>
.teaser {
  position: absolute;
  inset: 0;
  background: var(--void);
  overflow: hidden;
}

.teaser__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.teaser__frame {
  position: absolute;
  left: 3.5%;
  top: 43.5%;
  width: 31%;
  height: 7%;
  border: 6px solid var(--alarm);
  border-radius: 8px;
  box-shadow: 0 0 24px rgba(255, 64, 64, 0.6);
}

.teaser__cite {
  position: absolute;
  right: 40px;
  top: 24px;
  font-family: var(--font-mono);
  font-size: 24px;
  letter-spacing: 0.06em;
  color: var(--paper);
  background: rgba(11, 11, 18, 0.7);
  padding: 10px 22px;
  border-radius: 8px;
}
</style>
