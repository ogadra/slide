<script setup lang="ts">
// qr を渡すまでは枠だけが出る。画像が入るまでも当日の導線を確認できる
defineProps<{
  url: string
  qr?: string
  caption?: string
}>()
</script>

<template>
  <div class="demo-access-slide">
    <figure class="demo-access-slide__item">
      <img v-if="qr" :src="qr" alt="デモページ QR" class="demo-access-slide__qr" />
      <div v-else class="demo-access-slide__placeholder">QR</div>
    </figure>
    <p class="demo-access-slide__url">{{ url }}</p>
  </div>
</template>

<style scoped>
.demo-access-slide {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 140px;
  padding: 0 160px;
  box-sizing: border-box;
}

.demo-access-slide__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
}

.demo-access-slide__qr {
  width: 520px;
  height: 520px;
  object-fit: contain;
  display: block;
  background: var(--paper);
  padding: 28px;
  box-sizing: border-box;
}

.demo-access-slide__placeholder {
  width: 520px;
  height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed rgba(86, 225, 245, 0.4);
  font-family: var(--font-mono);
  font-size: 64px;
  letter-spacing: 0.2em;
  color: var(--mute);
}

.demo-access-slide__caption {
  font-family: var(--font-mono);
  font-size: 30px;
  letter-spacing: 0.16em;
  color: var(--mute);
}

.demo-access-slide__url {
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 64px;
  letter-spacing: -0.02em;
  color: var(--cyan);
  white-space: nowrap;
}
</style>
