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

<HudHookSlide
  :words="[
    { jp: '路上', ascii: 'STREET', tone: 'orange' },
    { jp: '大地', ascii: 'GROUND' },
    { jp: 'Terra', ascii: 'TERRA', tone: 'green' },
    { jp: 'Terraform', ascii: 'TERRAFORM', tone: 'green' },
  ]"
/>

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
    { id: 'B-01', title: '同じ設定を<br/>すぐ作成', before: '画面ポチポチで毎回手作業、設定漏れも起きがち', after: 'コードを使い回し、ブランチ保護まで最初から一括適用' },
    { id: 'B-02', title: '設定ミスを<br/>静的解析で防止', before: 'うっかり Public 化など、事故ってから気付く', after: 'apply 前に lint / validate で危ない設定を検出' },
    { id: 'B-03', title: 'PRだけで<br/>承認フローが完結', before: '管理者にリポ作成を申請して、Slackで待つ', after: 'PRを出してレビュー → applyで誰でも作れる' },
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

<HudClosingSlide
  name="おがどら"
  handle="@const_myself"
  avatar="https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif"
  :profile="[
    { label: 'ROLE', value: 'Web Developer' },
    { label: 'BASE', value: 'Tokyo / Japan' },
    { label: 'TZ', value: 'Asia/Tokyo' },
  ]"
  :links="[
    { label: 'SPEAKER', value: 'おがどら' },
    { label: 'SLIDE', value: 'slide.ogadra.com' },
    { label: 'GITHUB', value: 'github.com/ogadra' },
    { label: 'TWITTER', value: 'twitter.com/const_myself' },
  ]"
/>
