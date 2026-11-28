<template>
  <svg class="fig" viewBox="0 0 380 262" role="img" aria-label="www.example.comのAを問い合わせると、Route 53がAliasの指すexample.comを自分で解決し、Aレコード198.51.100.5として返す図">
    <defs>
      <marker id="alias-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="#7b8894" />
      </marker>
    </defs>

    <rect x="70" y="4" width="240" height="34" rx="17" class="query" />
    <text x="190" y="26" class="query-text">www.example.com の A は？</text>
    <line x1="190" y1="40" x2="190" y2="62" class="edge" marker-end="url(#alias-arrow)" />

    <PatchCard :x="10" :y="66" :width="360" :height="108" />
    <text x="26" y="92" class="name">www.example.com</text>
    <rect x="26" y="106" width="28" height="22" rx="11" class="badge" />
    <text x="40" y="122" class="badge-text">A</text>
    <rect x="62" y="106" width="62" height="22" rx="11" class="alias" />
    <text x="93" y="122" class="alias-text">Alias</text>
    <text x="26" y="158" class="value">→ example.com</text>

    <line x1="190" y1="176" x2="190" y2="214" class="edge" marker-end="url(#alias-arrow)" />
    <text x="202" y="200" class="note">Route 53 が引いて A で返す</text>

    <rect x="104" y="218" width="172" height="34" rx="17" class="answer" />
    <text x="190" y="240" class="answer-text">A 198.51.100.5</text>
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
  font-size: 14px;
  font-weight: 700;
  text-anchor: middle;
  fill: var(--ink);
}

.name {
  font-size: 16px;
  font-weight: 900;
  fill: var(--ink);
}

.badge {
  fill: var(--blue);
}

.badge-text,
.alias-text {
  font-size: 12px;
  font-weight: 900;
  text-anchor: middle;
}

.badge-text {
  fill: #ffffff;
}

.alias {
  fill: #ffffff;
  stroke: var(--orange);
  stroke-width: 2;
}

.alias-text {
  fill: var(--orange);
}

.value {
  font-size: 14px;
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
