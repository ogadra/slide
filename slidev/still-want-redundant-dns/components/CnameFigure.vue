<script setup lang="ts">
const records = [
  { y: 66, name: 'www.example.com', type: 'CNAME', value: 'example.com' },
  { y: 184, name: 'example.com', type: 'A', value: '198.51.100.5' },
]

const badgeWidth = (type: string) => type.length * 10 + 18
</script>

<template>
  <svg class="fig" viewBox="0 0 380 330" role="img" aria-label="www.example.comのAを問い合わせると、CNAMEでexample.comに読み替えて引き直し、198.51.100.5が返る図">
    <defs>
      <marker id="cname-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="#7b8894" />
      </marker>
    </defs>

    <rect x="60" y="4" width="260" height="34" rx="17" class="query" />
    <text x="190" y="27" class="query-text">www.example.com の A は？</text>
    <line x1="190" y1="40" x2="190" y2="62" class="edge" marker-end="url(#cname-arrow)" />

    <g v-for="record in records" :key="record.name">
      <PatchCard :x="10" :y="record.y" :width="360" :height="74" />
      <text x="26" :y="record.y + 26" class="name">{{ record.name }}</text>
      <rect x="26" :y="record.y + 40" :width="badgeWidth(record.type)" height="22" rx="11" class="badge" />
      <text :x="26 + badgeWidth(record.type) / 2" :y="record.y + 56" class="badge-text">{{ record.type }}</text>
      <text :x="40 + badgeWidth(record.type)" :y="record.y + 56" class="value">{{ record.value }}</text>
    </g>

    <line x1="190" y1="142" x2="190" y2="180" class="edge" marker-end="url(#cname-arrow)" />
    <text x="202" y="166" class="note">名前を読み替えて引き直す</text>

    <line x1="190" y1="260" x2="190" y2="284" class="edge" marker-end="url(#cname-arrow)" />
    <rect x="116" y="288" width="148" height="34" rx="17" class="answer" />
    <text x="190" y="311" class="answer-text">198.51.100.5</text>
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
  fill: var(--orange);
}

.answer {
  fill: var(--orange);
}

.answer-text {
  fill: #ffffff;
}
</style>
