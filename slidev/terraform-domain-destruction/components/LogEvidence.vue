<script setup lang="ts">
import logImg from '../imgs/domain_log.png'
</script>

<template>
  <div class="tf-canvas image-slide">
    <div class="image-head">
      <span class="image-label">LOG</span>
      <span class="image-caption">ドメインが削除されて再作成されたログ</span>
    </div>
    <div class="tf-rule purple" />

    <div class="image-body">
      <img class="image-shot" :src="logImg" alt="ドメインが削除されて再作成されたログ" />
    </div>
  </div>
</template>

<style scoped>
.image-slide {
  gap: 0.9rem;
}

.image-head {
  display: flex;
  align-items: baseline;
  gap: 1.2rem;
}
.image-label {
  font-family: var(--font-mono);
  font-weight: 900;
  font-size: 0.9rem;
  letter-spacing: 0.28em;
  color: var(--tf-purple);
  text-transform: uppercase;
}
.image-caption {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 1.3rem;
  color: var(--ink);
  letter-spacing: -0.005em;
}

.image-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  padding: 0.6rem 0;
}
.image-shot {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border: 2px solid var(--ink);
  box-shadow: 5px 5px 0 var(--ink);
}
</style>
