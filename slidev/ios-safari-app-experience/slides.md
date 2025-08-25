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


<div style="display: flex; align-items: center; margin: 2rem 0;">
  <div style="flex: 1; display: flex; justify-content: center; perspective: 1200px;">
    <div style="width: 300px; height: 320px; position: relative; transform: rotateX(15deg) rotateY(-20deg); transform-style: flat;">
    <div style="
      width: 100%;
      height: 100%;
      border: 4px solid #333;
      border-radius: 20px;
      background: #f8f9fa;
      position: absolute;
      box-shadow: 30px 30px 60px rgba(0,0,0,0.4);
      transform: translateZ(0px) translateX(0px);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      color: #666;
      font-weight: bold;
    ">Device Frame</div>
    <div style="
      position: absolute;
      top: 4px;
      left: 4px;
      right: 4px;
      width: calc(100% - 8px);
      height: 60px;
      background: rgba(25, 118, 210, 0.4);
      border: 1px dashed rgba(25, 118, 210, 0.7);
      transform: translateZ(-5px);
      border-radius: 16px 16px 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.6rem;
      color: #1976d2;
      font-weight: bold;
    ">Header padding area</div>
    <div style="
      position: absolute;
      top: 4px;
      left: 4px;
      right: 4px;
      height: 60px;
      background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      font-weight: bold;
      border-radius: 16px 16px 0 0;
      transform: translateX(-25px) translateY(-10px) translateZ(45px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.3);
    ">Header (position: fixed;)</div>
    <div style="
      position: absolute;
      bottom: 4px;
      left: 4px;
      right: 4px;
      width: calc(100% - 8px);
      height: 50px;
      background: rgba(244, 67, 54, 0.4);
      border: 1px dashed rgba(244, 67, 54, 0.7);
      transform: translateZ(-5px);
      border-radius: 0 0 16px 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.6rem;
      color: #f44336;
      font-weight: bold;
    ">Footer margin area</div>
    <div style="
      position: absolute;
      bottom: 15px;
      left: 9px;
      right: 9px;
      height: 50px;
      background: #ffebee;
      border: 2px solid #f44336;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: bold;
      color: #c62828;
      transform: translateX(-30px) translateY(15px) translateZ(45px);
      border-radius: 0 0 16px 16px;
      box-shadow: 0 12px 24px rgba(244,67,54,0.4);
    ">Input (position: fixed;)</div>
    </div>
  </div>
  <div style="flex: 1; font-size: 1rem;">
    <div style="margin-bottom: 240px;">
      <div style="color: #42a5f5; font-weight: bold; margin-bottom: 0.5rem;">← Header Padding Area</div>
    </div>
    <div>
      <div style="color: #ff5722; font-weight: bold; margin-bottom: 0.5rem;">← Footer Margin Area</div>
    </div>
  </div>
</div>

---

#### 2: `position: absolute;` + `height: calc(100vh - footer)`

<div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; margin: 2rem 0; perspective: 1200px;">
  <div style="width: 300px; height: 320px; position: relative; transform: rotateX(20deg) rotateY(-15deg); transform-style: preserve-3d;">
    <div style="
      width: 100%;
      height: 100%;
      border: 4px solid #333;
      border-radius: 20px;
      background: #f8f9fa;
      position: absolute;
      box-shadow: 30px 30px 60px rgba(0,0,0,0.4);
      transform: translateZ(0px) translateX(0px);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      color: #666;
      font-weight: bold;
    ">Device Frame</div>
    <div style="
      position: absolute;
      top: 4px;
      left: 4px;
      right: 4px;
      height: 60px;
      background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      font-weight: bold;
      border-radius: 16px 16px 0 0;
      transform: translateZ(30px) translateX(-8px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.3);
    ">Header (fixed)</div>
    <div style="
      position: absolute;
      top: 64px;
      left: 4px;
      right: 4px;
      height: 6px;
      background: rgba(25, 118, 210, 0.4);
      border: 1px dashed rgba(25, 118, 210, 0.7);
      transform: translateZ(-5px) translateX(0px);
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.6rem;
      color: #1976d2;
      font-weight: bold;
    ">Header padding</div>
    <div style="
      position: absolute;
      top: 74px;
      left: 9px;
      right: 9px;
      height: 210px;
      background: #fff3e0;
      border: 2px solid #ff9800;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      color: #424242;
      text-align: center;
      transform: translateZ(15px) translateX(5px);
      box-shadow: 0 4px 8px rgba(255,152,0,0.2);
    ">Messages area<br/>(100vh - footer)</div>
    <div style="
      position: absolute;
      bottom: 65px;
      left: 4px;
      right: 4px;
      height: 6px;
      background: rgba(255, 152, 0, 0.4);
      border: 1px dashed rgba(255, 152, 0, 0.7);
      transform: translateZ(-5px) translateX(0px);
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.6rem;
      color: #ff9800;
      font-weight: bold;
    ">Footer margin</div>
    <div style="
      position: absolute;
      bottom: 15px;
      left: 9px;
      right: 9px;
      height: 50px;
      background: rgba(255, 255, 255, 0.95);
      border: 2px solid #ff9800;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: bold;
      color: #e65100;
      transform: translateZ(45px) translateX(12px);
      box-shadow: 0 12px 24px rgba(255,152,0,0.3);
    ">Footer (absolute)</div>
    
  </div>
  <div style="background: #fff3e0; color: #e65100; padding: 0.5rem 1rem; border-radius: 0.5rem; font-size: 0.9rem; font-weight: bold; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">❌ キーボード表示時に高さが間違う</div>
</div>

---

#### 3: `position: absolute;` + Viewport API

