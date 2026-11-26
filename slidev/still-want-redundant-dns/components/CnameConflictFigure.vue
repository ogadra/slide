<script setup lang="ts">
const rows = [
  { type: 'CNAME', value: 'example.com' },
  { type: 'A', value: '203.0.113.10' },
]

const badgeWidth = (type: string) => type.length * 10 + 18
</script>

<template>
  <svg class="fig" viewBox="0 0 380 348" role="img" aria-label="www.example.comにCNAMEとAが同居していると、Aをそのまま返すかCNAMEをたどるかで答えが2つになる図">
    <defs>
      <marker id="cname-conflict-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="#7b8894" />
      </marker>
    </defs>

    <rect x="60" y="4" width="260" height="34" rx="17" class="query" />
    <text x="190" y="27" class="query-text">www.example.com の A は？</text>
    <line x1="190" y1="40" x2="190" y2="62" class="edge" marker-end="url(#cname-conflict-arrow)" />

    <PatchCard :x="10" :y="66" :width="360" :height="104" />
    <text x="26" y="92" class="name">www.example.com</text>
    <g v-for="(row, i) in rows" :key="row.type">
      <rect x="26" :y="106 + i * 32" :width="badgeWidth(row.type)" height="22" rx="11" class="badge" />
      <text :x="26 + badgeWidth(row.type) / 2" :y="122 + i * 32" class="badge-text">{{ row.type }}</text>
      <text :x="40 + badgeWidth(row.type)" :y="122 + i * 32" class="value">{{ row.value }}</text>
    </g>

    <line x1="74" y1="172" x2="74" y2="274" class="edge" marker-end="url(#cname-conflict-arrow)" />
    <text x="84" y="224" class="note">A をそのまま返す</text>
    <rect x="0" y="278" width="148" height="34" rx="17" class="answer" />
    <text x="74" y="301" class="answer-text">203.0.113.10</text>

    <line x1="293" y1="172" x2="293" y2="196" class="edge" marker-end="url(#cname-conflict-arrow)" />
    <text x="283" y="190" class="note end">CNAME をたどる</text>
    <PatchCard :x="214" :y="200" :width="158" :height="54" />
    <text x="228" y="221" class="name">example.com</text>
    <rect x="228" y="228" :width="badgeWidth('A')" height="20" rx="10" class="badge" />
    <text :x="228 + badgeWidth('A') / 2" y="243" class="badge-text">A</text>
    <text :x="242 + badgeWidth('A')" y="244" class="value">198.51.100.5</text>
    <line x1="293" y1="254" x2="293" y2="274" class="edge" marker-end="url(#cname-conflict-arrow)" />
    <rect x="219" y="278" width="148" height="34" rx="17" class="answer" />
    <text x="293" y="301" class="answer-text">198.51.100.5</text>

    <text x="190" y="340" class="conflict">答えが2つになる</text>
  </svg>
</template>

<style scoped>
.fig {
  display: block;
  width: 410px;
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
