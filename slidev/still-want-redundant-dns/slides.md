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
mdc: true
preloadImages: false
htmlAttrs:
  lang: 'ja'
canvasWidth: 960
fonts:
  sans: 'Zen Maru Gothic'
  serif: 'Solway'
  provider: none
---

<img src="./imgs/shapes/shape-gold-left-top.svg" alt="" class="patch" style="top: -40px; left: -36px; width: 150px;" />
<img src="./imgs/shapes/shape-orange-stroke-right.svg" alt="" class="patch" style="top: -30px; left: 360px; width: 220px;" />
<img src="./imgs/shapes/shape-purple-right-small.svg" alt="" class="patch" style="top: 30px; right: 20px; width: 110px;" />
<img src="./imgs/shapes/shape-green-right-bottom.svg" alt="" class="patch" style="bottom: -100px; left: -70px; width: 200px;" />
<img src="./imgs/shapes/shape-gold-right.svg" alt="" class="patch" style="bottom: -40px; left: 420px; width: 100px;" />
<img src="./imgs/shapes/shape-blue-right-top.svg" alt="" class="patch" style="bottom: -40px; right: -30px; width: 220px;" />

<img src="./imgs/yapc-logo.svg" alt="YAPC::Tokyo 2026" class="cover-logo" />

<div style="height: 180px"/>

# それでも、<br>DNSを冗長化したい

## ogadra

---

## 前提となった技術要件

大吉祥寺.pmの登壇に用いたデモアプリ

AWSおよびGoogle Cloudのマルチクラウド構成

以下が落ちてもサービスが提供できること

- いずれかのDNSサービス
- AWS または Google Cloud

---
class: text-center-body
---

## なぜDNSを冗長化するのか

カンファレンス登壇なので、**絶対に**失敗したくない

<img src="./imgs/shapes/arrow.svg" alt="" class="arrow" style="transform: rotate(180deg);" />

特定のクラウドプロバイダの**全サービス**がサービスダウンしても

サービス継続できるだけの可用性が欲しかった

---

## AWSを利用した一般的なサービス構成

<img src="./imgs/aws_architecture.png" alt="AWSを利用した一般的なサービス構成図" class="architecture" />

---

## Google Cloudを利用した一般的なサービス構成

<img src="./imgs/gcp_architecture.png" alt="Google Cloudを利用した一般的なサービス構成図" class="architecture" />

---

## なぜDNSを冗長化することが難しかったのか

DNSの冗長化には基本的に**ゾーン転送** (IXFR / AXFR)を用いる

1. Route 53やGoogle Cloud DNSはゾーン転送に非対応
2. ゾーン転送を用いるとヘルスチェックができない

<img src="./imgs/shapes/arrow.svg" alt="" class="arrow" style="transform: rotate(180deg);" />

それぞれのDNSに同じレコードを登録すればいいのでは？

---

## なぜDNSを冗長化することが難しかったのか

それぞれのDNSに同じレコードを登録した場合

Cloud DNS <img src="./imgs/shapes/arrow.svg" alt="から" class="arrow-inline" /> CloudFrontの**ヘルスチェックができず**

当初の要件を満たすことができなかった

---

## なぜDNSを冗長化することが難しかったのか

<div class="two-col figure">
<div class="text-center">

Amazon CloudFrontは<br/>
通常、固定IPを持たず<br/>
FQDNしか払い出さない

<img src="./imgs/shapes/arrow.svg" alt="" class="arrow" style="transform: rotate(180deg);" />

登録するレコードはCNAMEレコードになる

</div>
<div>

<img src="./imgs/route53_targets.png" alt="Route 53からCloudFrontとExternal Application LBへ向ける構成図" class="architecture" />

</div>
</div>

---

## CNAMEレコードとは

<div class="two-col figure">
<div>

CNAMEレコードは「このドメイン名は別のドメインの別名である」ということを伝えるレコード

問い合わせのあったレコードを別のレコードに読み替える

</div>
<div>

<CnameFigure />

</div>
</div>

---

## なぜDNSを冗長化することが難しいのか

<div class="two-col figure">
<div class="text-center">

CNAMEレコードは<br/>
他のレコードと<br/>
**同居できない** (RFC&nbsp;2181)

