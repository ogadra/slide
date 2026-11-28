<script setup lang="ts">
import route53 from '../imgs/icons/route53.png'
import ns1 from '../imgs/icons/ns1.png'
import registry from '../imgs/icons/registry.png'

const props = defineProps<{ step: 1 | 2 | 3 }>()

const on = (...steps: number[]) => (steps.includes(props.step) ? 'on' : 'off')

const markerId = `delegation-arrow-${props.step}`

const blink = (step: number) => (props.step === step ? "blink" : "")

const arrow = (step: number) => `url(#${markerId}${props.step === step ? "-blink" : ""})`

const zones = [
  { name: 'ogadra.net', x: 186, steps: [1, 2, 3] },
  { name: 'bunshin.ogadra.net', x: 336, steps: [1, 3] },
]
</script>

<template>
  <svg class="fig" viewBox="0 0 486 310" role="img" aria-label="レジストラ、レジストリ、ogadra.netとbunshin.ogadra.netのゾーンの関係図">
    <defs>
      <marker :id="markerId" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="#7b8894" />
      </marker>
      <marker :id="`${markerId}-blink`" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="#ea5520" />
      </marker>
    </defs>

    <g v-for="zone in zones" :key="zone.name" :class="on(...zone.steps)">
      <PatchCard :x="zone.x" :y="30" :width="140" :height="270" :stitch-class="blink(1)" />
      <text :x="zone.x + 70" y="52" class="zone-name">{{ zone.name }}</text>
    </g>

    <g :class="on(2)">
      <line x1="74" y1="168" x2="114" y2="168" :class="['edge', blink(2)]" :marker-end="arrow(2)" />
      <image :href="route53" x="26" y="146" width="44" height="44" />
      <text x="48" y="208" class="label">Route 53</text>
      <text x="48" y="223" class="label">Domains</text>
      <text x="48" y="238" class="label">(レジストラ)</text>
    </g>

    <g :class="on(2)">
      <image :href="registry" x="118" y="146" width="44" height="44" />
      <text x="140" y="208" class="label">.net</text>
      <text x="140" y="223" class="label">レジストリ</text>
      <line x1="166" y1="162" x2="224" y2="120" :class="['edge', blink(2)]" :marker-end="arrow(2)" />
      <line x1="166" y1="174" x2="224" y2="216" :class="['edge', blink(2)]" :marker-end="arrow(2)" />
    </g>

    <g :class="on(3)">
      <line x1="290" y1="112" x2="374" y2="112" :class="['edge', blink(3)]" :marker-end="arrow(3)" />
      <line x1="290" y1="122" x2="374" y2="214" :class="['edge', blink(3)]" :marker-end="arrow(3)" />
      <line x1="290" y1="214" x2="374" y2="122" :class="['edge', blink(3)]" :marker-end="arrow(3)" />
      <line x1="290" y1="224" x2="374" y2="224" :class="['edge', blink(3)]" :marker-end="arrow(3)" />
    </g>

    <g v-for="zone in zones" :key="`${zone.name}-servers`" :class="on(...zone.steps)">
      <image :href="route53" :x="zone.x + 48" y="90" width="44" height="44" />
      <text :x="zone.x + 70" y="150" class="label">Route 53</text>
      <image :href="ns1" :x="zone.x + 40" y="210" width="60" height="30" />
      <text :x="zone.x + 70" y="258" class="label">IBM NS1 Connect</text>
    </g>
  </svg>
</template>

<style scoped>
.fig {
  display: block;
  width: 460px;
  margin: 0 -28px 0 auto;
  overflow: visible;
}

.zone-name {
  font-size: 14px;
  font-weight: 700;
  text-anchor: middle;
  fill: var(--ink);
}

.label {
  font-size: 14px;
  font-weight: 700;
  text-anchor: middle;
  fill: var(--ink);
}

.edge {
  stroke: #7b8894;
  stroke-width: 1.5;
}

.off {
  opacity: 0.18;
}

.blink {
  stroke: var(--orange);
  stroke-width: 2.5;
  animation: blink 1.2s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}
</style>
