<script setup lang="ts">
defineProps<{
  name: string
  handle: string
  avatar: string
  profile: { label: string; value: string }[]
  links: { label: string; value: string }[]
  qrUrl?: string
}>()
</script>

<template>
  <HudSlide>
    <div class="grid">
      <HudPanel label="[ THANK YOU ]" panel-class="col-span-8 row-span-3 p-5 flex flex-col justify-center">
        <div class="big">THANK<br/>YOU.</div>
        <div class="ja">ご清聴ありがとうございました</div>
      </HudPanel>

      <HudPanel label="[ PROFILE ]" panel-class="col-span-4 row-span-6 p-4 flex flex-col items-center justify-center">
        <img class="avatar" :src="avatar" :alt="name" />
        <div class="name">{{ name }}</div>
        <div class="handle">{{ handle }}</div>
        <div class="motto">Done is better than perfect.</div>
        <div class="meta">
          <div v-for="(m, i) in profile" :key="i"><span>{{ m.label }}</span><span>{{ m.value }}</span></div>
        </div>
      </HudPanel>

      <HudPanel label="[ LINKS ]" panel-class="col-span-8 row-span-3 p-4 flex flex-col justify-center">
        <div class="links">
          <div v-for="(l, i) in links" :key="i" class="link-row">
            <span class="label">{{ l.label }}</span>
            <span class="value">{{ l.value }}</span>
          </div>
        </div>
      </HudPanel>
    </div>
  </HudSlide>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(6, minmax(0, 1fr));
  gap: 0.75rem;
  height: 100%;
}
.grid :deep(.hud-panel) {
  min-height: 0;
}
.big {
  font-weight: 900;
  font-size: 4rem;
  line-height: 1;
  letter-spacing: 0.02em;
}
.ja {
  font-size: 1.5rem;
  font-weight: 900;
  margin-top: 1rem;
}
.motto {
  font-size: 0.85rem;
  font-weight: 700;
  margin-top: 0.5rem;
  opacity: 0.7;
  letter-spacing: 0.03em;
  font-style: italic;
  text-align: center;
}

.avatar {
  width: 140px;
  height: 140px;
  border: 2px solid #1a1a1a;
  border-radius: 9999px;
  object-fit: cover;
  margin-top: 0.5rem;
}
.name { font-weight: 900; font-size: 1.75rem; margin-top: 0.75rem; letter-spacing: 0.02em; }
.handle { font-size: 10px; letter-spacing: 0.15em; margin-top: 0.4rem; opacity: 0.6; }
.meta {
  border-top: 1px solid #1a1a1a;
  width: 100%;
  margin-top: 0.75rem;
  padding-top: 0.5rem;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.meta > div { display: flex; justify-content: space-between; }

.links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1.25rem;
}
.link-row { display: flex; gap: 1rem; }
.link-row .label { opacity: 0.5; width: 7rem; }
.link-row .value { font-family: 'JetBrains Mono', monospace; font-weight: 900; }
</style>