</div>
<div>

<CnameConflictFigure />

</div>
</div>

---

## Aliasレコードについて

<div class="two-col figure">
<div>

Route 53の機能

CNAMEの代わりに、<br/>宛先のIPアドレスを<br/>Aレコードとして返す仕組み

宛先はAWSの一部リソースと同じゾーン内のレコードに限られる

</div>
<div>

<AliasFigure />

</div>
</div>


---

## Aliasレコードについて

Cloud DNSでは**ALIASレコード**、<br/>
Cloudflareでは**CNAME flattening**という名称で提供

各社微妙に仕様が異なる

---

## なぜDNSを冗長化することが難しいのか

<div class="two-col figure">
<div>

Route 53の<br/>
**Alias Record**を使い、<br/>
CloudFrontと<br/>
External Application LBの<br/>
両方を登録

</div>
<div>

<img src="./imgs/route53_targets.png" alt="Route 53からCloudFrontとExternal Application LBへ向ける構成図" class="architecture" />

</div>
</div>

---

## なぜDNSを冗長化することが難しいのか

<div class="two-col figure">
<div class="text-center">

Cloud DNSでは<br/>CNAME / ALIASに<br/>
ヘルスチェックを設定できない

<img src="./imgs/shapes/arrow.svg" alt="" class="arrow" style="transform: rotate(180deg);" />

Cloud DNSを含めた構成だと<br/>
可用性を十分に確保できない

</div>
<div>

<img src="./imgs/clouddns_targets.png" alt="Cloud DNSからCloudFrontとExternal Application LBへ向ける構成図" class="architecture" />

</div>
</div>

---

## なぜDNSを冗長化することが難しいのか


<div class="two-col figure">
<div>

Route 53 + Cloud DNSという<br/>
構成が今回の要件上取れない

1. Cloud DNSではCNAME / ALIASに<br/>ヘルスチェックを<br/>設定できない
2. AXFR / IXFRでの設定が不可

</div>
<div>

<img src="./imgs/clouddns_targets.png" alt="Cloud DNSからCloudFrontとExternal Application LBへ向ける構成図" class="architecture" />

</div>
</div>



---

## サービス選定に立ち戻る

- CNAMEとAをヘルスチェックで切り替えて返せること
- ヘルスチェックによって向き先を変更できること
- AXFR / IXFRは諦める
  - Route 53が対応していないため

<img src="./imgs/shapes/arrow.svg" alt="" class="arrow" style="transform: rotate(180deg);" />

<div class="text-center">

**IBM NS1 Connect**を採用

</div>

---

## 登録する

<img src="./imgs/delegation.png" alt="Route 53 Domainsから.netレジストリにNSを登録し、ogadra.netとbunshin.ogadra.netのゾーンをRoute 53とIBM NS1 Connectの両方に置いて委任する図" class="architecture" />

---

## 1. DNSゾーンの作成 (Route 53)

<div class="two-col figure">
<div>

### DNSゾーンとは

特定ドメインのリソースレコードを置く、権威の範囲のこと

マネージドサービスでゾーンを作成すると、ネームサーバーが割り振られる

</div>
<div>

<HostedZoneFigure :step="1" />

</div>
</div>

---

## 1. DNSゾーンの作成 (Route 53)

<div class="two-col figure">
<div>

### DNSゾーンとは

割り振られたサーバーを親ゾーンにNSとして設定すると、インターネットから名前解決できるようになる

</div>
<div>

<HostedZoneFigure :step="2" />

</div>
</div>

---

## 1. DNSゾーンの作成 (Route 53)

<div class="two-col figure">
<div>

- 管理する単位ごとに作成
  - 各プロバイダ
  - 各(サブ)ドメイン

</div>
<div>

<DelegationFigure :step="1" />

</div>
</div>

---

## 2. ネームサーバーをレジストラで登録

<div class="two-col figure">
<div>

- レジストラで<br>それぞれのNSを登録
- ゾーンのレコードも<br>更新
  - Apexドメインの<br>NSレコード

</div>
<div>

<DelegationFigure :step="2" />

</div>
</div>

---

## 3. NSレコード登録

