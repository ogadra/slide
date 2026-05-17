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
  mono: 'JetBrains Mono'
  weights: '500,700,900'
  provider: google
---

<HudTitleSlide
  title='GitHub運用を<br/><span class="hud-green">地盤改良</span>する'
  subtitle='ナンパはダメよ<span class="hud-red">路上LT会</span> - 2026-05-18 (Mon) Tokyo, Japan'
  speaker="おがどら"
/>

---

<HudHookSlide />

---

<HudPivotSlide
  question='アプリ開発者の自分には<br/>関係ない？'
  answer='いいえ、<span class="hud-orange">GitHub</span> も<br/>Terraform で管理できます'
  :bullets="[
    'IaC = サーバーやサービスの設定を<span class=&quot;hud-green&quot;>コードで書く</span>',
    '「画面ポチポチ」ではなくコードで宣言的に記述',
    'コードと実環境を比較し、差分があればAPIでリソースを変更',
  ]"
/>

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

```hcl {5}
resource "github_repository" "slide" {
  name                   = "slide"
  visibility             = "public"
  has_issues             = true
  delete_branch_on_merge = true
}
```

</template>

<template #note>

**▸ これだけ**

設定をコードで宣言。<br/>
`delete_branch_on_merge`<br/>
など、忘れがちな設定も<br/>
最初から一括適用。

</template>

</HudCodeSlide>

---

<HudCodeSlide
  resource="for_each"
  file-note="// 複数リポを一括生成"
  :commands="[
    { cmd: '$ terraform plan', result: '+3 to add', tone: 'orange' },
    { cmd: '$ terraform apply', result: '3 applied', tone: 'green' },
  ]"
>

<template #code>

```hcl {2,6}
locals {
  repos = [ "repo1", "repo2", "repo3" ]
}

resource "github_repository" "repos" {
  for_each   = toset(local.repos)
  name       = each.value
}
```

</template>

<template #note>

**▸ 一括展開**

同じ設定を使い回すなら<br/>
`for_each` で展開。<br/>
リポジトリ追加・削除も<br/>お手の物。

</template>

</HudCodeSlide>

---

<HudBenefitsSlide
  title="BENEFITS / 何が嬉しい？"
  :benefits="[
    { id: 'B-01', title: '同じ設定を<br/>すぐ作成', code: 'BRANCH PROTECT / etc.', before: '画面ポチポチで毎回手作業、設定漏れも起きがち', after: 'コードを使い回し、ブランチ保護まで最初から一括適用' },
    { id: 'B-02', title: '設定ミスを<br/>静的解析で防止', code: 'TFLINT / VALIDATE', before: 'うっかり Public 化など、事故ってから気付く', after: 'apply 前に lint / validate で危ない設定を検出' },
    { id: 'B-03', title: 'PRだけで<br/>承認フローが完結', code: 'PULL REQUEST', before: '管理者にリポ作成を申請して、Slackで待つ', after: 'PRを出してレビュー → applyで誰でも作れる' },
  ]"
/>

---

<HudConclusionSlide
  from-text="LEARN TERRAFORM with CLOUD"
  to-text="LEARN with GitHub"
  :actions="[
    'みんな触り慣れたGitHubでplan / applyが試せる',
    'リポジトリ管理の効率化とTerraform学習が一石二鳥',
  ]"
/>

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
  about='座右の銘は<br/><span class="motto">Done is better than perfect.</span>'
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

<HudOutroSlide
  :links="[
    { label: 'SPEAKER', value: 'おがどら' },
    { label: 'SLIDE', value: 'slide.ogadra.com' },
    { label: 'GITHUB', value: 'github.com/ogadra' },
    { label: 'TWITTER', value: '@const_myself' },
  ]"
  qr-url="slide.ogadra.com"
/>
