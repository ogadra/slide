<script setup lang="ts">
const props = defineProps<{ step: number, fail: 'server' | 'dns' }>()

const colors = {
  aws: { main: '#ea5520', tint: '#fcebe4' },
  gcp: { main: '#004aba', tint: '#e0e9f7' },
}

type Cloud = keyof typeof colors

const failed = () => props.step >= 1
const cut = () => props.step >= 2

const clouds: { id: Cloud, name: string, x: number }[] = [
  { id: 'aws', name: 'AWS', x: 10 },
  { id: 'gcp', name: 'Google Cloud', x: 220 },
]

const dnses: { id: Cloud, name: string, cx: number, userX: number }[] = props.fail === 'server'
  ? [{ id: 'aws', name: 'Route 53', cx: 210, userX: 210 }]
  : [
      { id: 'aws', name: 'Route 53', cx: 105, userX: 175 },
      { id: 'gcp', name: 'Cloud DNS', cx: 315, userX: 245 },
    ]

const dnsActive = (dns: Cloud) => !(props.fail === 'dns' && dns === 'aws' && cut())
const serverActive = (cloud: Cloud) => !(props.fail === 'server' && cloud === 'aws' && cut())
const cloudDown = (cloud: Cloud) => props.fail === 'server' && cloud === 'aws' && failed()
const dnsDown = (dns: Cloud) => props.fail === 'dns' && dns === 'aws' && failed()

const marker = (on: boolean, color: Cloud) => `url(#failover-arrow-${props.fail}-${on ? color : 'off'})`
const edgeStyle = (on: boolean, color: Cloud) => (on ? { stroke: colors[color].main } : {})

const dnsToServer = () => dnses.flatMap(dns => clouds.map(cloud => ({
  key: `${dns.name}-${cloud.name}`,
  x1: dns.cx + (cloud.x + 95 - dns.cx) * 0.3,
  x2: cloud.x + 95 + (dns.cx - cloud.x - 95) * 0.3,
  on: dnsActive(dns.id) && serverActive(cloud.id),
  color: cloud.id,
})))
</script>

<template>
  <svg class="fig" viewBox="0 0 420 320" role="img" :aria-label="fail === 'server' ? 'AWSのサーバーに障害が起きると、Route 53がGoogle Cloudのサーバーだけを返す図' : 'Route 53に障害が起きると、Cloud DNSだけで名前解決する図'">
    <defs>
      <marker :id="`failover-arrow-${fail}-off`" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="#c3cad1" />
      </marker>
      <marker v-for="(c, id) in colors" :id="`failover-arrow-${fail}-${id}`" :key="id" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" :fill="c.main" />
      </marker>
    </defs>

    <rect x="135" y="4" width="150" height="34" rx="17" class="user" />
    <text x="210" y="27" class="pill-text">ユーザー</text>

    <g v-for="cloud in clouds" :key="cloud.name" :class="{ down: cloudDown(cloud.id) }">
      <PatchCard :x="cloud.x" :y="160" :width="190" :height="152" :fill="colors[cloud.id].tint" />
      <rect :x="cloud.x + 30" y="188" width="130" height="36" rx="18" class="pill" :style="serverActive(cloud.id) ? { stroke: colors[cloud.id].main } : {}" />
      <text :x="cloud.x + 95" y="212" class="pill-text">サーバー</text>
      <rect :x="cloud.x + 35" y="268" width="120" height="30" rx="15" :fill="colors[cloud.id].main" />
      <text :x="cloud.x + 95" y="289" class="name">{{ cloud.name }}</text>
    </g>

    <g v-for="dns in dnses" :key="dns.name" :class="{ down: dnsDown(dns.id) }">
      <rect :x="dns.cx - 65" y="84" width="130" height="36" rx="18" class="pill" :style="{ fill: colors[dns.id].tint, ...(dnsActive(dns.id) ? { stroke: colors[dns.id].main } : {}) }" />
      <text :x="dns.cx" y="108" class="pill-text">{{ dns.name }}</text>
    </g>

    <line v-for="dns in dnses" :key="`${dns.name}-user`" :x1="dns.userX" y1="40" :x2="dns.cx" y2="78" :class="['edge', { on: dnsActive(dns.id) }]" :style="edgeStyle(dnsActive(dns.id), dns.id)" :marker-end="marker(dnsActive(dns.id), dns.id)" />
    <line v-for="e in dnsToServer()" :key="e.key" :x1="e.x1" y1="122" :x2="e.x2" y2="182" :class="['edge', { on: e.on }]" :style="edgeStyle(e.on, e.color)" :marker-end="marker(e.on, e.color)" />

    <g v-if="failed()" class="cross">
      <template v-if="fail === 'server'">
        <line x1="50" y1="180" x2="160" y2="232" />
        <line x1="160" y1="180" x2="50" y2="232" />
        <text x="105" y="212" class="pill-text halo">サーバー</text>
        <rect x="70" y="236" width="70" height="28" rx="14" class="cross-badge" />
        <text x="105" y="256" class="cross-text">障害</text>
      </template>
      <template v-else>
        <line x1="50" y1="76" x2="160" y2="128" />
        <line x1="160" y1="76" x2="50" y2="128" />
        <text x="105" y="108" class="pill-text halo">Route 53</text>
        <rect x="0" y="140" width="64" height="28" rx="14" class="cross-badge" />
        <text x="32" y="160" class="cross-text">障害</text>
      </template>
    </g>
  </svg>
</template>

<style scoped>
.fig {
  display: block;
  width: 420px;
  margin: 0 auto;
  overflow: visible;
}

.user {
  fill: #ffffff;
  stroke: var(--ink);
  stroke-width: 1.5;
}

.name {
  font-size: 16px;
  font-weight: 900;
  text-anchor: middle;
  fill: #ffffff;
}

.pill {
  fill: #ffffff;
  stroke: #c3cad1;
  stroke-width: 2.5;
}

.pill-text {
  font-size: 16px;
  font-weight: 700;
  text-anchor: middle;
  fill: var(--ink);
}

.edge {
  stroke: #c3cad1;
  stroke-width: 1.5;
  stroke-dasharray: 4 4;
}

.edge.on {
  stroke-width: 2.5;
  stroke-dasharray: none;
}

.down {
  opacity: 0.35;
}

.cross line {
  stroke: var(--ink);
  stroke-width: 8;
  stroke-linecap: round;
}

.cross-badge {
  fill: var(--ink);
}

.cross-text {
  font-size: 15px;
  font-weight: 900;
  text-anchor: middle;
  fill: #ffffff;
}

.halo {
  fill: #9a9a9a;
  stroke: #ffffff;
  stroke-width: 6px;
  stroke-linejoin: round;
  paint-order: stroke;
}
</style>
