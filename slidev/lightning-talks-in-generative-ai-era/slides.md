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

---

<StatementSlide>
このイベントは<br/>
大吉祥寺<span class="accent">.pm</span>ですよね？
</StatementSlide>

---

<StatementSlide>
今日、<span class="accent">Perl</span>の話ありました？
</StatementSlide>

---


<SectionOpener no="demo" >
さあ、<br/>
<span class="accent">Perl</span>を<br/>
書こう
</SectionOpener>

---

<StatementSlide>
というわけで、<br/>
Perlを書いてもらいました
</StatementSlide>

---

<StatementSlide>
このデモでは、<br/>
どんな工夫が<br/>
されていたのでしょうか？
</StatementSlide>

---

<ProblemActionSlide>
  <template #problem>
    会場のネットワークが<span class="accent">貧弱</span>
  </template>
  <template #action>
    <v-click>
      フロントエンドの<br/>
      <span class="accent">高速化</span>
    </v-click>
  </template>
</ProblemActionSlide>

---

<ProblemActionSlide>
  <template #problem>
    会場のネットワークが<span class="accent">貧弱</span>
  </template>
  <template #action>
    ランタイム依存<span class="accent">ゼロ</span>
  </template>
</ProblemActionSlide>

---

<ProblemActionSlide>
  <template #problem>
    みんなにPerlを<span class="accent">動かして</span>もらいたい
  </template>
  <template #action>
    <v-click><span class="accent">1人1コンテナ</span>を配布</v-click>
  </template>
</ProblemActionSlide>

---

<ProblemActionSlide>
  <template #problem>
    みんなにPerlを<span class="accent">動かして</span>もらいたい
  </template>
  <template #action>
    ECS Fargateを<br/>
    <span class="accent">いっぱい</span>用意
  </template>
</ProblemActionSlide>

---

<ProblemActionSlide>
  <template #problem>
    みんなにPerlを<span class="accent">動かして</span>もらいたい
  </template>
  <template #action>
    AWSに<br/>
    <span class="accent">クォータ引き上げ</span><br/>
    を依頼
  </template>
</ProblemActionSlide>

---


<ProblemActionSlide>
  <template #problem>
    当日<span class="accent">障害</span>が起きたら？
  </template>
  <template #action>
    <v-click><span class="accent">東京と大阪に</span><br/>展開</v-click>
  </template>
</ProblemActionSlide>

---

<ArchitectureSlide />

---

<StatementSlide>
たった5分のために？
</StatementSlide>

---

<StatementSlide>
<span class="accent">YES.</span><br/>

生成AIが<br/>
可能にしてくれます
</StatementSlide>

---

<ProblemActionSlide>
  <template #problem>
    なぜそんなに<span class="accent">こだわる</span>のか
  </template>
  <template #action>
    <v-click>
      みなさんを満足させる<br/>
      <span class="accent">責任</span>が<br/>
      あるから
    </v-click>
  </template>
</ProblemActionSlide>

---

<StatementSlide>
生成AIで資料作成が<br/>
楽になったと感じたとき、<br/>
それは<span class="accent">聴衆</span>を<br/>
意識していますか？
</StatementSlide>

---

<StatementSlide>
生成AIを効率化ツールとして<br/>
使うのではなく、<br/>
<span class="accent">可能性を拡張</span>するために<br/>
使いませんか？
</StatementSlide>

---

<StatementSlide>
登壇準備は<br/>
<span class="accent">変わっても、</span><br/>
聴衆に対する想いは<br/>
<span class="accent">変わらない</span>
</StatementSlide>

---

<StatementSlide>
それが<span class="accent">LT</span>
</StatementSlide>

---

<StatementSlide>
ここで一句
</StatementSlide>

---

<HaikuSlide :lines="['変わらない', '熱い想いと', 'その責任']" />

---

<ProfileSlide
  name="おがどら"
  avatar="https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif"
  :lines="['twitter.com/const_myself', 'github.com/ogadra', 'slide.ogadra.com']"
/>
