<script setup lang="ts">
import KLine from './KLine.vue'
import { useStage } from './stage'

const { live, take } = useStage()
</script>

<template>
  <div v-if="live" :key="take" class="limit">
    <div class="limit__hazard limit__hazard--top" />
    <div class="limit__hazard limit__hazard--bottom" />
    <div class="limit__flash" />

    <p class="limit__tag">BAR 04 — GOFUN</p>

    <div class="limit__timer">
      <svg class="limit__ring" viewBox="0 0 100 100">
        <circle class="limit__ring-ticks" cx="50" cy="50" r="48" pathLength="60" />
        <circle class="limit__ring-bg" cx="50" cy="50" r="42" />
        <circle class="limit__ring-fg" cx="50" cy="50" r="42" pathLength="100" />
      </svg>
      <div class="limit__timer-center">
        <p class="limit__timer-count">5:00</p>
        <p class="limit__timer-label">TIME LIMIT</p>
      </div>
    </div>

    <div class="limit__lyrics">
      <p class="limit__line-sub">
        <KLine text="語り尽すよ" mode="pop" :delay="0" :stagger="0.16" />
      </p>
      <h1 class="limit__line-main">
        <KLine text="五分のリミット" accent="リミット" mode="drop" :delay="1.5" :stagger="0.17" />
      </h1>
    </div>
  </div>
</template>

<style scoped>
.limit {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 70% 45%, #1A1206 0%, #0B0B12 60%);
  overflow: hidden;
}

.limit__hazard {
  position: absolute;
  left: 0;
  right: 0;
  height: 56px;
  background: repeating-linear-gradient(
    -45deg,
    var(--neon) 0 44px,
    #14140A 44px 88px
  );
  background-size: 200% 100%;
  opacity: 0.9;
}

.limit__hazard--top {
  top: 0;
  animation: limit-stripe 4s linear infinite;
}

.limit__hazard--bottom {
  bottom: 0;
  animation: limit-stripe 4s linear infinite reverse;
}

@keyframes limit-stripe {
  from { background-position: 0 0; }
  to { background-position: 124px 0; }
}

.limit__flash {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, transparent 45%, rgba(255, 64, 64, 0.16) 100%);
  animation: limit-flash 1.2s steps(1) infinite;
}

@keyframes limit-flash {
  0%, 55% { opacity: 0; }
  55.01%, 100% { opacity: 1; }
}

.limit__tag {
  position: absolute;
  top: 118px;
  left: 80px;
  font-family: var(--font-mono);
  font-size: 30px;
  letter-spacing: 0.3em;
  color: var(--neon);
  border: 2px solid var(--neon);
  padding: 12px 28px;
  animation: limit-tag 0.9s cubic-bezier(0.2, 1.4, 0.3, 1) both;
}

@keyframes limit-tag {
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.limit__timer {
  position: absolute;
  right: 130px;
  top: 50%;
  translate: 0 -50%;
  width: 560px;
  height: 560px;
  animation: limit-timer-in 1.3s cubic-bezier(0.2, 1.2, 0.3, 1) both;
}

@keyframes limit-timer-in {
  from {
    opacity: 0;
    transform: scale(0.7) rotate(-20deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.limit__ring {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.limit__ring-ticks {
  fill: none;
  stroke: rgba(245, 217, 10, 0.35);
  stroke-width: 2.6;
  stroke-dasharray: 0.4 1.6;
}

.limit__ring-bg {
  fill: none;
  stroke: rgba(245, 241, 230, 0.12);
  stroke-width: 5;
}

.limit__ring-fg {
  fill: none;
  stroke: var(--neon);
  stroke-width: 5;
  stroke-linecap: round;
  stroke-dasharray: 100;
  filter: drop-shadow(0 0 10px rgba(245, 217, 10, 0.8));
  animation: limit-sweep 40s linear both;
}

@keyframes limit-sweep {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: 100; }
}

.limit__timer-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
}

.limit__timer-count {
  font-family: var(--font-display);
  font-size: 130px;
  color: var(--paper);
  animation: limit-tick 1s steps(1) infinite;
}

@keyframes limit-tick {
  0%, 49% { color: var(--paper); }
  50%, 100% { color: var(--neon); }
}

.limit__timer-label {
  font-family: var(--font-mono);
  font-size: 28px;
  letter-spacing: 0.4em;
  color: var(--alarm);
}

.limit__lyrics {
  position: absolute;
  left: 100px;
  bottom: 300px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.limit__line-sub {
  font-weight: 700;
  font-size: 78px;
  color: var(--paper);
}

.limit__line-main {
  font-family: var(--font-display);
  font-size: 148px;
  line-height: 1;
  color: var(--paper);
  --kline-accent: var(--neon);
  --kline-accent-shadow: 8px 8px 0 var(--alarm);
}

</style>
