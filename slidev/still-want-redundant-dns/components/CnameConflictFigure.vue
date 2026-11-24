<script setup lang="ts">
const rows = [
  { type: 'CNAME', value: 'd111111abcdef8.cloudfront.net' },
  { type: 'A', value: '203.0.113.10' },
]

const badgeWidth = (type: string) => type.length * 10 + 18
</script>

<template>
  <svg class="fig" viewBox="0 0 380 340" role="img" aria-label="www.example.comにCNAMEとAが同居していると、Aをそのまま返すかCNAMEをたどるかで答えが2つになる図">
    <defs>
      <marker id="cname-conflict-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="#7b8894" />
      </marker>
    </defs>

    <rect x="60" y="4" width="260" height="34" rx="17" class="query" />
    <text x="190" y="27" class="query-text">www.example.com の A は？</text>
    <line x1="190" y1="40" x2="190" y2="62" class="edge" marker-end="url(#cname-conflict-arrow)" />

    <rect x="10" y="66" width="360" height="104" rx="10" class="card" />
    <text x="26" y="92" class="name">www.example.com</text>
    <g v-for="(row, i) in rows" :key="row.type">
      <rect x="26" :y="106 + i * 32" :width="badgeWidth(row.type)" height="22" rx="11" class="badge" />
      <text :x="26 + badgeWidth(row.type) / 2" :y="122 + i * 32" class="badge-text">{{ row.type }}</text>
      <text :x="40 + badgeWidth(row.type)" :y="122 + i * 32" class="value">{{ row.value }}</text>
    </g>

    <line x1="150" y1="172" x2="96" y2="236" class="edge" marker-end="url(#cname-conflict-arrow)" />
    <text x="116" y="196" class="note end">A をそのまま返す</text>
    <rect x="22" y="240" width="148" height="34" rx="17" class="answer" />
    <text x="96" y="263" class="answer-text">203.0.113.10</text>

    <line x1="230" y1="172" x2="284" y2="236" class="edge" marker-end="url(#cname-conflict-arrow)" />
    <text x="264" y="196" class="note">CNAME をたどる</text>
    <rect x="210" y="240" width="148" height="34" rx="17" class="answer" />
    <text x="284" y="263" class="answer-text">198.51.100.5</text>

    <text x="190" y="318" class="conflict">答えが2つになる</text>
  </svg>
</template>

<style scoped>
.fig {
  display: block;
  width: 400px;
  margin: 0 auto;
  overflow: visible;
}

.query {
  fill: #ffffff;
  stroke: var(--ink);
  stroke-width: 1.5;
}

.query-text,
.answer-text {
  font-size: 16px;
  font-weight: 700;
  text-anchor: middle;
  fill: var(--ink);
}

.card {
  fill: #ffffff;
  stroke: #aeb6be;
  stroke-width: 1.5;
}

.name {
  font-size: 18px;
  font-weight: 900;
  fill: var(--ink);
}

.badge {
  fill: var(--blue);
}

.badge-text {
  font-size: 13px;
  font-weight: 900;
  text-anchor: middle;
  fill: #ffffff;
}

.value {
  font-size: 16px;
  font-weight: 700;
  fill: var(--ink-soft);
}

.edge {
  stroke: #7b8894;
  stroke-width: 1.5;
}

.note {
  font-size: 14px;
  font-weight: 700;
  fill: var(--ink);
}

.note.end {
  text-anchor: end;
}

.answer {
  fill: var(--orange);
}

.answer-text {
  fill: #ffffff;
}

.conflict {
  font-size: 18px;
  font-weight: 900;
  text-anchor: middle;
  fill: var(--orange);
}
</style>
