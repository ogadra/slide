---
theme: purplin
title: 俺の考えた最強の登壇資料
info: 俺の考えた最強の登壇資料
colorSchema: 'dark'
drawings:
  enabled: false
transition: slide-left
mdc: true
canvasWidth: 960
---

<div style="height: 100px"/>

# 俺の考えた最強の登壇資料

<div style="height: 30px" />

## ogadra

---

## この発表について

<div class="center-content">

<p style="font-size: 1.6rem !important;">2026年3月27日 <b>Terminal Night #2</b> での発表の解説です</p>

<a href="https://github.com/ogadra/20260327-cli-demo" target="_blank" style="text-decoration: none; color: inherit;">
  <div style="border: 1px solid #444; border-radius: 8px; overflow: hidden; max-width: 500px; margin: 0 auto;">
    <img src="/imgs/20260327-cli-demo-ogp.png" alt="20260327-cli-demo のOGP画像" style="width: 100%;" />
    <div style="padding: 8px 12px; font-size: 0.85rem; color: #aaa;">github.com/ogadra/20260327-cli-demo</div>
  </div>
</a>

</div>

---

## 最強の登壇資料とは

<div style="height: 20px" />

<div class="center-content">

聴衆の手元で**動く**登壇資料

</div>

---

## 何をやったのか

<div style="height: 10px" />

<div class="center-content">

1人1コンテナを割り当て

ブラウザ経由でコマンドを実行した

</div>

---

## どうやって登壇中に「触ってもらえるか」

<div style="height: 5px" />

<div class="text-094">

| 候補 | NG理由 |
|---|---|
| 登壇中に環境構築してもらう | 時間がない / PCを持ってきているとは限らない |
| コード実行サービス | 自分の布教したいものの環境があるとは限らない |
| Cloudflare Sandbox SDK | レスポンスが遅い |

</div>

<div style="margin-top: 2rem; text-align: center;">
<p style="font-size: 2rem !important;">
-> ECS Fargateで自作することを決断
</p>
</div>

---

## なぜ 1人1コンテナなのか

<div style="height: 5px" />

<div class="text-094">

| 観点 | 理由 |
|---|---|
| セキュリティ | プロセス・ファイルシステム・環境変数がコンテナ単位で完全分離 |
| ライフサイクル | タスク終了 = セッション終了 → リソース即回収 |
| コスト | 短時間利用のため、大量に立ち上げても低コスト |

</div>

---

## AWS Architecture


<img src="/imgs/bunshin_architecture.png" alt="アーキテクチャ図" style="max-height: 375px;" />

---

## 初回アクセス

```plantuml
@startuml
skinparam backgroundColor transparent
skinparam sequenceMessageAlign center
skinparam defaultFontColor white
skinparam ArrowColor white
skinparam SequenceLifeLineBorderColor white
skinparam ParticipantBorderColor white
skinparam ParticipantFontColor white
skinparam ParticipantBackgroundColor transparent

participant Browser as B
participant NGINX as N
participant Broker as Br
participant Runner as R

B -> N : リクエスト
N -> Br : auth_request
Br -> Br : Runnerの割り当て
Br --> N : RunnerのIP + cookie
N -> R : プロキシ
R --> B : レスポンス
@enduml
```

---

## 2回目以降

```plantuml
@startuml
skinparam backgroundColor transparent
skinparam sequenceMessageAlign center
skinparam defaultFontColor white
skinparam ArrowColor white
skinparam SequenceLifeLineBorderColor white
skinparam ParticipantBorderColor white
skinparam ParticipantFontColor white
skinparam ParticipantBackgroundColor transparent

participant Browser as B
participant NGINX as N
participant Broker as Br
participant Runner as R

B -[#4ec9b0]> N : <color:#4ec9b0>リクエスト + cookie</color>
N -> Br : auth_request
Br -[#4ec9b0]> Br : <color:#4ec9b0>Runner特定</color>
Br --[#4ec9b0]> N : <color:#4ec9b0>RunnerのIP</color>
N -> R : プロキシ
R --> B : レスポンス
@enduml
```

---

## Runner: exec.Cmd + stdinパイプ

<div style="height: 30px" />

- `exec.Cmd`でbashプロセスを起動し、stdinにコマンドを流し込む
  - `POST /api/session` -> bashプロセス起動
  - `POST /api/execute` -> コマンド実行
- ブラウザのタブごとに独立したセッション

---

## Runner: コマンドバリデーション

<div style="height: 5px" />

<div class="text-094">

| 層 | 判定方法 | 例 |
|---|---|---|
| ホワイトリスト | 完全一致 | 基本的なコマンド <br/> スライド内で使うことが分かっているコマンド |
| プレフィックス + <br/> メタ文字検査 | 先頭一致 & <br/> `;｜&` 等がない | `nix run nixpkgs#cowsay ...` |
| LLM | Claudeで判定 | それ以外すべて |

</div>

---

## Runner: 監査ログ

不特定多数にシェル環境を提供する 

-> **プロバイダ責任制限法**に則った、発信者情報の記録が必要

- 時刻
- IPアドレス
- ポート番号
- コマンド内容

※ curlとかで爆破予告されたら困るので

---

## なぜ PTY にしなかったのか

|  | PTY | stdinパイプ |
|---|---|---|
| TUI（`top`, `fzf` 等） | <span style="color: #4ec9b0;">可</span> | <span style="color: #ff6b6b;">不可</span> |
| インタラクティブ操作（Ctrl+C、`vi`等） | <span style="color: #4ec9b0;">可</span> | <span style="color: #ff6b6b;">不可</span> |
| 端末情報取得（sl等の描画に必要） | <span style="color: #4ec9b0;">可</span> | <span style="color: #ff6b6b;">不可</span> |
| バリデーション / ログ | <span style="color: #ff6b6b;">**不可**</span> | <span style="color: #4ec9b0;">**可**</span> |

---

## まとめ

<div class="center-content">

<p style="font-size: 2.15rem !important">
<b>LLMがオーバーエンジニアリングを可能に</b>
</p>
</div>

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
