<script setup lang="ts">
defineProps<{
  label: string
  rows: { k: string; v: string }[]
}>()
</script>

<template>
  <div class="hud-meta-block">
    <span class="hud-deco-label">[ {{ label }} ]</span>
    <div class="hud-meta-rows">
      <div class="hud-meta-row" v-for="(row, i) in rows" :key="i">
        <span class="k">{{ row.k }}</span>
        <span class="v">{{ row.v }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hud-meta-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 1.5;
  letter-spacing: 0.18em;
  font-weight: 700;
  color: #1a1a1a;
}
.hud-deco-label {
  flex-shrink: 0;
  font-size: 9px;
  letter-spacing: 0.3em;
  font-weight: 700;
  color: rgba(26, 26, 26, 0.55);
}
.hud-meta-rows {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
  min-width: 0;
}
.hud-meta-row {
  display: grid;
  grid-template-columns: 60px 1fr;
  align-items: baseline;
  gap: 8px;
  border-bottom: 1px dotted rgba(26, 26, 26, 0.25);
  padding-bottom: 1px;
}
.hud-meta-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.k {
  color: rgba(26, 26, 26, 0.5);
}
.v {
  color: #1a1a1a;
  font-weight: 900;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
}
</style>
