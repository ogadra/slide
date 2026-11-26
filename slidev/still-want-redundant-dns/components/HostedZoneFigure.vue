<script setup lang="ts">
const props = defineProps<{ step: 1 | 2 }>()

const rows = [
  { type: 'NS', value: 'ns1.example.net' },
  { type: 'SOA', value: 'ns1.example.net ...' },
]

const badgeWidth = (type: string) => type.length * 10 + 18

const markerId = `zone-arrow-${props.step}`
</script>

<template>
  <svg class="fig" viewBox="0 0 380 330" role="img" :aria-label="step === 1 ? 'example.comのDNSゾーンを作ると、NSとSOAのレコードが入り、ネームサーバーns1.example.netが割り振られる図' : '親の.comゾーンにexample.comのNSとしてns1.example.netを設定し、example.comの問い合わせをns1.example.netへ委任する図'">
    <defs>
      <marker :id="markerId" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="#ea5520" />
      </marker>
    </defs>

    <g :class="{ off: step === 1 }">
      <PatchCard :x="10" :y="4" :width="360" :height="80" />
      <text x="26" y="31" class="name">.com ゾーン（レジストリ）</text>
      <rect x="26" y="44" width="340" height="30" rx="8" :class="['row', { highlight: step === 2 }]" />
      <rect x="34" y="49" :width="badgeWidth('NS')" height="20" rx="10" class="badge" />
      <text :x="34 + badgeWidth('NS') / 2" y="64" class="badge-text">NS</text>
      <text :x="44 + badgeWidth('NS')" y="65" class="value">example.com → ns1.example.net</text>

      <line x1="190" y1="88" x2="190" y2="114" class="edge highlight" :marker-end="`url(#${markerId})`" />
      <text x="202" y="106" class="note">委任</text>
    </g>

    <rect x="95" y="120" width="190" height="36" rx="18" :class="['server', { highlight: step === 1 }]" />
    <text x="190" y="144" class="server-name">ns1.example.net</text>
    <text v-if="step === 1" x="292" y="144" class="note">割り振られる</text>
    <line x1="190" y1="156" x2="190" y2="180" class="edge" />

    <PatchCard :x="10" :y="180" :width="360" :height="146" :r="14" />
    <rect x="80" y="194" width="220" height="32" rx="16" class="zone-head" />
    <text x="190" y="216" class="zone-name">example.com のDNSゾーン</text>
    <g v-for="(row, i) in rows" :key="row.type">
      <rect x="28" :y="238 + i * 42" width="324" height="34" rx="8" class="row" />
      <rect x="40" :y="244 + i * 42" :width="badgeWidth(row.type)" height="22" rx="11" class="badge" />
      <text :x="40 + badgeWidth(row.type) / 2" :y="260 + i * 42" class="badge-text">{{ row.type }}</text>
      <text :x="54 + badgeWidth(row.type)" :y="261 + i * 42" class="value">{{ row.value }}</text>
    </g>
  </svg>
</template>

<style scoped>
.fig {
  display: block;
  width: 370px;
  margin: 0 auto;
  overflow: visible;
}

.off {
  opacity: 0.18;
}

.name {
  font-size: 16px;
  font-weight: 900;
  fill: var(--ink);
}

.zone-head {
  fill: #ffffff;
  stroke: var(--ink);
  stroke-width: 1.5;
}

.zone-name {
  font-size: 16px;
  font-weight: 700;
  text-anchor: middle;
  fill: var(--ink);
}

.row {
  fill: var(--cream);
}

.row.highlight {
  stroke: var(--orange);
  stroke-width: 2.5;
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
  fill: var(--ink);
}

.server {
  fill: #ffffff;
  stroke: var(--ink);
  stroke-width: 1.5;
}

.server.highlight {
  stroke: var(--orange);
  stroke-width: 2.5;
}

.server-name {
  font-size: 16px;
  font-weight: 700;
  text-anchor: middle;
  fill: var(--ink);
}

.edge {
  stroke: #7b8894;
  stroke-width: 1.5;
}

.edge.highlight {
  stroke: var(--orange);
  stroke-width: 2.5;
}

.note {
  font-size: 14px;
  font-weight: 700;
  fill: var(--orange);
}
</style>
