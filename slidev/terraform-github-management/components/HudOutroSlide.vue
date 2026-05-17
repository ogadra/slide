<script setup lang="ts">
defineProps<{
  links: { label: string; value: string }[]
  qrUrl?: string
}>()
</script>

<template>
  <HudSlide>
    <div class="grid">
      <HudPanel label="[ THANK YOU ]" panel-class="col-span-8 row-span-6 p-6 flex flex-col justify-center">
        <div class="big">THANK<br/>YOU.</div>
        <div class="ja">ご清聴ありがとうございました</div>
        <div class="links">
          <div v-for="(l, i) in links" :key="i" class="link-row">
            <span class="label">{{ l.label }}</span>
            <span class="value">{{ l.value }}</span>
          </div>
        </div>
      </HudPanel>

      <HudPanel label="[ QR / SLIDE URL ]" panel-class="col-span-4 row-span-6 p-3 flex flex-col items-center justify-center">
        <div class="qr">[ QR CODE ]</div>
        <div class="qr-url">{{ qrUrl }}</div>
      </HudPanel>
    </div>
  </HudSlide>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 0.75rem;
  height: 100%;
}
.big {
  font-family: 'Bodoni Moda', serif;
  font-weight: 900;
  font-size: 4.5rem;
  line-height: 0.95;
}
.ja {
  font-size: 1.875rem;
  font-weight: 900;
  margin-top: 1.5rem;
}
.links {
  border-top: 1px solid #1a1a1a;
  margin-top: 1.5rem;
  padding-top: 1rem;
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.link-row {
  display: flex;
  gap: 1rem;
}
.label {
  opacity: 0.5;
  width: 7rem;
}
.value {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 900;
}
.qr {
  width: 180px;
  height: 180px;
  border: 2px solid #1a1a1a;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  letter-spacing: 0.15em;
  opacity: 0.5;
}
.qr-url {
  font-size: 10px;
  letter-spacing: 0.15em;
  margin-top: 0.75rem;
  font-family: 'JetBrains Mono', monospace;
}
</style>
