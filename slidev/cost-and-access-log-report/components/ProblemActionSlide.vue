<script setup lang="ts">
import { useSlots } from 'vue'

withDefaults(defineProps<{ mediaWidth?: number }>(), { mediaWidth: 640 })

const slots = useSlots()
</script>

<template>
  <div class="problem-action-slide">
    <div class="problem-action-slide__problem">
      <slot name="problem" />
    </div>
    <div
      class="problem-action-slide__action"
      :class="{ 'problem-action-slide__action--split': !!slots.media }"
    >
      <div class="problem-action-slide__action-inner">
        <slot name="action" />
      </div>
      <figure
        v-if="slots.media"
        class="problem-action-slide__media"
        :style="{ flexBasis: `${mediaWidth}px` }"
      >
        <slot name="media" />
      </figure>
    </div>
  </div>
</template>

<style scoped>
.problem-action-slide {
  position: absolute;
  inset: 0;
  background: var(--base);
  color: var(--ink);
  overflow: hidden;
  padding: 130px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.problem-action-slide__problem {
  flex: none;
  font-weight: 700;
  font-size: 84px;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: var(--ink-soft);
}

.problem-action-slide__action {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
}

.problem-action-slide__action-inner {
  flex: 1 1 auto;
  min-width: 0;
  font-weight: 700;
  font-size: 60px;
  line-height: 2;
  letter-spacing: -0.02em;
}

.problem-action-slide__action--split {
  gap: 80px;
}

.problem-action-slide__action--split .problem-action-slide__action-inner {
  font-size: 46px;
  line-height: 1.7;
}

.problem-action-slide__action--split :deep(.accent) {
  font-size: 76px;
}

.problem-action-slide__media {
  flex: 0 0 auto;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.problem-action-slide__media :deep(img) {
  display: block;
  width: 100%;
  max-height: 700px;
  object-fit: contain;
  background: #FFFFFF;
  border: 8px solid var(--ink);
  box-sizing: border-box;
}

.problem-action-slide :deep(p) {
  margin: 0;
}

.problem-action-slide :deep(.accent) {
  color: var(--clay);
  font-size: 96px;
}

.problem-action-slide :deep(ul) {
  display: flex;
  flex-direction: column;
  gap: 22px;
  font-size: 50px;
  line-height: 1.4;
}

.problem-action-slide :deep(li) {
  position: relative;
  padding-left: 46px;
}

.problem-action-slide :deep(li)::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.5em;
  width: 18px;
  height: 18px;
  background: var(--clay);
}

.problem-action-slide :deep(ul + p) {
  margin-top: 44px;
}

.problem-action-slide :deep(table) {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  font-size: 80px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
}

.problem-action-slide :deep(tr) {
  border: none;
}

.problem-action-slide :deep(th),
.problem-action-slide :deep(td) {
  padding: 28px 20px;
  text-align: center;
}

.problem-action-slide :deep(th:first-child),
.problem-action-slide :deep(td:first-child) {
  color: var(--ink-soft);
  font-weight: 700;
}

.problem-action-slide :deep(thead th) {
  font-size: 56px;
  font-weight: 700;
  color: var(--ink-soft);
  border-bottom: 4px solid var(--ink);
  white-space: nowrap;
}

.problem-action-slide :deep(tbody td) {
  border-bottom: 2px solid rgba(167, 158, 141, 0.45);
}

.problem-action-slide :deep(tbody tr:last-child td) {
  border-bottom: none;
  border-top: 4px solid var(--ink);
  font-weight: 700;
  color: var(--ink);
}

.problem-action-slide :deep(tbody tr:last-child td:last-child) {
  color: var(--clay);
}

.problem-action-slide :deep(table + p),
.problem-action-slide :deep(svg + p) {
  margin-top: 36px;
  font-size: 44px;
}

.problem-action-slide :deep(small) {
  font-size: 32px;
  font-weight: 500;
  color: var(--ink-soft);
}
</style>
