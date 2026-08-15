<script setup lang="ts">
import { computed } from 'vue'
import proposal from '../imgs/proposal.png'

const props = defineProps<{
  frame: { x: number, y: number, w: number, h: number }
}>()

// 表示ウィンドウの中に、赤枠の領域が中央に来るようズームする
const W = 1800
const HP = 960
const H0 = W * (1695 / 1854)

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

const layerStyle = computed(() => {
  const { frame } = props
  const k = clamp(85 / frame.w, 1, 2.6)
  const cx = ((frame.x + frame.w / 2) / 100) * W
  const cy = ((frame.y + frame.h / 2) / 100) * H0
  const tx = clamp(W / 2 - cx, (k - 1) * (cx - W), (k - 1) * cx)
  const ty = clamp(HP / 2 - cy, HP - k * H0 + cy * (k - 1), cy * (k - 1))
  return {
    transformOrigin: `${cx}px ${cy}px`,
    transform: `translate(${tx}px, ${ty}px) scale(${k})`,
  }
})
</script>

<template>
  <div class="proposal">
    <div class="proposal__window">
      <div class="proposal__layer" :style="layerStyle">
        <img class="proposal__img" :src="proposal" alt="プロポーザル" />
        <span
          class="proposal__frame"
          :style="{
            left: `${frame.x}%`,
            top: `${frame.y}%`,
            width: `${frame.w}%`,
            height: `${frame.h}%`,
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.proposal {
  position: absolute;
  inset: 0;
  background: var(--void);
  display: flex;
  align-items: center;
  justify-content: center;
}

.proposal__window {
  width: 1800px;
  height: 960px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background: #ffffff;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
}

.proposal__layer {
  position: absolute;
  left: 0;
  top: 0;
  width: 1800px;
  height: 1646px;
}

.proposal__img {
  display: block;
  width: 100%;
  height: 100%;
}

.proposal__frame {
  position: absolute;
  border: 4px solid var(--alarm);
  border-radius: 8px;
  box-shadow: 0 0 24px rgba(255, 64, 64, 0.6);
}
</style>
