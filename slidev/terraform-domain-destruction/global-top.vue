<script setup lang="ts">
import { computed } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'

const nav = useNav()
const { $slidev } = useSlideContext()
const currentSlideNo = computed(() => $slidev?.nav?.currentSlideNo ?? nav.currentSlideNo.value)
const total = computed(() => $slidev?.nav?.total ?? nav.total.value)

const stepNo = computed(() => currentSlideNo.value.toString().padStart(2, '0'))
const totalNo = computed(() => total.value.toString().padStart(2, '0'))
const progressPct = computed(() => Math.round((currentSlideNo.value / total.value) * 100))
</script>

<template>
  <div class="tf-chrome">
    <div class="tf-corner tl" />
    <div class="tf-corner tr" />
    <div class="tf-corner bl" />
    <div class="tf-corner br" />

    <div class="tf-statusbar top">
      <span class="tf-prompt">$ terraform apply</span>
      <span class="tf-status">workspace=prd</span>
      <span class="tf-status soft">region=ap-northeast-1</span>
      <span class="tf-status soft">2026-06-22</span>
    </div>

    <div class="tf-meta-block left">
      <span class="tf-meta-label">[ TF ]</span>
      <div class="tf-meta-rows">
        <div><span class="k">VERSION</span><span class="v">1.x</span></div>
        <div><span class="k">PROVIDER</span><span class="v">aws</span></div>
      </div>
    </div>

    <div class="tf-meta-block mid">
      <span class="tf-meta-label">[ STATE ]</span>
      <div class="tf-meta-rows">
        <div><span class="k">BACKEND</span><span class="v">s3</span></div>
        <div><span class="k">LOCK</span><span class="v">dynamodb</span></div>
      </div>
    </div>

    <div class="tf-progress">
      <div class="tf-progress-head">
        <span class="tf-meta-label">[ PROGRESS ]</span>
        <span class="tf-progress-val">{{ progressPct }}%</span>
      </div>
      <div class="tf-progress-track">
        <div class="tf-progress-fill" :style="{ width: progressPct + '%' }" />
      </div>
    </div>

    <div class="tf-step">
      <div class="tf-step-label">[ STEP ]</div>
      <div class="tf-step-no">{{ stepNo }}</div>
      <div class="tf-step-total">/ {{ totalNo }}</div>
    </div>
  </div>
</template>

<style scoped>
.tf-chrome {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
  font-family: var(--font-mono);
  color: var(--ink-soft);
}

.tf-corner {
  position: absolute;
  width: 22px;
  height: 22px;
  border-color: var(--ink);
}
.tf-corner.tl { top: 14px; left: 14px; border-left: 2.5px solid; border-top: 2.5px solid; }
.tf-corner.tr { top: 14px; right: 14px; border-right: 2.5px solid; border-top: 2.5px solid; }
.tf-corner.bl { bottom: 14px; left: 14px; border-left: 2.5px solid; border-bottom: 2.5px solid; }
.tf-corner.br { bottom: 14px; right: 14px; border-right: 2.5px solid; border-bottom: 2.5px solid; }

.tf-statusbar {
  position: absolute;
  left: 56px;
  right: 56px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 10px;
  letter-spacing: 0.16em;
}
.tf-statusbar.top { top: 22px; }
.tf-prompt {
  color: var(--ink);
  font-weight: 900;
  letter-spacing: 0.08em;
}
.tf-status {
  color: var(--ink);
  font-weight: 700;
}
.tf-status.soft { color: var(--ink-mute); }
.tf-status.red { color: var(--tf-red); font-weight: 900; }

.tf-meta-block {
  position: absolute;
  bottom: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 10px;
  line-height: 1.5;
  letter-spacing: 0.14em;
  font-weight: 700;
}
.tf-meta-block.left { left: 56px; width: 180px; }
.tf-meta-block.mid { left: 280px; width: 200px; }

.tf-meta-label {
  flex-shrink: 0;
  font-size: 9px;
  letter-spacing: 0.28em;
  font-weight: 900;
  color: rgba(17, 22, 28, 0.5);
}
.tf-meta-rows {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
  min-width: 0;
}
.tf-meta-rows > div {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 6px;
  align-items: baseline;
  border-bottom: 1px dotted rgba(17, 22, 28, 0.22);
  padding-bottom: 1px;
}
.tf-meta-rows > div:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.tf-meta-rows .k { color: rgba(17, 22, 28, 0.55); }
.tf-meta-rows .v {
  color: var(--ink);
  font-weight: 900;
  letter-spacing: 0.06em;
}

.tf-progress {
  position: absolute;
  bottom: 24px;
  right: 280px;
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: var(--font-mono);
}
.tf-progress-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.tf-progress-val {
  color: var(--ink);
  font-weight: 900;
  font-size: 12px;
  letter-spacing: 0.08em;
}
.tf-progress-track {
  position: relative;
  height: 10px;
  border: 1.5px solid var(--ink);
}
.tf-progress-fill {
  position: absolute;
  inset: 0 auto 0 0;
  background: var(--tf-purple);
}

.tf-step {
  position: absolute;
  bottom: 18px;
  right: 56px;
  padding: 0.4rem 0.85rem;
  border: 1.5px solid var(--ink);
  background: var(--paper);
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}
.tf-step-label {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 9px;
  letter-spacing: 0.28em;
  color: var(--ink);
}
.tf-step-no {
  font-weight: 900;
  font-size: 1.4rem;
  line-height: 1;
  letter-spacing: 0.04em;
  color: var(--ink);
}
.tf-step-total {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.28em;
  color: var(--ink);
}
</style>