<div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; margin: 2rem 0; perspective: 1200px;">
  <div style="width: 300px; height: 320px; position: relative; transform: rotateX(20deg) rotateY(-15deg); transform-style: preserve-3d;">
    <div style="
      width: 100%;
      height: 100%;
      border: 4px solid #333;
      border-radius: 20px;
      background: #f8f9fa;
      position: absolute;
      box-shadow: 30px 30px 60px rgba(0,0,0,0.4);
      transform: translateZ(0px) translateX(0px);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      color: #666;
      font-weight: bold;
    ">Device Frame</div>
    <div style="
      position: absolute;
      top: 4px;
      left: 4px;
      right: 4px;
      height: 60px;
      background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      font-weight: bold;
      border-radius: 16px 16px 0 0;
      transform: translateZ(30px) translateX(-6px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.3);
    ">Header (fixed)</div>
    <div style="
      position: absolute;
      top: 64px;
      left: 4px;
      right: 4px;
      height: 6px;
      background: rgba(25, 118, 210, 0.4);
      border: 1px dashed rgba(25, 118, 210, 0.7);
      transform: translateZ(-5px) translateX(0px);
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.6rem;
      color: #1976d2;
      font-weight: bold;
    ">Header padding</div>
    <div style="
      position: absolute;
      top: 74px;
      left: 9px;
      right: 9px;
      height: 180px;
      background: #e3f2fd;
      border: 2px solid #2196f3;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      color: #424242;
      text-align: center;
      transform: translateZ(15px) translateX(3px);
      box-shadow: 0 4px 8px rgba(33,150,243,0.2);
    ">Messages area<br/>(Viewport API)</div>
    <div style="
      position: absolute;
      bottom: 65px;
      left: 4px;
      right: 4px;
      height: 6px;
      background: rgba(33, 150, 243, 0.4);
      border: 1px dashed rgba(33, 150, 243, 0.7);
      transform: translateZ(-5px) translateX(0px);
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.6rem;
      color: #2196f3;
      font-weight: bold;
    ">Footer margin</div>
    <div style="
      position: absolute;
      bottom: 15px;
      left: 9px;
      right: 9px;
      height: 50px;
      background: rgba(255, 255, 255, 0.95);
      border: 2px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: bold;
      color: #666;
      transform: translateZ(45px) translateX(8px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.2);
    ">Footer (absolute)</div>
  </div>
  <div style="background: #e3f2fd; color: #1565c0; padding: 0.5rem 1rem; border-radius: 0.5rem; font-size: 0.9rem; font-weight: bold; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">⚠️ スクロール可能だが操作性に課題</div>
</div>

---

#### 4: `position: absolute;` + Viewport API + meta viewport

<div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; margin: 2rem 0; perspective: 1200px;">
  <div style="width: 300px; height: 320px; position: relative; transform: rotateX(20deg) rotateY(-15deg); transform-style: preserve-3d;">
    <div style="
      width: 100%;
      height: 100%;
      border: 4px solid #333;
      border-radius: 20px;
      background: #f8f9fa;
      position: absolute;
      box-shadow: 30px 30px 60px rgba(0,0,0,0.4);
      transform: translateZ(0px) translateX(0px);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      color: #666;
      font-weight: bold;
    ">Device Frame</div>
    <div style="
      position: absolute;
      top: 4px;
      left: 4px;
      right: 4px;
      height: 60px;
      background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      font-weight: bold;
      border-radius: 16px 16px 0 0;
      transform: translateZ(30px) translateX(-4px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.3);
    ">Header (fixed)</div>
    <div style="
      position: absolute;
      top: 64px;
      left: 4px;
      right: 4px;
      height: 6px;
      background: rgba(25, 118, 210, 0.4);
      border: 1px dashed rgba(25, 118, 210, 0.7);
      transform: translateZ(-5px) translateX(0px);
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.6rem;
      color: #1976d2;
      font-weight: bold;
    ">Header padding</div>
    <div style="
      position: absolute;
      top: 74px;
      left: 9px;
      right: 9px;
      height: 180px;
      background: #e8f5e8;
      border: 2px solid #4caf50;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      color: #424242;
      text-align: center;
      transform: translateZ(15px) translateX(2px);
      box-shadow: 0 4px 8px rgba(76,175,80,0.2);
    ">Messages area<br/>(Perfect height)</div>
    <div style="
      position: absolute;
      bottom: 65px;
      left: 4px;
      right: 4px;
      height: 6px;
      background: rgba(76, 175, 80, 0.4);
      border: 1px dashed rgba(76, 175, 80, 0.7);
      transform: translateZ(-5px) translateX(0px);
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.6rem;
      color: #4caf50;
      font-weight: bold;
    ">Footer margin</div>
    <div style="
      position: absolute;
      bottom: 15px;
      left: 9px;
      right: 9px;
      height: 50px;
      background: rgba(255, 255, 255, 0.95);
      border: 2px solid #4caf50;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: bold;
      color: #2e7d32;
      transform: translateZ(45px) translateX(6px);
      box-shadow: 0 12px 24px rgba(76,175,80,0.3);
    ">Footer (absolute)</div>
  </div>
  <div style="background: #e8f5e8; color: #2e7d32; padding: 0.5rem 1rem; border-radius: 0.5rem; font-size: 0.9rem; font-weight: bold; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">✅ 完璧な高さ調整</div>
</div>


---
layout: image-x
image: https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif
imageOrder: 2
---


### ありがとうございました

- Twitter: [@const_myself](https://twitter.com/const_myself)
- GitHub: [ogadra](https://github.com/ogadra)

<PoweredBySlidev mt-10 />

