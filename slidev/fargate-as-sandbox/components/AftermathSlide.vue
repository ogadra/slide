<script setup lang="ts">
defineProps<{
  caseNo: string
  caseName: string
  notes: { id: string; text: string }[]
}>()
</script>

<template>
  <div class="case-canvas aftermath">
    <div class="aftermath-top">
      <div class="case-meta">
        <strong>CASE :: {{ caseNo }}</strong> ·  AFTERMATH  ·  {{ caseName }}
      </div>
      <div class="case-stamp slate">FIELD NOTE</div>
    </div>

    <div class="aftermath-head">
      <div class="aftermath-tag">§ {{ caseNo }} · AFTERMATH</div>
      <div class="aftermath-rule" />
    </div>

    <div class="aftermath-list">
      <div
        v-for="note in notes"
        :key="note.id"
        class="aftermath-note"
      >
        <div class="aftermath-note-id">{{ note.id }}</div>
        <div class="aftermath-note-text" v-html="note.text" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.aftermath {
  /* .case-canvas が absolute なので relative 指定は不要。子の absolute はこの canvas に対して配置される */
}

.aftermath-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 8px;
}

.aftermath-head {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.aftermath-tag {
  font-family: var(--font-mono);
  font-weight: 900;
  font-size: 1rem;
  letter-spacing: 0.28em;
  color: var(--ink);
  text-transform: uppercase;
}
.aftermath-rule {
  flex: 1;
  height: 2px;
  background: var(--ink);
}

.aftermath-list {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.aftermath-note {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 2rem;
  align-items: center;
  border-top: 1px solid var(--ink);
  padding-top: 1.1rem;
}
.aftermath-note-id {
  font-family: var(--font-mono);
  font-weight: 900;
  font-size: 0.9rem;
  letter-spacing: 0.28em;
  color: var(--accent);
  text-transform: uppercase;
}
.aftermath-note-text {
  font-family: var(--font-sans);
  font-size: 1.7rem;
  line-height: 1.6;
  color: var(--ink);
  font-weight: 700;
  letter-spacing: -0.005em;
  line-break: strict;
}
.aftermath-note-text :deep(strong) {
  background: linear-gradient(transparent 60%, var(--accent-tint) 60%);
}
.aftermath-note-text :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--paper);
  border: 1px solid var(--ink);
  padding: 0 0.3em;
}
</style>
