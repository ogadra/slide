---
theme: default
title: 生成AI時代におけるLTの在り方
info: 大吉祥寺.pm 2026
colorSchema: 'light'
drawings:
  enabled: false
transition: none
defaults:
  transition: none
  layout: default
mdc: true
canvasWidth: 1920
fonts:
  sans: 'IBM Plex Sans JP'
  mono: 'JetBrains Mono'
  serif: 'Yuji Mai'
  weights: '400,500,700'
  provider: google
---

<TitleSlide
  :lines="['生成AI時代に', 'おける']"
  accent="LTの在り方"
  speaker="おがどら"
  event="大吉祥寺.pm 2026"
/>

<!--
タイトル。生成AI時代におけるLTの在り方 / おがどら / 大吉祥寺.pm 2026。
-->

---

<ThemeSlide />

<!--
配色とタイポの設計。ロゴ由来の暖色一本。
-->

---

<SectionOpener no="01" title="見出しサンプル" />

<!--
サンプル：セクション扉。番号＋見出しのみ。
-->

---

<StatementSlide>
ここに<span class="accent">大きな見出し</span>の<br/>サンプルが入ります
</StatementSlide>

<!--
サンプル：一言ドカン。見出しだけ、余白で見せる。
-->

---

<TwoColumnSlide
  title="見出しサンプル"
  heading-a="小見出しA"
  heading-b="小見出しB"
  :items-a="['箇条書きサンプル 1', '箇条書きサンプル 2', '箇条書きサンプル 3']"
  :items-b="['箇条書きサンプル 1', '箇条書きサンプル 2', '箇条書きサンプル 3']"
/>

<!--
サンプル：対比。カード無し、余白と罫線だけ。
-->

---

<CodeSlide title="見出しサンプル">
<div><span class="cm"># sample code</span></div>
<div><span class="kw">use</span> strict;</div>
<div><span class="kw">my</span> $sample = <span class="str">"sample text"</span>;</div>
<div><span class="kw">print</span> <span class="str">"$sample\n"</span>;</div>
</CodeSlide>

<!--
サンプル：コード見せ。フラットなブロック。
-->

---

<HaikuSlide :lines="['上の句と', '中の句入れる', '下の句に']" />

<!--
締めは5-7-5、縦書き。ロゴは左下。
-->
