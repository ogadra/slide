<script setup lang="ts">
defineProps<{
  caseNo: string
  caseName: string
  caseNameDisplay?: string
}>()
</script>

<template>
  <div class="case-canvas opener">
    <div class="opener-top">
      <div class="case-meta">
        <strong>CASE :: {{ caseNo }}</strong>
      </div>
    </div>

    <div class="opener-main">
      <div class="opener-number">{{ caseNo }}</div>
      <div class="opener-rule" />
      <div class="opener-name" v-html="caseNameDisplay || caseName" />
    </div>
  </div>
</template>

<style scoped>
.opener {
  justify-content: space-between;
}

.opener-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 8px;
}

.opener-main {
  flex: 1;
  display: grid;
  grid-template-columns: auto 3px 1fr;
  gap: 2.4rem;
  align-items: center;
  padding-bottom: 2rem;
}

.opener-number {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 14rem;
  line-height: 0.82;
  letter-spacing: -0.04em;
  color: var(--ink);
}
.opener-rule {
  width: 3px;
  height: 70%;
  background: var(--ink);
}
.opener-name {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 2.65rem;
  line-height: 1.4;
  letter-spacing: -0.015em;
  color: var(--ink);
  line-break: strict;
}
</style>
