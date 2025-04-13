---
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# some information about your slides (markdown enabled)
title: hono-remix-adapter使ってみた
info: hono-remix-adapter使ってみた
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
lang: ja
---

<style>
.slidev-layout {
  padding-top: 0 !important;
}

</style>

# hono-remix-adapter使ってみた
## おがどら

---

## 🎉 yusukebe/hono-remix-adapter 🎉
<img src="./imgs/hono-remix-adapter-releases.png" width="600px" />

<p class="text-center">
ついでにコントリビュートしました
</p>
---

## 作ったサービス
<img src="./imgs/mogami.png" width="600px" />

<p class="text-center">
  <a href="https://mogami.live">
    https://mogami.live
  </a>
</p>
---

## 技術スタック (インフラ)

- Cloudflare Workers
  - Service bindings
- Durable Objects
- D1
- R2

---

## 技術スタック (アプリ)

- Remix
- Hono
- Drizzle
- shadcn/ui
- satori

---

## インフラ構成図

<img src="./imgs/cloudflare-architecture.png" width="700px" />

---

## Honoで処理していること

- RemixのAction / Loaderの責務に当てはまらないものをHonoで処理
  - Durable Objectsの呼び出し
      - WebSocket接続に必要
  - 別Workerへのリクエスト
      - Service bindings
  - 静的ファイルの配信

---

## HonoとRemixを動かした感想

- PagesではなくWorkersで良かった、と思う
  - Durable ObjectsはPagesでは使えない
  - 簡単に同一ドメインでAPIを提供できる
- 最初は手探りだったが、整ってきている
  - hono-remix-adapterを今日適用した
  - それまでは自前で書いていた
  - これからの発展が楽しみ

---

## hono-remix-adapterの良いところ

- 簡単にHonoの上でRemixが動かせた
  
---

## ここから望むところ

<img width="500px" src="./imgs/hono-remix-adapter-pull-24.png" />

<p class="text-center">
Issue書いたらLT前日にPR上がっていました🙏 ありがとうございます🙏
</p>

---

## 今後はここを頑張りたい

- テストコードを書く
  - Durable Objects / WebSocketのテスト
  - DOがミュータブルなので慣れていない
  - WebSocketの知見が少ない

---

## まとめ

Cloudflareでフルスタックアプリは作れる。<br />
お財布に優しいので、個人開発にオススメ。

---

<div class="h-full mt-4 grid">
<div class="my-auto flex">
  <div class="w-1/2 flex flex-col justify-center text-left justify-start">
    <p>ご清聴ありがとうございました</p>
    <ul>
      <li>Twitter: <a href="https://twitter.com/const_myself" target="_brank" rel="noopener noreferrer">@const_myself</a></li>
      <li>GitHub: <a href="https://github.com/ogadra" target="_brank" rel="noopener noreferrer">ogadra</a></li>
    </ul>
  </div>
  <div class="w-1/2 flex justify-center items-center p-8 max-h-md object-cover">
    <img src="https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif" class="rounded-2xl border-image h-full object-cover">
  </div>
</div>
</div>
