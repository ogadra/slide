<script setup lang="ts">
import KLine from './KLine.vue'
import { useStage } from './stage'

const { live, take } = useStage()
</script>

<template>
  <div v-if="live" :key="take" class="gimmick">
    <div class="gimmick__blueprint" />

    <div class="gimmick__gear gimmick__gear--big">
      <div class="gimmick__gear-teeth" />
      <div class="gimmick__gear-core" />
    </div>
    <div class="gimmick__gear gimmick__gear--small">
      <div class="gimmick__gear-teeth" />
      <div class="gimmick__gear-core" />
    </div>

    <div class="gimmick__crosshair">
      <span class="gimmick__crosshair-h" />
      <span class="gimmick__crosshair-v" />
    </div>

    <p class="gimmick__tag">BAR 02 — JIBUN</p>

    <div class="gimmick__lyrics">
      <p class="gimmick__line-sub">
        <KLine text="考え抜かれた" mode="flip" :delay="0" :stagger="0.16" />
      </p>
      <h1 class="gimmick__line-main">
        <KLine text="自分のギミック" accent="ギミック" mode="flip" :delay="1.5" :stagger="0.18" />
      </h1>
    </div>

    <p class="gimmick__fig">FIG. 02 ／ 設計図: 自分自身 ／ PATENT PENDING</p>
  </div>
</template>

<style scoped>
.gimmick {
  position: absolute;
  inset: 0;
  background: #081418;
  overflow: hidden;
}

.gimmick__blueprint {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(46, 230, 214, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(46, 230, 214, 0.07) 1px, transparent 1px),
    linear-gradient(rgba(46, 230, 214, 0.14) 2px, transparent 2px),
    linear-gradient(90deg, rgba(46, 230, 214, 0.14) 2px, transparent 2px);
  background-size: 48px 48px, 48px 48px, 240px 240px, 240px 240px;
  animation: gimmick-fade 0.8s ease-out both;
}

.gimmick__gear {
  position: absolute;
  animation: gimmick-fade 0.8s ease-out both;
}

.gimmick__gear--big {
  right: 120px;
  top: 90px;
  width: 460px;
  height: 460px;
}

.gimmick__gear--small {
  right: 470px;
  top: 400px;
  width: 260px;
  height: 260px;
  animation-delay: 0.2s;
}

.gimmick__gear-teeth {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: repeating-conic-gradient(
    from 0deg,
    rgba(46, 230, 214, 0.55) 0deg 14deg,
    transparent 14deg 30deg
  );
  mask-image: radial-gradient(circle, transparent 58%, #000 58%, #000 100%);
  animation: gimmick-spin 14s linear infinite;
}

.gimmick__gear--small .gimmick__gear-teeth {
  animation-direction: reverse;
  animation-duration: 9s;
}

.gimmick__gear-core {
  position: absolute;
  inset: 18%;
  border-radius: 50%;
  border: 4px solid rgba(46, 230, 214, 0.55);
}

.gimmick__gear-core::after {
  content: '';
  position: absolute;
  inset: 30%;
  border-radius: 50%;
  border: 3px dashed rgba(46, 230, 214, 0.4);
}

@keyframes gimmick-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes gimmick-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

.gimmick__crosshair {
  position: absolute;
  right: 330px;
  top: 300px;
  width: 40px;
  height: 40px;
  animation: gimmick-fade 0.8s ease-out 0.4s both;
}

.gimmick__crosshair-h,
.gimmick__crosshair-v {
  position: absolute;
  background: rgba(46, 230, 214, 0.8);
}

.gimmick__crosshair-h {
  left: -60px;
  right: -60px;
  top: 50%;
  height: 2px;
}

.gimmick__crosshair-v {
  top: -60px;
  bottom: -60px;
  left: 50%;
  width: 2px;
}

.gimmick__tag {
  position: absolute;
  top: 88px;
  left: 80px;
  font-family: var(--font-mono);
  font-size: 30px;
  letter-spacing: 0.3em;
  color: var(--cyan);
  border: 2px solid var(--cyan);
  padding: 12px 28px;
  animation: gimmick-tag 0.9s cubic-bezier(0.2, 1.4, 0.3, 1) both;
}

@keyframes gimmick-tag {
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.gimmick__lyrics {
  position: absolute;
  left: 100px;
  bottom: 260px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.gimmick__line-sub {
  font-weight: 700;
  font-size: 78px;
  color: var(--paper);
}

.gimmick__line-main {
  font-family: var(--font-display);
  font-size: 176px;
  line-height: 1;
  color: var(--paper);
  --kline-accent: var(--cyan);
  --kline-accent-shadow: 0 0 42px rgba(46, 230, 214, 0.7);
}

.gimmick__fig {
  position: absolute;
  left: 100px;
  bottom: 120px;
  font-family: var(--font-mono);
  font-size: 28px;
  letter-spacing: 0.18em;
  color: rgba(46, 230, 214, 0.7);
  animation: gimmick-fade 0.8s ease-out both;
}
</style>
