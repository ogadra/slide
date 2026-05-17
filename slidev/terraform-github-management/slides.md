---
theme: default
title: GitHub運用を地盤改良する
info: GitHubリポジトリをTerraformでIaC管理する
colorSchema: 'light'
drawings:
  enabled: false
transition: none
mdc: true
canvasWidth: 1280
fonts:
  sans: 'Noto Sans JP'
  serif: 'Bodoni Moda'
  mono: 'JetBrains Mono'
  weights: '500,700,900'
  provider: google
topStatus:
  - { text: '● REC 2026-05-18T18:30 JST' }
  - { text: '▲ STATUS: ONLINE', tone: 'green' }
  - { text: 'SIGNAL ████████░ 87%' }
  - { text: '⚠ WARNING', tone: 'red' }
---

<HudTitleSlide
  title='GitHub運用を<br/><span class="hud-green">地盤改良</span>する'
  subtitle='ナンパはダメよ<span class="hud-red">路上LT会</span> - 2026-05-18 (Mon) Tokyo, Japan'
  speaker="おがどら"
  :meta="['GITHUB × TERRAFORM', 'LT-005', 'DURATION 00:05:00']"
  :metrics="[
    { label: 'REPOS', value: '014', percent: 70 },
    { label: 'BRANCHES', value: '062', percent: 85, tone: 'green' },
    { label: 'IAC COV', value: '87%', percent: 87, tone: 'green' },
  ]"
  :resources="[
    { name: 'github_repository', status: 'READY', tone: 'green' },
    { name: 'github_branch_protection', status: 'READY', tone: 'green' },
    { name: 'github_team', status: 'READY', tone: 'green' },
    { name: 'github_repository_collaborator', status: 'DRIFT', tone: 'red' },
    { name: 'github_actions_secret', status: 'READY', tone: 'green' },
    { name: 'github_membership', status: 'SYNC', tone: 'orange' },
  ]"
/>

---
topStatus:
  - { text: 'CHAPTER 02 / IDENTIFY' }
  - { text: '▲ HANDSHAKE COMPLETE', tone: 'green' }
  - { text: 'UPTIME: 00:00:42' }
  - { text: 'SPEAKER PROFILE' }
---

<HudIntroSlide
  name="おがどら"
  handle="@const_myself"
  initial="O"
  :profile="[
    { label: 'ROLE', value: 'Web Developer' },
    { label: 'BASE', value: 'Tokyo / Japan' },
    { label: 'TZ', value: 'Asia/Tokyo' },
  ]"
  about='座右の銘は<br/><span class="motto">Done is better than perfect.</span><br/><br/>Claude Code Maxプラン契約中<br/>1日198コミット達成歴あり'
  :stats="[
    { label: 'COMMITS', value: '2,847', percent: 92 },
    { label: 'PR REVIEWS', value: '481', percent: 67, tone: 'green' },
    { label: 'SLIDES', value: '015', percent: 45 },
  ]"
  :stack="[
    { name: 'TypeScript', status: 'DAILY', tone: 'green' },
    { name: 'Remix / React', status: 'DAILY', tone: 'green' },
    { name: 'Cloudflare', status: 'DAILY', tone: 'green' },
    { name: 'Hono', status: 'DAILY', tone: 'green' },
    { name: 'Terraform', status: 'FOCUS', tone: 'orange' },
    { name: 'Claude Code', status: 'DAILY', tone: 'green' },
  ]"
/>

---
topStatus:
  - { text: '⚠ ALERT LEVEL: HIGH', tone: 'red' }
  - { text: 'CODE: GROUND-SUBSIDENCE', tone: 'red' }
  - { text: 'DETECTED 14 REPOS' }
  - { text: '● RECORDING', tone: 'red' }
---

<HudAlertSlide
  :sensors="[
    { label: 'BRANCH PROTECT', value: 'FAIL', percent: 24, tone: 'red' },
    { label: '2FA REQUIRED', value: 'WARN', percent: 58, tone: 'orange' },
    { label: 'SECRET SCAN', value: 'OK', percent: 95, tone: 'green' },
    { label: 'DRIFT DETECT', value: 'FAIL', percent: 12, tone: 'red' },
  ]"
  :timeline="[
    { time: 'T-90d', text: '新リポ追加' },
    { time: 'T-60d', text: '設定漏れ発覚' },
    { time: 'T-30d', text: 'DRIFT検出', tone: 'orange' },
    { time: 'T-7d', text: '事故発生', tone: 'red' },
  ]"
  now-text="→ ACT"
  :symptoms="[
    'ブランチ保護がリポごとにバラバラ',
    'Settings画面を手作業',
    '誰が何を変えたかわからない',
    '新リポ作るたびに再設定',
  ]"
  recommended-action='RECOMMENDED ACTION → <span class="hud-green">INFRASTRUCTURE AS CODE</span>'
