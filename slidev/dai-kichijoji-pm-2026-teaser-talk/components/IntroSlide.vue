<script setup lang="ts">
import ClapIcon from './ClapIcon.vue'
import KLine from './KLine.vue'
import { useStage } from './stage'

const { live, take } = useStage()

const marqueeText = 'MIC CHECK ✦ ONE TWO ✦ MC OGADRA ✦ 1 VERSE ✦ 4 BARS ✦ '

const BPM = 80
const beatStyle = {
  '--beat': `${60 / BPM}s`,
  '--bar': `${(60 / BPM) * 4}s`,
}
</script>

<template>
  <div v-if="live" :key="take" class="intro">
    <div class="intro__grid" />
    <div class="intro__ring intro__ring--outer" />
    <div class="intro__ring intro__ring--inner" />

    <div class="intro__marquee intro__marquee--top">
      <div class="intro__marquee-track">
        <span>{{ marqueeText.repeat(3) }}</span>
        <span>{{ marqueeText.repeat(3) }}</span>
      </div>
    </div>
    <div class="intro__marquee intro__marquee--bottom">
      <div class="intro__marquee-track intro__marquee-track--reverse">
        <span>{{ marqueeText.repeat(3) }}</span>
        <span>{{ marqueeText.repeat(3) }}</span>
      </div>
    </div>

    <div class="intro__center">
      <p class="intro__mic">ONE, TWO — ONE, TWO</p>
      <h1 class="intro__title">
        <KLine text="ビートを刻め" accent="刻め" mode="slam" :delay="0" :stagger="0.15" />
      </h1>
      <p class="intro__sub">1 VERSE ／ 4 BARS ／ NO SPOILERS</p>

      <div class="intro__beat" :style="beatStyle">
        <div class="intro__beat-core">
          <span class="intro__beat-ring" />
          <ClapIcon class="intro__beat-clap" :size="220" />
        </div>
        <div class="intro__beat-dots">
          <span
            v-for="i in 4"
            :key="i"
            class="intro__beat-dot"
            :style="{ '--i': i - 1 }"
          />
        </div>
        <p class="intro__beat-label">{{ BPM }} BPM ／ CLAP YOUR HANDS</p>
      </div>
    </div>

    <div class="intro__rec">
      <span class="intro__rec-dot" />REC 00:05:00
    </div>
    <p class="intro__mc">MC OGADRA</p>
  </div>
</template>

<style scoped>
.intro {
  position: absolute;
  inset: 0;
  background: var(--void);
  overflow: hidden;
}

.intro__grid {
  position: absolute;
  inset: -60px;
  background-image:
    linear-gradient(rgba(245, 241, 230, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245, 241, 230, 0.05) 1px, transparent 1px);
  background-size: 90px 90px;
  mask-image: radial-gradient(ellipse at 50% 50%, #000 30%, transparent 75%);
  animation: intro-grid-pan 24s linear infinite;
}

@keyframes intro-grid-pan {
  from { transform: translate(0, 0); }
  to { transform: translate(90px, 90px); }
}

.intro__ring {
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 50%;
  translate: -50% -50%;
}

.intro__ring--outer {
  width: 980px;
  height: 980px;
  border: 3px dashed rgba(245, 217, 10, 0.35);
  animation: intro-spin 46s linear infinite;
}

.intro__ring--inner {
  width: 760px;
  height: 760px;
  border: 2px dotted rgba(255, 46, 136, 0.35);
  animation: intro-spin 32s linear infinite reverse;
}

@keyframes intro-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.intro__marquee {
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden;
  font-family: var(--font-mono);
  font-size: 30px;
  letter-spacing: 0.14em;
  padding: 18px 0;
  white-space: nowrap;
}

.intro__marquee--top {
  top: 0;
  color: rgba(245, 217, 10, 0.8);
  border-bottom: 2px solid rgba(245, 217, 10, 0.3);
}

.intro__marquee--bottom {
  bottom: 0;
  color: rgba(255, 46, 136, 0.8);
  border-top: 2px solid rgba(255, 46, 136, 0.3);
}

.intro__marquee-track {
  display: inline-flex;
  animation: intro-marquee 20s linear infinite;
}

.intro__marquee-track--reverse {
  animation-direction: reverse;
}

@keyframes intro-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.intro__center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 36px;
}

.intro__mic {
  font-family: var(--font-mono);
  font-size: 34px;
  letter-spacing: 0.4em;
  color: var(--paper-mute);
  animation: intro-fade 0.6s ease-out both;
}

.intro__title {
  font-family: var(--font-display);
  font-size: 130px;
  line-height: 1;
  color: var(--paper);
  --kline-accent: var(--neon);
  --kline-accent-shadow: 10px 10px 0 var(--pink);
}

.intro__sub {
  font-family: var(--font-mono);
  font-size: 30px;
  letter-spacing: 0.24em;
  color: var(--paper-mute);
  animation: intro-fade 0.6s ease-out both;
}

@keyframes intro-fade {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.intro__beat {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  animation: intro-fade 0.6s ease-out both;
}

.intro__beat-core {
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.intro__beat-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 8px solid var(--neon);
  animation: intro-beat-ping var(--beat) linear infinite;
}

@keyframes intro-beat-ping {
  0% {
    transform: scale(0.66);
    opacity: 1;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}

.intro__beat-clap {
  animation: intro-beat-pop var(--beat) cubic-bezier(0.3, 1.2, 0.4, 1) infinite;
}

@keyframes intro-beat-pop {
  0% { transform: scale(1.4); }
  40% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

.intro__beat-dots {
  display: flex;
  gap: 30px;
}

.intro__beat-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(245, 241, 230, 0.16);
  animation: intro-beat-dot var(--bar) linear infinite;
  animation-delay: calc(var(--i) * var(--beat));
}

@keyframes intro-beat-dot {
  0% {
    background: var(--neon);
    transform: scale(1.5);
    box-shadow: 0 0 20px rgba(245, 217, 10, 0.8);
  }
  18% {
    background: rgba(245, 241, 230, 0.16);
    transform: scale(1);
    box-shadow: none;
  }
  100% {
    background: rgba(245, 241, 230, 0.16);
    transform: scale(1);
    box-shadow: none;
  }
}

.intro__beat-label {
  font-family: var(--font-mono);
  font-size: 30px;
  letter-spacing: 0.3em;
  color: var(--paper-mute);
}

.intro__rec {
  position: absolute;
  top: 96px;
  right: 80px;
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: var(--font-mono);
  font-size: 32px;
  color: var(--alarm);
  animation: intro-fade 0.6s ease-out both;
}

.intro__rec-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--alarm);
  animation: intro-blink 1.2s steps(1) infinite;
}

@keyframes intro-blink {
  0%, 60% { opacity: 1; }
  60.01%, 100% { opacity: 0.15; }
}

.intro__mc {
  position: absolute;
  top: 96px;
  left: 80px;
  font-family: var(--font-mono);
  font-size: 32px;
  letter-spacing: 0.2em;
  color: var(--paper-mute);
  animation: intro-fade 0.6s ease-out both;
}
</style>