<div class="two-col figure">
<div>

- 子ゾーンのNSレコードを親ゾーンに登録
  - 各DNSゾーンのNSレコード
- 子ゾーンのNSレコードを各ゾーンで共通の値に
</div>
<div>

<DelegationFigure :step="3" />

</div>
</div>

---


## 出来上がったもの

<img src="./imgs/bunshin_architecture_icons.png" alt="AWSとGoogle Cloudにまたがる構成図" class="architecture tall" />

---

<img src="./imgs/shapes/shape-gold-left-top.svg" alt="" class="patch" style="top: -40px; left: -36px; width: 150px;" />
<img src="./imgs/shapes/shape-orange-stroke-right.svg" alt="" class="patch" style="top: -30px; left: 360px; width: 220px;" />
<img src="./imgs/shapes/shape-purple-right-small.svg" alt="" class="patch" style="top: 30px; right: 20px; width: 110px;" />
<img src="./imgs/shapes/shape-green-right-bottom.svg" alt="" class="patch" style="bottom: 30px; left: -70px; width: 200px;" />
<img src="./imgs/shapes/shape-gold-right.svg" alt="" class="patch" style="bottom: 40px; left: 420px; width: 100px;" />
<img src="./imgs/shapes/shape-blue-right-top.svg" alt="" class="patch" style="bottom: 40px; right: -30px; width: 220px;" />

<div class="statement">
<p class="statement-patch">ね、簡単でしょ？</p>
</div>

---

<img src="./imgs/shapes/shape-blue-right-top.svg" alt="" class="patch" style="top: -50px; left: -40px; width: 200px;" />
<img src="./imgs/shapes/shape-gold-right.svg" alt="" class="patch" style="top: 24px; left: 520px; width: 90px;" />
<img src="./imgs/shapes/shape-green-right-bottom.svg" alt="" class="patch" style="top: -40px; right: -50px; width: 190px;" />
<img src="./imgs/shapes/shape-purple-right-small.svg" alt="" class="patch" style="bottom: 50px; left: 30px; width: 110px;" />
<img src="./imgs/shapes/shape-orange-stroke-right.svg" alt="" class="patch" style="bottom: 30px; left: 440px; width: 200px;" />
<img src="./imgs/shapes/shape-gold-left-top.svg" alt="" class="patch" style="bottom: 30px; right: -30px; width: 150px;" />

<div class="statement">
<p class="statement-patch" style="font-size: 2.1rem !important;">やり方は一つじゃない - TMTOWTDI</p>
</div>

---

## Global Accelerator を使えばAレコードになる

<img src="./imgs/bunshin_current_dns.png" alt="Route 53とCloud DNSがGlobal AcceleratorとExternal Application LBを返す構成図" class="architecture" />

---

## CloudFrontのAnycast static IPsを申請する

<img src="./imgs/bunshin_current_dns_cloudfront.png" alt="Route 53とCloud DNSがCloudFrontとExternal Application LBを返す構成図" class="architecture" />

---

<img src="./imgs/shapes/deco-star-orange.svg" alt="" class="patch" style="top: 14px; right: 40px; width: 80px;" />
<img src="./imgs/shapes/deco-button-purple.svg" alt="" class="patch" style="top: 76px; right: 136px; width: 44px;" />

## まとめ

<div class="summary-cloth-wrap">
<div class="cloth-scrap mustard top-left"></div>
<div class="summary-cloth">
<p>DNSサービスは各社で異なるため、<br/>それぞれの布片を1枚の布に仕立てるのは大変</p>
<div class="cloth-thread"></div>
<p class="strong">ばらばらなDNSサービスを、<br/>NSレコードという糸で縫い合わせ、<br/>どこかが欠けてもほつれない布に仕立てられた</p>
</div>
<div class="cloth-scrap blue bottom-right"></div>
</div>


---

## Thank you for listening!

<div class="two-col">
<div>

Done is better than perfect.

- Twitter: [@const_myself](https://twitter.com/const_myself)
- GitHub: [ogadra](https://github.com/ogadra)

<PoweredBySlidev mt-10 />

</div>
<div>

<img src="https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif" alt="" class="architecture" />

</div>
</div>
