<script setup lang="ts">
import KLine from './KLine.vue'
import MicIcon from './MicIcon.vue'
import { useStage } from './stage'

const { live, take } = useStage()

const marqueeText = 'THANK YOU ✦ MIC DROP ✦ ONE VERSE, NO REGRETS ✦ '
</script>

<template>
  <div v-if="live" :key="take" class="thanks">
    <div class="thanks__grid" />

    <div class="thanks__main">
      <h1 class="thanks__title">
        <KLine text="THANK YOU" mode="slam" :delay="0" :stagger="0.13" />
      </h1>
      <div class="thanks__profile">
        <p class="thanks__name">おがどら</p>
        <ul class="thanks__lines">
          <li>X: const_myself ／ GitHub: ogadra</li>
          <li>スライド置き場: slide.ogadra.com</li>
        </ul>
      </div>
    </div>

    <div class="thanks__mark">
      <div class="thanks__ring thanks__ring--outer" />
      <div class="thanks__ring thanks__ring--inner" />
      <img
        class="thanks__avatar"
        src="https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif"
        alt="ogadra"
      />
      <MicIcon class="thanks__mic" :size="72" />
    </div>

    <div class="thanks__marquee">
      <div class="thanks__marquee-track">
        <span>{{ marqueeText.repeat(4) }}</span>
        <span>{{ marqueeText.repeat(4) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.thanks {
  position: absolute;
  inset: 0;
  background: var(--void);
  overflow: hidden;
}

.thanks__grid {
  position: absolute;
  inset: -60px;
  background-image:
    linear-gradient(rgba(245, 241, 230, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245, 241, 230, 0.05) 1px, transparent 1px);
  background-size: 90px 90px;
  mask-image: radial-gradient(ellipse at 30% 50%, #000 30%, transparent 80%);
  animation: thanks-grid-pan 24s linear infinite;
}

@keyframes thanks-grid-pan {
  from { transform: translate(0, 0); }
  to { transform: translate(90px, 90px); }
}

.thanks__main {
  position: absolute;
  left: 120px;
  top: 50%;
  translate: 0 -50%;
  display: flex;
  flex-direction: column;
  gap: 64px;
}

.thanks__title {
  font-family: var(--font-display);
  font-size: 150px;
  line-height: 1;
  color: var(--paper);
  text-shadow: 10px 10px 0 var(--pink);
}

.thanks__profile {
  animation: thanks-fade 0.9s ease-out both;
}

.thanks__name {
  font-weight: 700;
  font-size: 58px;
  color: var(--neon);
}


.thanks__lines {
  margin-top: 36px;
  font-family: var(--font-mono);
  font-size: 32px;
  line-height: 2.1;
  color: rgba(245, 241, 230, 0.85);
}

@keyframes thanks-fade {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.thanks__mark {
  position: absolute;
  right: 200px;
  top: 50%;
  translate: 0 -50%;
  width: 520px;
  height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: thanks-pop 1s cubic-bezier(0.3, 1.4, 0.4, 1) both;
}

@keyframes thanks-pop {
  from {
    opacity: 0;
    transform: scale(0.5) rotate(-10deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.thanks__ring {
  position: absolute;
  border-radius: 50%;
}

.thanks__ring--outer {
  inset: 0;
  border: 3px dashed rgba(245, 217, 10, 0.5);
  animation: thanks-spin 30s linear infinite;
}

.thanks__ring--inner {
  inset: 44px;
  border: 2px dotted rgba(255, 46, 136, 0.5);
  animation: thanks-spin 22s linear infinite reverse;
}

@keyframes thanks-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.thanks__avatar {
  width: 340px;
  height: 340px;
  border-radius: 50%;
  object-fit: cover;
  border: 8px solid var(--paper);
}

.thanks__mic {
  position: absolute;
  right: -10px;
  bottom: 10px;
  rotate: 20deg;
}

.thanks__marquee {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  font-family: var(--font-mono);
  font-size: 30px;
  letter-spacing: 0.14em;
  padding: 18px 0;
  white-space: nowrap;
  color: rgba(245, 217, 10, 0.8);
  border-top: 2px solid rgba(245, 217, 10, 0.3);
}

.thanks__marquee-track {
  display: inline-flex;
  animation: thanks-marquee 22s linear infinite;
}

@keyframes thanks-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
</style>
