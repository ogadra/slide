<script setup lang="ts">
// レーダー画面風のターゲット表示パネル。
// 中身は装飾なのでこのコンポーネント内で完結。
</script>

<template>
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
</template>

<style scoped>
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
</style>
