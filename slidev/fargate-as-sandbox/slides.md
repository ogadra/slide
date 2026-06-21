---
theme: default
title: FargateをSandboxとして使う
info: AWS Fargateをサンドボックス環境として活用する
colorSchema: 'light'
drawings:
  enabled: false
transition: none
defaults:
  transition: none
mdc: true
canvasWidth: 1280
fonts:
  sans: 'Noto Sans JP'
  mono: 'JetBrains Mono'
  display: 'Antonio'
  weights: '400,700,900'
  provider: google
---

<TitleCard
  title-ja="FargateをSandboxとして使う"
  subtitle="AWSぶっとんだ使い方発表会 / 2026-06-22 (Mon) / 渋谷"
  speaker="おがどら / @const_myself"
/>

---

<CaseOpenerSlide
  case-no="001"
  case-name="1人1コンテナで環境を隔離"
  case-name-display="1人1コンテナで<br/>環境を隔離"
/>

---

<StatementSlide case-no="001" case-name="1人1コンテナで環境を隔離">

前のコマンドの状況を保持して、

次のコマンドを受け付ける必要がある

`Statefull Application`

<span class="arrow">→</span>ALBのSticky Sessionを使うのが一般的

</StatementSlide>

---

<CalloutSlide case-no="001" case-name="1人1コンテナで環境を隔離" tone="threat">

だが、他のユーザーのコマンドに影響を受けてほしくない

</CalloutSlide>

---

<StatementSlide case-no="001" case-name="1人1コンテナで環境を隔離">

ALBのSticky Sessionでは

負荷分散はできるが、

1セッション1コンテナという

割り振りはできない

</StatementSlide>

---

<ResolutionSlide case-no="001" case-name="1人1コンテナで環境を隔離" headline="Goでフルスクラッチで作成する">

実行コンテナとcookieの組み合わせを

Dynamo DBに保存しておき、

リクエストが来たらプロキシしてあげる

</ResolutionSlide>

---

<AftermathSlide
  case-no="001"
  case-name="1人1コンテナで環境を隔離"
  :notes="[
    { id: 'FIELD NOTE 001 / a', text: '1人1コンテナ立ち上げないといけない' },
    { id: 'FIELD NOTE 001 / b', text: '初めてクォータ制限解除のリクエストを投げた' },
  ]"
/>

---

<CaseOpenerSlide
  case-no="002"
  case-name="プロバイダ責任制限法に基づいたログ管理"
  case-name-display="プロバイダ責任制限法に<br/>基づいたログ管理"
/>

---

<CalloutSlide case-no="002" case-name="プロバイダ責任制限法に基づいたログ管理" tone="threat">

`curl`で爆破予告されたら、どうする!?

</CalloutSlide>

---

<ResolutionSlide case-no="002" case-name="プロバイダ責任制限法に基づいたログ管理" headline="コマンドログを残す">

「この爆破予告したのはIPアドレスこいつ」

と言えるようにする

</ResolutionSlide>

---

<AftermathSlide
  case-no="002"
  case-name="プロバイダ責任制限法に基づいたログ管理"
  :notes="[
    { id: 'FIELD NOTE 002 / a', text: 'タイムスタンプ、IPアドレス、ポート番号、投稿内容を保存' },
    { id: 'FIELD NOTE 002 / b', text: 'ログの削除保護を有効化' },
  ]"
/>

---

<CaseOpenerSlide
  case-no="003"
  case-name="本番動かなきゃ<br/>意味がない。"
/>

---

<StatementSlide case-no="003" case-name="本番動かなきゃ意味がない。">

ここまで頑張って準備して、

`ap-northeast-1`が

死んだらおじゃんですよね

</StatementSlide>

---

<BunshinDiagram
  case-no="003"
  case-name="本番動かなきゃ意味がない。"
  source="github.com/ogadra/bunshin"
/>

---

<StatementSlide case-no="003" case-name="本番動かなきゃ意味がない。" kind="AFTERMATH">

CloudFrontでは

primary / secondaryの振り分けができるが、

region毎のロードバランス等は難しい

<span class="arrow">→</span>Global Acceleratorによるリージョン分散

</StatementSlide>

---

<StatementSlide case-no="003" case-name="本番動かなきゃ意味がない。" kind="AFTERMATH">

東京のsandboxで動いているのに

大阪のALBにリクエストが飛んでしまった

<span class="arrow">→</span>nginxで検知、別リージョンへproxy

</StatementSlide>

---

<SummaryCard
  :cases="[
    { no: '001', tag: 'isolation', title: '1人1コンテナで環境を隔離' },
    { no: '002', tag: 'compliance', title: 'プロバイダ責任制限法に基づいたログ管理' },
    { no: '003', tag: 'multi-region', title: '気合いのマルチリージョン' },
  ]"
/>

---

<OutroCard
  name="おがどら"
  handle="@const_myself"
  avatar="https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif"
  :links="[
    { label: 'SLIDE',   value: 'slide.ogadra.com' },
    { label: 'GITHUB',  value: 'github.com/ogadra' },
    { label: 'TWITTER', value: '@const_myself' },
  ]"
/>
