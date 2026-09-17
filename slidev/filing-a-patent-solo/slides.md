---
theme: default
title: '個人で特許取ってみた'
date: '2026/09/10'
event: 'エンジニア 高い買い物LT会'
eventLink: 'https://gitanda-hub.connpass.com/event/404315/'
info: '個人で特許取ってみた'
colorSchema: 'dark'
drawings:
  enabled: false
transition: none
defaults:
  transition: none
  layout: default
mdc: true
canvasWidth: 1920
fonts:
  sans: 'Zen Kaku Gothic New'
  mono: 'JetBrains Mono'
  weights: '400,500,700,900'
  provider: google
---

<TitleSlide
  :lines="['個人で', '特許', '取ってみた']"
  speaker="おがどら"
/>

---

<DefinitionSlide
  heading="特許発明とは何か"
  :items="[
    { term: '発明とは', body: '自然法則を利用した技術的思想の創作のうち高度のもの' },
    { term: '特許発明とは', body: '特許を受けている発明' },
  ]"
/>

<Source
  label="特許法 第二条（e-Gov 法令検索）"
  url="https://laws.e-gov.go.jp/law/334AC0000000121"
/>

---

<BulletSlide>
<h2>特許を取得するための要件</h2>

- 産業上利用できること
- 新規性があること
- 進歩性があること
- 他人に先に出願されていないこと
- 特許を受けることができない発明に該当しないこと

</BulletSlide>

<Source
  label="特許法とは？基本を分かりやすく解説！（契約ウォッチ）"
  url="https://keiyaku-watch.jp/media/hourei/tokkyohou_kihon/"
/>

---

<BulletSlide>
<h2>特許を取得する3ステップ</h2>

1. 先例がないか調査する
2. 明細書/請求範囲を考えて提出する
3. 審査官を説得する

</BulletSlide>

---

<TimelineSlide
  heading="スケジュール"
  :items="[
    { months: 0, label: '先行技術調査を依頼' },
    { months: 1, label: '先行技術調査完了' },
    { months: 2, label: '特許出願依頼' },
    { months: 11, label: '特許出願・審査請求' },
  ]"
/>

---

<TimelineSlide
  heading="スケジュール"
  :items="[
    { months: 11, label: '特許出願・審査請求' },
    { months: 14, label: '拒絶理由通知書 受領', jpo: true },
    { months: 16, label: '手続補正書及び意見書の提出' },
    { months: 19, label: '特許査定', jpo: true },
  ]"
/>

---

<BulletSlide>
<h2>かかった金額</h2>
<p class="accent big">616,340円</p>
</BulletSlide>

---

<BulletSlide>
<h2>なぜ特許を取ったのか</h2>

- 憧れ
- 学生時代に思いついたものが特許取られていて悔しかった
- 取れると思った

</BulletSlide>

---

<BulletSlide>
<h2>大変だったこと</h2>

- 誰にも言えなかった
- 明細書に付き合う必要があった
  - 長くて特許特有の長い言い回し

</BulletSlide>

---

<ProfileSlide
  name="おがどら"
  avatar="https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif"
  :lines="['twitter.com/const_myself', 'github.com/ogadra', 'slide.ogadra.com']"
/>
