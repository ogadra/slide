---
theme: purplin
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# some information about your slides (markdown enabled)
title: CloudflareだけでWebアプリを作成してみた
date: '2025/03/14'
event: 'Cloudflare Meet-up Tokyo Vol.7'
eventLink: 'https://cfm-cts.connpass.com/event/344633/'
info: CloudflareだけでWebアプリを作成してみた
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
h2 {
  padding-top: 30px;
}
</style>

# Cloudflareだけで
# Webアプリを
# 作成してみた
## おがどら

---
layout: image-x
image: https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif
imageOrder: 2
---

# おがどら

座右の銘は<br/>
Done is better than perfect.

好きな言語 : Typescript, Go

右のアイコンは<br/>
自宅サーバーに置いて、<br/>
Cloudflare Tunnelで公開しています

---

<style>
h2 {
  font-size: 2.25rem !important;
  padding: 0 !important;
}
</style>

## こんなアプリケーションを作りました

<img
  src="./imgs/mogami-lp.png"
  class="w-132 m-auto"
  alt="もがみシステムのトップページ"
/>

---

## システム概要

- クイズを出題、解答できるアプリ
  - リアルタイム解答、集計
- 数百人規模に対応
  - 250人まで負荷試験を実施
- 結果をOGPつきでツイートできる

---

## こんなアーキテクチャで動いています

<img
  src="./imgs/mogami-architecture.svg"
  class="w-144 m-auto"
  alt="Cloudflare構成図"
  style="background-color: #FFF"
/>

---

## システムのポイント

- Rules, Workersによる前処理
  - Rulesによってヘッダ付与
  - フロントエンド、WebSocket共通処理
- Durable Objectsをフル活用！
  - WebSocket通信
  - クイズ進行状況の保持

---

## Rules, Workersによる前処理

- Rulesでヘッダ付与
  - リクエスト元Port番号をRulesで付与
  - プロバイダ責任制限法に対応するため保存
- その他、Honoを用いた共通処理
  - クイズ管理画面へのアクセス制限

---

## Durable Objectsをフル活用！

- serializeAttachementによりsocketから属性を取得
- acceptWebSocketにより属性からsocketを取得
- strageに進行状況を保存・取得

---

## ユーザー接続処理

```ts {*|3-7}
const pair = new WebSocketPair();
const [client, server] = Object.values(pair);
// ソケットに情報を埋め込み
server.serializeAttachment({
  id: userId,
  name: userName,
});

this.state.acceptWebSocket(server, [
  UserType.Answerer,
  userId,
]);

```

---

## ユーザー接続処理



```ts {1,7-9}
// ソケット情報から解答者を特定
private async webSocketMessage(
    socket: WebSocket,
    rawMessage: string | ArrayBuffer,
) {
    const message = JSON.parse(rawMessage.toString());
    const user = socket.deserializeAttachment();
    console.log(user);
    // { id: userId, name: userName }
}
```

---

## ユーザー接続処理

```ts {9-12}

const pair = new WebSocketPair();
const [client, server] = Object.values(pair);
// ソケットに情報を埋め込み
server.serializeAttachment({
  id: userId,
  name: userName,
});

this.state.acceptWebSocket(server, [
  WebSocketUserType.Answerer,
  userId,
]);
```

---

## ユーザー接続処理



```ts {1,2-4|1,6-8|1,10-12}
// 属性からconnectionを特定、メッセージ送信
this.state.getWebSockets(UserType.Answerer).map((ws) => {
    this.webSocketResSend(ws, message);
}); // 解答者全員に対してメッセージを送信

this.state.getWebSockets(userId).map((ws) => {
    this.webSocketResSend(ws, message);
}); // 特定のユーザーに対してメッセージを送信

this.state.getWebSockets().map((ws) => {
    this.webSocketResSend(ws, message);
}); // 全員に対してメッセージを送信
```

---

## Durable Objects

- pros 😄
  - 安い
  - やりたいことは何でもできた
- cons 😭
  - なんでもできる
  - 神クラスが降臨されました(2000行超)

---

ご清聴ありがとうございました

- Twitter: [@const_myself](https://twitter.com/const_myself)
- GitHub: [ogadra](https://github.com/ogadra)

<PoweredBySlidev mt-10 />
