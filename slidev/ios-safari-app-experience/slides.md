---
theme: purplin
title: Safariでもネイティブアプリの触り心地を実現したい！
info: Safariでもネイティブアプリの触り心地を実現したい！
colorSchema: 'dark'
drawings:
  enabled: false
transition: slide-left
mdc: true
canvasWidth: 960
---

<style>
.slidev-layout {
  padding-top: 0 !important;
}

</style>

# Safariでもネイティブアプリの触り心地を
# 実現したい！
## ogadra

---
layout: image-x
image: https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif
imageOrder: 2
---

# ogadra

Motto: Done is better than perfect.

Favorite languages: TypeScript, Go

---

### スマホブラウザ対応と聞いて思い浮かべるもの

- Width / Heightが変わっても動く「レスポンシブデザイン」
- input要素のfont-sizeを16px以上にする
  - iOSブラウザでの意図せぬズームを防ぐ


<v-click>
  <div class="text-center text-4xl font-bold mt-16">
    それだけじゃない！という話をします
  </div>
</v-click>

---

### デモページ


<img
  src="./imgs/demo.png"
  alt="デモページのURLをQRコード画像にしたもの"
  style="height: 300px; margin-top: 40px;"
/>

<div class="text-center">

  [https://slide.ogadra.com/demo/ios-safari-app-experience](https://slide.ogadra.com/demo/ios-safari-app-experience)
</div>

---

### チャットアプリのようなUI

- 画面下部に入力欄 / 送信ボタンがある
  - Focusするとスマホではキーボードが出る
    - キーボードがあるときは入力欄がせり上がる
  - Focus解除でキーボード解除
- Header / Form部分を除いた部分がスクロール可能

---

### 一見誰でも作れそうなUIですが…

<v-click>
  <div class="text-center text-6xl font-bold mt-36">
    落とし穴がいっぱい！
  </div>
</v-click>

---

#### 1: `position: fixed;`


---

#### 2: `position: absolute;` + `height: calc(100vh - footer)`


---

#### 3: `position: absolute;` + Viewport API


---

#### 4: `position: absolute;` + Viewport API + meta viewport


---
layout: image-x
image: https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif
imageOrder: 2
---


### ありがとうございました

- Twitter: [@const_myself](https://twitter.com/const_myself)
- GitHub: [ogadra](https://github.com/ogadra)

<PoweredBySlidev mt-10 />