>
  <template #message>GitHub運用、<br/><span class="hud-red">地盤沈下</span>していませんか？</template>
</HudAlertSlide>

---
topStatus:
  - { text: 'CHAPTER 04 / SYMPTOMS' }
  - { text: 'SCAN MODE: ACTIVE' }
  - { text: 'FOUND: 4 PATTERNS' }
  - { text: '▲ ATTENTION', tone: 'orange' }
---

<HudPatternSlide
  title='こんな"あるある"、ありませんか'
  :patterns="[
    { no: '01', title: 'バラバラ設定', code: 'BRANCH-PROTECT-INCONSISTENT', body: 'ブランチ保護ルールが<br/>リポジトリごとにバラバラ', freq: 'HIGH', severity: '8/10', tone: 'red' },
    { no: '02', title: 'ポチポチ運用', code: 'MANUAL-CLICKS-FOREVER', body: 'Settings画面を<br/>毎回手作業でポチポチ', freq: 'HIGH', severity: '7/10', tone: 'red' },
    { no: '03', title: '変更追跡不能', code: 'NO-AUDIT-LOG', body: '誰がいつ何を変えたか<br/>履歴が追えない', freq: 'MID', severity: '6/10', tone: 'orange' },
    { no: '04', title: '再現性ゼロ', code: 'NO-REPRODUCIBILITY', body: '新リポを作るたびに<br/>同じ設定を一から再現', freq: 'MID', severity: '5/10', tone: 'orange' },
  ]"
/>

---
topStatus:
  - { text: 'FILE: github.tf' }
  - { text: '▲ FMT: OK', tone: 'green' }
  - { text: 'SIZE: 287 bytes' }
  - { text: 'UTF-8' }
---

<HudCodeSlide
  resource="github_repository"
  file-note="// 1ファイル / 1リポジトリ"
  :commands="[
    { cmd: '$ terraform fmt', result: 'OK', tone: 'green' },
    { cmd: '$ terraform validate', result: 'OK', tone: 'green' },
    { cmd: '$ terraform plan', result: '+1 to add', tone: 'orange' },
    { cmd: '$ terraform apply', result: 'applied', tone: 'green' },
  ]"
>

<template #code>

```hcl
resource "github_repository" "slide" {
  name       = "slide"
  visibility = "public"
  has_issues = true
  has_wiki   = false
}

# terraform apply で反映
```

</template>

<template #note>

**▸ ポイント**

設定はぜんぶコードで宣言。
差分は `terraform plan` で
レビュー可能になる。

</template>

</HudCodeSlide>

---
topStatus:
  - { text: 'CHAPTER 06 / BENEFITS' }
  - { text: '▲ OUTCOMES', tone: 'green' }
  - { text: 'SCORE: +28pts' }
  - { text: 'VERIFIED' }
---

<HudBenefitsSlide
  title="BENEFITS / 何が嬉しい？"
  :benefits="[
    { id: 'B-01', icon: '+', title: 'コードで<br/>レビュー', code: 'PULL REQUEST', note: '変更が必ずPRを通る' },
    { id: 'B-02', icon: '↻', title: '変更履歴が<br/>gitに残る', code: 'GIT BLAME', note: '誰が何を変えたか分かる' },
    { id: 'B-03', icon: '⇈', title: '全リポへ<br/>一括適用', code: 'BULK APPLY', note: 'for_each で展開' },
    { id: 'B-04', icon: '∞', title: '新リポも<br/>コピペ再現', code: 'REPRODUCIBLE', note: 'module化で雛形に' },
  ]"
/>

---
topStatus:
  - { text: 'CHAPTER 07 / CONCLUSION' }
  - { text: '▲ FINAL DECISION', tone: 'green' }
  - { text: 'CONFIDENCE: 99%' }
  - { text: 'EXECUTE', tone: 'green' }
---

<HudConclusionSlide
  from-text="MANUAL OPERATION"
  to-text="INFRA AS CODE"
  :actions="[
    '既存リポは <code>terraform import</code> で吸い上げ',
    'PRレビュー文化に乗せる',
  ]"
/>

---
topStatus:
  - { text: '▲ SESSION COMPLETE', tone: 'green' }
  - { text: 'DURATION: 00:05:00' }
  - { text: 'THANK YOU' }
  - { text: '● END OF FILE', tone: 'green' }
---

<HudOutroSlide
  :links="[
    { label: 'SPEAKER', value: 'おがどら' },
    { label: 'SLIDE', value: 'slide.ogadra.com' },
    { label: 'GITHUB', value: 'github.com/ogadra' },
    { label: 'TWITTER', value: '@const_myself' },
  ]"
  qr-url="slide.ogadra.com"
/>
