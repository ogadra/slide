<template>
  <svg class="transfer-diagram" viewBox="0 0 1660 540" role="img" aria-label="リージョン間の転送件数">
    <defs>
      <marker
        id="transfer-arrow"
        viewBox="0 0 12 12"
        refX="11"
        refY="6"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path class="transfer-diagram__head" d="M 1 1 L 11 6 L 1 11 z" />
      </marker>
    </defs>

    <line class="transfer-diagram__line" x1="490" y1="55" x2="1170" y2="55" marker-end="url(#transfer-arrow)" />
    <line class="transfer-diagram__line" x1="1170" y1="120" x2="490" y2="120" marker-end="url(#transfer-arrow)" />
    <line class="transfer-diagram__line" x1="260" y1="160" x2="260" y2="380" marker-end="url(#transfer-arrow)" />
    <line class="transfer-diagram__line" x1="470" y1="155" x2="1175" y2="385" marker-end="url(#transfer-arrow)" />

    <g class="transfer-diagram__count">
      <rect x="700" y="17" width="110" height="76" />
      <text x="755" y="77">16</text>
    </g>
    <g class="transfer-diagram__count">
      <rect x="950" y="82" width="80" height="76" />
      <text x="990" y="142">2</text>
    </g>
    <g class="transfer-diagram__count">
      <rect x="205" y="232" width="110" height="76" />
      <text x="260" y="288">14</text>
    </g>
    <g class="transfer-diagram__count">
      <rect x="770" y="232" width="110" height="76" />
      <text x="825" y="288">3</text>
    </g>

    <g class="transfer-diagram__box">
      <rect x="40" y="10" width="440" height="140" />
      <text class="transfer-diagram__vendor" x="260" y="68">AWS</text>
      <text class="transfer-diagram__region" x="260" y="122">東京</text>
    </g>
    <g class="transfer-diagram__box">
      <rect x="1180" y="10" width="440" height="140" />
      <text class="transfer-diagram__vendor" x="1400" y="68">Google Cloud</text>
      <text class="transfer-diagram__region" x="1400" y="122">東京</text>
    </g>
    <g class="transfer-diagram__box">
      <rect x="40" y="390" width="440" height="140" />
      <text class="transfer-diagram__vendor" x="260" y="448">AWS</text>
      <text class="transfer-diagram__region" x="260" y="502">大阪</text>
    </g>
    <g class="transfer-diagram__box">
      <rect x="1180" y="390" width="440" height="140" />
      <text class="transfer-diagram__vendor" x="1400" y="448">Google Cloud</text>
      <text class="transfer-diagram__region" x="1400" y="502">大阪</text>
    </g>
  </svg>
</template>

<style scoped>
.transfer-diagram {
  display: block;
  width: 100%;
  height: auto;
  font-family: var(--font-sans);
}

.transfer-diagram__box rect {
  fill: none;
  stroke: var(--ink);
  stroke-width: 6;
}

.transfer-diagram__vendor {
  fill: var(--ink-soft);
  font-size: 40px;
  font-weight: 700;
  text-anchor: middle;
}

.transfer-diagram__region {
  fill: var(--ink);
  font-size: 56px;
  font-weight: 700;
  text-anchor: middle;
}

.transfer-diagram__line {
  stroke: var(--ink-soft);
  stroke-width: 5;
}

.transfer-diagram__head {
  fill: var(--ink-soft);
}

.transfer-diagram__count rect {
  fill: var(--base);
}

.transfer-diagram__count text {
  fill: var(--clay);
  font-size: 64px;
  font-weight: 700;
  text-anchor: middle;
}
</style>
