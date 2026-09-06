<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'

defineProps<{
  url: string
}>()
</script>

<template>
  <div class="demo-access-slide">
    <div class="demo-access-slide__frame">
      <QrcodeVue
        :value="url"
        :size="520"
        :margin="4"
        level="M"
        render-as="svg"
        background="#E6EFF8"
        foreground="#070C15"
        class="demo-access-slide__qr"
      />
    </div>
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
  gap: 120px;
  padding: 0 160px;
  box-sizing: border-box;
}

/* 静音域はQR側のmarginで確保しているので、枠は見た目のためだけ */
.demo-access-slide__frame {
  flex: none;
  border: 1px solid rgba(86, 225, 245, 0.35);
  box-shadow: 0 0 90px rgba(86, 225, 245, 0.16);
  line-height: 0;
}

.demo-access-slide__qr {
  display: block;
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
