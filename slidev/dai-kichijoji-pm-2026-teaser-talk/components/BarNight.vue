<script setup lang="ts">
import KLine from './KLine.vue'
import { useStage } from './stage'

const { live, take } = useStage()

const stars = Array.from({ length: 26 }, (_, i) => ({
  x: (i * 137 + 23) % 100,
  y: (i * 61 + 7) % 62,
  size: 4 + ((i * 53) % 8),
  delay: ((i * 31) % 24) / 10,
}))
</script>

<template>
  <div v-if="live" :key="take" class="night">
    <span
      v-for="(star, i) in stars"
      :key="i"
      class="night__star"
      :style="{
        left: `${star.x}%`,
        top: `${star.y}%`,
        width: `${star.size}px`,
        height: `${star.size}px`,
        animationDelay: `${star.delay}s`,
      }"
    />
    <div class="night__moon" />
    <div class="night__beam night__beam--a" />
    <div class="night__beam night__beam--b" />

    <p class="night__tag">BAR 01 — YABUN</p>

    <div class="night__lyrics">
      <p class="night__line-sub">
        <KLine text="やっちゃえ、ふざけた" mode="rise" :delay="0" :stagger="0.12" />
      </p>
      <h1 class="night__line-main">
        <KLine text="夜分のリリック" accent="リリック" mode="slam" :delay="1.5" :stagger="0.17" />
      </h1>
    </div>

    <p class="night__echo night__echo--1">リリック</p>
    <p class="night__echo night__echo--2">リリック</p>
    <p class="night__echo night__echo--3">リリック</p>
  </div>
</template>

<style scoped>
.night {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #06060F 0%, #0C0C22 55%, #16123A 100%);
  overflow: hidden;
}

.night__star {
  position: absolute;
  border-radius: 50%;
  background: var(--paper);
  animation: night-twinkle 2.4s ease-in-out infinite;
}

@keyframes night-twinkle {
  0%, 100% { opacity: 0.15; transform: scale(0.7); }
  50% { opacity: 0.9; transform: scale(1); }
}

.night__moon {
  position: absolute;
  right: 150px;
  top: 110px;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  background: radial-gradient(circle at 36% 32%, #FFF7D6 0%, #F5D90A 55%, #C9A606 100%);
  animation: night-moonrise 1.8s cubic-bezier(0.2, 1, 0.3, 1) both;
}

.night__moon::after {
  content: '';
  position: absolute;
  inset: -140px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245, 217, 10, 0.4) 30%, transparent 70%);
  animation: night-glow 3.4s ease-in-out 1.4s infinite;
}

@keyframes night-moonrise {
  from {
    opacity: 0;
    transform: translateY(140px) scale(0.85);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes night-glow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.night__beam {
  position: absolute;
  top: -30%;
  height: 160%;
  width: 220px;
  background: linear-gradient(90deg, transparent, rgba(255, 46, 136, 0.1), transparent);
  transform: rotate(24deg);
}

.night__beam--a {
  left: 12%;
  animation: night-sweep 5.4s ease-in-out infinite;
}

.night__beam--b {
  left: 46%;
  width: 340px;
  animation: night-sweep 5.4s ease-in-out 1.8s infinite;
}

@keyframes night-sweep {
  0%, 100% { transform: rotate(24deg) translateX(-160px); opacity: 0.4; }
  50% { transform: rotate(24deg) translateX(200px); opacity: 1; }
}

.night__tag {
  position: absolute;
  top: 88px;
  left: 80px;
  font-family: var(--font-mono);
  font-size: 30px;
  letter-spacing: 0.3em;
  color: var(--pink);
  border: 2px solid var(--pink);
  padding: 12px 28px;
  animation: night-tag 0.9s cubic-bezier(0.2, 1.4, 0.3, 1) both;
}

@keyframes night-tag {
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.night__lyrics {
  position: absolute;
  left: 100px;
  bottom: 220px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.night__line-sub {
  font-weight: 700;
  font-size: 78px;
  color: var(--paper);
}

.night__line-main {
  font-family: var(--font-display);
  font-size: 176px;
  line-height: 1;
  color: var(--paper);
  --kline-accent: var(--pink);
  --kline-accent-shadow: 0 0 42px rgba(255, 46, 136, 0.75);
}

.night__echo {
  position: absolute;
  right: 520px;
  font-family: var(--font-display);
  color: transparent;
  -webkit-text-stroke: 2px rgba(255, 46, 136, 0.65);
  animation: night-echo 1.2s ease-out both;
}

.night__echo--1 {
  bottom: 460px;
  font-size: 84px;
  animation-delay: 3.6s;
}

.night__echo--2 {
  bottom: 570px;
  right: 620px;
  font-size: 64px;
  animation-delay: 3.9s;
  -webkit-text-stroke-color: rgba(255, 46, 136, 0.4);
}

.night__echo--3 {
  bottom: 660px;
  right: 720px;
  font-size: 48px;
  animation-delay: 4.2s;
  -webkit-text-stroke-color: rgba(255, 46, 136, 0.22);
}

@keyframes night-echo {
  from {
    opacity: 0;
    transform: translate(40px, 30px) scale(1.3);
  }
  to {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
}
</style>
