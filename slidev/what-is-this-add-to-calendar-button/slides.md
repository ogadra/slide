---
theme: purplin
title: 「カレンダーに追加」ボタンって何者？
info: 「カレンダーに追加」ボタンって何者？
colorSchema: 'dark'
drawings:
  enabled: false
transition: slide-left
mdc: true
canvasWidth: 960
fonts:
  mono: 'Fira Code'
---

<div style="height: 100px"/>

<h1>「カレンダーに追加」<br/>ボタンって何者？</h1>

<div style="height: 30px" />

## ogadra

---

<div class="center-content">

<p style="font-size: 3rem !important;">新年といえば？</p>

</div>

---

<div class="center-content">

<p style="font-size: 4.5rem !important; font-weight: bold;">カレンダー 📅</p>

</div>

---

## そういえば…

<div class="center-content-with-heading">
  <img src="/imgs/mozumasu_tweet.png" alt="mozumasuさんのツイート。「おがどらさんのLTがあるときは自動でGoogleカレンダーに追加して欲しいです😂」と書いてある。" class="w-150" />
  
  <div style="margin-top: 0.25rem;">
    <a href="https://twitter.com/mozumasu/status/1950155912930329000" target="_blank" style="color: #4ec9b0;">
      https://twitter.com/mozumasu/status/1950155912930329000
    </a>
  </div>
</div>
---

<div class="center-content">

<p style="font-size: 6.5rem !important; font-weight: bold;">やるしかない</p>

</div>

---

## **Mokuroku** - 登壇予定照会サービス

<div class="center-content-with-heading">

<img src="/imgs/mokuroku.png" alt="Mokurokuというサイトのトップのスクリーンショット。アイキャッチ。" class="w-120" style="margin-top: 1rem;" />

<div style="margin-top: 0.25rem;">
  <a href="https://mokuroku.ogadra.com" target="_blank" style="color: #4ec9b0;">
    https://mokuroku.ogadra.com
  </a>
</div>

</div>

---

## 以下のボタンで追加できます！

<div class="center-content-with-heading">

<div style="display: flex; gap: 2rem; justify-content: center; min-height: 100px">
  <a href="webcal://mokuroku.ogadra.com/schedule.ics" class="calendar-btn calendar-btn-apple">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
    Apple Calendar に追加
  </a>
  <a href="https://www.google.com/calendar/render?cid=webcal%3A%2F%2Fmokuroku.ogadra.com%2Fschedule.ics" target="_blank" class="calendar-btn calendar-btn-google">
    <svg width="24" height="24" viewBox="0 0 488 512" fill="currentColor"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
    Google Calendar に追加
  </a>
</div>

</div>

---

## 先程のボタンの中身

<div style="margin-top: 100px;">

```html

<a
  href="webcal://mokuroku.ogadra.com/schedule.ics"
>
  Apple Calendar に追加
</a>

```

</div>


---

## webcal://

<div class="center-content-with-heading">

RFC 5545 で定められた URI スキーム

カレンダーの購読に使用する

</div>

---

## What is RFC 5545 ?

Internet Calendaring and Scheduling Core Object Specification

- 2009年に策定
- カレンダーデータの交換形式を定義

---

## webcal:// で取得できる情報例

```text
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Yokohama-North//connpass Schedule//EN
X-WR-CALNAME:横浜北部ソフトウェアエンジニアの集いイベントカレンダー
BEGIN:VEVENT
DTSTART:20260115T100000Z
DTEND:20260115T120000Z
SUMMARY:Yokohama North Meetup #12「LT新年会2026」
LOCATION:大倉山記念館 - 神奈川県横浜市港北区大倉山２丁目１０−１
END:VEVENT
END:VCALENDAR
```

<!--
  BEGIN:VCALENDAR
  VERSION:2.0
  PRODID:-//Mokuroku//Speaking Schedule//EN
  CALSCALE:GREGORIAN
  METHOD:PUBLISH
  X-WR-CALNAME:ogadra 登壇予定
  X-WR-TIMEZONE:Asia/Tokyo
  REFRESH-INTERVAL;VALUE=DURATION:PT1H
  X-PUBLISHED-TTL:PT1H
  BEGIN:VEVENT
  UID:019bb81b-b6dd-785e-bc92-7e6b8d6f87b1
  DTSTAMP:20260114T221704Z
  DTSTART:20260115T100000Z
  DTEND:20260115T120000Z
  SUMMARY:[確定] [登壇] Yokohama North Meetup #12「LT新年会2026」
  STATUS:CONFIRMED
  CLASS:PUBLIC
  DESCRIPTION:https://yokohama-north.connpass.com/event/377972
  LOCATION:大倉山記念館 - 神奈川県横浜市港北区大倉山２丁目１０−１
  X-ATTENDEE-TYPE:SPEAKER
  CREATED:20260113T160623Z
  LAST-MODIFIED:20260113T161708Z
  SEQUENCE:1
  TRANSP:TRANSPARENT
  END:VEVENT
  END:VCALENDAR
-->

---

## STATUS プロパティ

<div class="center-content-with-heading">

RFC 5545 で定義されている予定の状態

- `TENTATIVE` - 仮予定
- `CONFIRMED` - 確定
- `CANCELLED` - キャンセル

</div>

---

## まとめ

- 「カレンダーに追加」= **webcal:// + .ics**
- .ics は **RFC 5545** で標準化されている
- でも **STATUS は無視される**

**仕様と実装は別物**

---

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

