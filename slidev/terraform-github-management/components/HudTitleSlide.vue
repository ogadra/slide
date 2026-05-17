<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  speaker: string
  meta?: string[]
  resources?: { name: string; status: string; tone: 'default' | 'green' | 'red' | 'orange' }[]
  metrics?: { label: string; value: string; percent: number; tone: 'default' | 'green' | 'red' | 'orange' }[]
}>()

const dotClass = (tone: string) => {
  if (tone === 'green') return 'hud-green'
  if (tone === 'red') return 'hud-red'
  if (tone === 'orange') return 'hud-orange'
  return ''
}
const valueClass = (tone: string) => dotClass(tone)
</script>

<template>
  <HudSlide>
    <div class="title-grid">
      <HudPanel label="[ MAIN / SUBJECT ]" panel-class="col-span-9 row-span-4 p-4">
        <div class="meta-row">
          <span class="hud-green">▶</span>
          <template v-for="(m, i) in meta" :key="i">
            <span class="opacity-50" v-if="i > 0">//</span>
            <span>{{ m }}</span>
          </template>
        </div>
        <div class="title-main" v-html="title" />
        <div class="title-footer">
          <span v-html="subtitle" />
          <span>SPEAKER: {{ speaker }}</span>
        </div>
      </HudPanel>

      <HudPanel label="[ TARGET ]" panel-class="col-span-3 row-span-2 target-panel">
        <!-- 右上の地図方位記号 -->
        <svg class="compass" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
          <!-- 縦軸（三角形の頂点まで貫通） -->
          <line x1="20" y1="2" x2="20" y2="48" stroke="#1a1a1a" stroke-width="1.5" />
          <!-- 横軸 -->
          <line x1="10" y1="38" x2="30" y2="38" stroke="#1a1a1a" stroke-width="1.5" />
          <!-- 北を示す旗の左辺 -->
          <line x1="20" y1="2" x2="12" y2="22" stroke="#1a1a1a" stroke-width="1.5" stroke-linejoin="round" />
          <!-- 北を示す旗の底辺（中軸を貫通させて完全に表示） -->
          <line x1="12" y1="22" x2="28" y2="22" stroke="#1a1a1a" stroke-width="1.5" />
        </svg>
        <svg class="target-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <!-- 外周目盛り -->
          <g stroke="#1a1a1a" stroke-width="1" fill="none">
            <circle cx="100" cy="100" r="95" />
            <g v-for="t in 24" :key="t" :transform="`rotate(${(t - 1) * 15} 100 100)`">
              <line x1="100" y1="5" x2="100" :y2="(t - 1) % 6 === 0 ? 18 : 11" />
            </g>
          </g>
          <!-- 同心円 -->
          <g stroke="#1a1a1a" fill="none">
            <circle cx="100" cy="100" r="70" stroke-dasharray="3 4" opacity="0.5" />
            <circle cx="100" cy="100" r="45" stroke-dasharray="3 4" opacity="0.5" />
            <circle cx="100" cy="100" r="22" opacity="0.8" />
          </g>
          <!-- 十字 -->
          <g stroke="#1a1a1a" stroke-width="1" opacity="0.6">
            <line x1="22" y1="100" x2="178" y2="100" />
            <line x1="100" y1="22" x2="100" y2="178" />
          </g>
          <!-- スキャンセクター(扇形) -->
          <path d="M100 100 L 100 30 A 70 70 0 0 1 165 100 Z" fill="#1a1a1a" fill-opacity="0.08" />
          <line x1="100" y1="100" x2="165" y2="100" stroke="#1a1a1a" stroke-width="1.5" />
          <!-- 検出ドット -->
          <g fill="#cc1100">
            <circle cx="130" cy="62" r="4" />
            <circle cx="148" cy="115" r="3" />
          </g>
          <g fill="#0a7a3a">
            <circle cx="78" cy="78" r="3" />
            <circle cx="60" cy="120" r="3" />
            <circle cx="115" cy="135" r="3" />
          </g>
          <!-- 中心 -->
          <g>
            <circle cx="100" cy="100" r="6" fill="#cc1100" />
            <circle cx="100" cy="100" r="3" fill="#ffffff" />
          </g>
          <!-- 角コーナー -->
          <g stroke="#1a1a1a" stroke-width="2" fill="none">
            <polyline points="6,18 6,6 18,6" />
            <polyline points="182,6 194,6 194,18" />
            <polyline points="194,182 194,194 182,194" />
            <polyline points="18,194 6,194 6,182" />
          </g>
        </svg>
      </HudPanel>

      <HudPanel label="[ METRICS ]" panel-class="col-span-3 row-span-2 p-3">
        <div class="metrics-list">
          <HudMetric v-for="(m, i) in metrics" :key="i" v-bind="m" />
        </div>
      </HudPanel>

      <HudPanel label="[ RESOURCES ]" panel-class="col-span-12 row-span-2 p-3">
        <div class="resources-grid">
          <div v-for="(r, i) in resources" :key="i" class="resource-row">
            <span><span :class="dotClass(r.tone)">●</span> {{ r.name }}</span>
            <span :class="valueClass(r.tone === 'green' ? 'default' : r.tone)" :style="r.tone === 'green' ? 'opacity: 0.6' : ''">{{ r.status }}</span>
          </div>
        </div>
      </HudPanel>
    </div>
  </HudSlide>
</template>

<style scoped>
.title-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 0.5rem;
  height: 100%;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 10px;
  opacity: 0.7;
  letter-spacing: 0.05em;
}

.title-main {
  font-family: 'Bodoni Moda', serif;
  font-weight: 900;
  font-size: 4.5rem;
  line-height: 0.95;
}

.title-footer {
  position: absolute;
  bottom: 0.75rem;
  left: 1rem;
  right: 1rem;
  border-top: 1px solid #1a1a1a;
  padding-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
}

.target-panel {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.target-svg {
  width: 100%;
  height: 100%;
  max-width: 140px;
  max-height: 140px;
}
.compass {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 36px;
}

.target {
  position: relative;
  width: 80px;
  height: 80px;
}
.target-ring {
  position: absolute;
  border: 1px solid #1a1a1a;
  border-radius: 9999px;
}
.target-ring.r1 { inset: 0; }
.target-ring.r2 { inset: 8px; opacity: 0.6; }
.target-ring.r3 { inset: 16px; opacity: 0.4; }
.target-cross {
  position: absolute;
  background: #1a1a1a;
}
.target-cross.h { top: 50%; left: 0; right: 0; height: 1px; }
.target-cross.v { left: 50%; top: 0; bottom: 0; width: 1px; }
.target-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: #cc1100;
  transform: translate(-50%, -50%);
}

.metrics-list {
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.resources-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.5rem;
  row-gap: 0.25rem;
  font-size: 10px;
  margin-top: 0.75rem;
}

.resource-row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(26, 26, 26, 0.3);
  padding-bottom: 0.125rem;
}
</style>
