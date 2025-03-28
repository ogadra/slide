---
theme: purplin
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# some information about your slides (markdown enabled)
title: 個人開発で気をつけるべきこと
info: 個人開発で気をつけるべきこと
# apply unocss classes to the current slide
# class: text-center
colorSchema: 'dark'
# https://sli.dev/features/drawing
drawings:
  enabled: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
canvasWidth: 960
---

<style>
.slidev-layout {
  padding-top: 0 !important;
}

</style>

# 個人開発で
# 気をつけるべきこと

## ogadra

---

## 注意

- 写真撮影はご遠慮ください。

---
layout: image-x
image: https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif
imageOrder: 2
---

# ogadra

Motto: Done is better than perfect.

Favorite languages: Typescript, Go

<!--ここまで20秒-->
---

## 個人開発で気をつけるべきこととは？

<v-click><li>技術選定</li></v-click>
<v-click><li>セキュリティ</li></v-click>
<v-click><li>インフラ</li></v-click>
<v-click><li>クラウド破産</li></v-click>

---

## 否。

<v-click>
  <div class="flex flex-wrap w-full mx-auto my-20 text-9xl">
    <span class="text-center mx-auto">法律</span>
  </div>
</v-click>

---

<div>
  <img
    src="./imgs/arrest.png"
    alt="マッチングアプリ個人開発したら逮捕されかけた話"
    class="w-144 mx-auto my-2"
  />
  </div>
  <div class="flex flex-wrap w-full mx-auto">
  <span class="text-center mx-auto">https://zenn.dev/shoheiweb/articles/448e7b7c73356f</span>
</div>

---

## どんな法律があるのか

<v-click><li>電気通信事業法</li></v-click>
<v-click><li>プロバイダ責任制限法</li></v-click>
<v-click><li>特定商取引法</li></v-click>
<v-after><li>出会い系サイト規制法</li></v-after>
<v-after><li>古物営業法</li></v-after>
<v-after><li>医薬品医療機器等法...</li></v-after>

---

## その中でも関わる人が多そうな

<li>電気通信事業法</li>
<li>プロバイダ責任制限法</li>

について解説します

<!--ここまで1分30秒-->
---

## さて、クイズです

<img
    src="./imgs/quiz-qr.png"
    alt="クイズアプリのQRコード"
    class="w-72 mx-auto my-2"
  />
  

---

## ここで軽く個人開発の紹介

- クイズを出題、解答できるアプリ
  - リアルタイム解答、集計
- 数百人規模に対応
- 結果をOGPつきでツイートできる

<!--2分40秒まで待って良い-->
---

## 第1問

LINEやメッセンジャーのような「クローズドチャット」アプリを公開する場合、法令上どこに届け出を行う必要があるでしょうか？

<!--ここまで3分10秒-->
---

## 補足

再提出に備え、大体1ヶ月くらい前に提出しましょう。

間違っても「ここ修正してね」とわかりやすく通知されるので、臆せず出しましょう。

<!--ここまで3分30秒-->
---

## 第2問

2ちゃんねるやTwitterのような「オープンチャット」アプリを公開する場合、誹謗中傷による発信者開示請求に備えて投稿元の情報を保存することがプロバイダ責任制限法で求められています。

このときプロバイダが保存すべき情報は、接続元IPアドレス、投稿時のタイムスタンプ、そしてあとひとつは何でしょう？

<!--ここまで4分00秒. シンキングタイム30秒-->
---

## プロ責法の要件を満たすインフラ構成

<div class="flex m-2">
  <img src="./imgs/ng.svg" alt="プロバイダ責任制限法の要件を満たせないインフラ構成。APIGatewayを用いている。" class="w-96">
  <div class="w-80 my-auto mx-2 my-0">
    APIGatewayを用いる場合、<br/>
    プロバイダ責任制限法の要件を満たすための情報を取得できない。
  </div>
  
</div>

<div class="flex mx-2 my-4">
  <img src="./imgs/ok.svg" alt="プロバイダ責任制限法の要件を満たせるインフラ構成。CloudFrontを用いている。" class="w-96">
  <div class="w-80 my-auto mx-2 my-0">
    CloudFrontを用いる場合、<br/>
    プロバイダ責任制限法の要件を満たすために十分な情報を取得できる。
  </div>
</div>

<!--ここまで4分30秒-->
---

## まとめ

個人開発をする際は、法律に気をつける必要があります。<br/>

法律を意識したスケジュール・アーキテクチャを考えて開発しましょう。

<!--ここまで4分45秒-->
---
layout: image-x
image: https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif
imageOrder: 2
---

ご清聴ありがとうございました

- Twitter: [@const_myself](https://twitter.com/const_myself)
- GitHub: [ogadra](https://github.com/ogadra)

<PoweredBySlidev mt-10 />
