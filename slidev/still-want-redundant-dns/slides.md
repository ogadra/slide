---
theme: purplin
title: 'それでも、DNSを冗長化したい'
date: '2026/11/28'
event: 'YAPC::Tokyo 2026'
eventLink: 'https://fortee.jp/yapc-tokyo-2026/proposal/938e5ccb-e21e-4a65-890c-0e978c88775b'
info: 'それでも、DNSを冗長化したい'
colorSchema: 'light'
drawings:
  enabled: false
transition: slide-left
mdc: true
canvasWidth: 960
fonts:
  sans: 'Zen Maru Gothic'
  serif: 'Solway'
  weights: '400,700'
  provider: google
---

<div style="height: 100px"/>

# それでも、DNSを冗長化したい

<div style="height: 30px" />

## ogadra

---

<div style="position: absolute; top: 50%; left: 30%; transform: translate(-50%, -50%);">
  <img src="/imgs/qr.png" alt="このスライドのQRコード" style="width: 350px;" />
</div>

<div style="position: absolute; top: 50%; right: 5%; transform: translateY(-50%); text-align: center;">
  <p style="font-size: 1.75rem !important; color: #ea5520; font-weight: bold;">写真撮影はご遠慮ください</p>
  <p style="font-size: 1.3rem !important; margin-top: 1rem; color: #616161;">発表者は顔出しNGのため</p>
</div>

<div style="position: absolute; right: 4rem; top: 3rem;">
  <div style="display: flex; flex-direction: column; align-items: flex-end;">
    <span style="font-size: 1.5rem; transform: rotate(-45deg); margin-bottom: 0.25rem;">→</span>
    <span style="font-size: 0.9rem; color: #004aba;">タップでスライド同期をオフにできます</span>
  </div>
</div>

---

## 前提となった技術要件

---

## なぜDNSを多重化するのか

---

## AWSやGoogle Cloudを利用した一般的なサービス構成

---

## なぜDNSを多重化することが難しいのか

---

## CNAMEとAレコードを同時に登録する手法、ALIASレコードについて

---

## CloudFrontの制約とCloud DNSの制約の噛みあわないところ

---

## delegation(委任)とは

---

## 各サービス比較

---

## 構成例

---

## 出来上がったもの

---
layout: image-x
image: https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif
imageOrder: 2
---

## Thank you for listening!

Done is better than perfect.

- Twitter: [@const_myself](https://twitter.com/const_myself)
- GitHub: [ogadra](https://github.com/ogadra)

<PoweredBySlidev mt-10 />

