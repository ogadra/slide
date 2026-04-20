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

<div style="position: absolute; top: 50%; left: 30%; transform: translate(-50%, -50%);">
  <img src="/imgs/qr.png" alt="このスライドのQRコード" style="width: 350px;" />
</div>

<div style="position: absolute; top: 50%; right: 5%; transform: translateY(-50%); text-align: center;">
  <p style="font-size: 1.75rem !important; color: #ff6b6b; font-weight: bold;">写真撮影はご遠慮ください</p>
  <p style="font-size: 1.3rem !important; margin-top: 1rem; color: #aaa;">発表者は顔出しNGのため</p>
</div>

<div style="position: absolute; right: 4rem; top: 3rem;">
  <div style="display: flex; flex-direction: column; align-items: flex-end;">
    <span style="font-size: 1.5rem; transform: rotate(-45deg); margin-bottom: 0.25rem;">→</span>
    <span style="font-size: 0.9rem; color: #4ec9b0;">タップでスライド同期をオフにできます</span>
  </div>
</div>

---

## 最強の登壇資料とは

<div style="height: 20px" />

<div class="center-content">

聴衆が**その場で体験できる**登壇資料

</div>

---

## デモ

<div style="height: 20px" />

<div style="display: flex; justify-content: center; align-items: center; gap: 3rem;">
  <div style="text-align: center;">
  </div>
  <div style="text-align: left;">
    <p style="font-size: 1.2rem !important; color: #aaa;">以下のコマンドを入力してみてください</p>
    <div style="margin-top: 1rem;">

```bash
echo "hello from $(hostname)"
```

  </div>
  </div>
</div>

<div style="margin-top: 1.5rem; text-align: center;">
  <p style="font-size: 1.1rem !important; color: #ff6b6b;">← 全員違う hostname になるはず</p>
</div>

---

## 何が起きているのか

<div style="height: 10px" />

<div class="center-content">

1人1コンテナを割り当て

ブラウザ経由でコマンドを実行している

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

## AWS Architecture


<img src="/imgs/bunshin_architecture.png" alt="アーキテクチャ図" style="max-height: 375px;" />

---


## NGINX auth_request で1人1コンテナ

<div style="height: 5px" />

### 初回アクセス

```
Browser → NGINX → auth_request → Broker
                                   ├─ アイドルRunnerを割り当て
                                   └─ runner_id cookie を発行
         NGINX ─────────────────────→ Runner（プロキシ）
```

### 2回目以降

```
Browser（cookie付き）→ NGINX → auth_request → Broker
                                               └─ 「まだ生きてる？」確認
              NGINX ─────────────────────────────→ 同じRunnerへ
```

---

## 構成のポイント

<div style="height: 10px" />

- **Broker** は判定だけ。実トラフィックは流れない
- **Runner** は自分のセッションだけ知っていればいい
- Runnerは起動時にBrokerへ**自己登録**、停止時にderegister

<div style="height: 10px" />

<div style="text-align: center;">
  <!-- <img src="/imgs/architecture.png" alt="アーキテクチャ図" style="max-height: 250px;" /> -->
</div>

---

## Runner: Persistent bash

<div style="height: 10px" />

- 1リクエスト=1プロセスだと `cd` や `export` が引き継がれない
- → bashプロセスを**保持**し、コマンドを流し込む

<div style="height: 5px" />

```
POST /api/session   → bashプロセス起動
POST /api/execute   → コマンド実行
```

<div style="height: 5px" />

- ブラウザのタブごとに独立したセッション（session_id cookie）

---

## なぜ tty にしなかったのか

<div style="height: 10px" />

王道: **xterm.js + WebSocket + PTY**

<div style="height: 5px" />

- 要件は「登壇者が示したコマンドを参加者が実行する」だけ
- PTYは自由度が高すぎる → **コマンドバリデーションが不可能**
- **コマンド単位の POST + SSE** にすることで実行前に検査可能

<div style="height: 10px" />

> tab補完やインタラクティブ操作は捨てる。
> そのかわり**安全でシンプル**

---

## Runner: コマンドバリデーション（2層）

<div style="height: 10px" />

### ホワイトリスト

`ls`, `pwd`, `date` など安全なコマンドは**即実行**

### LLMバリデーション

それ以外は **AWS Bedrock** に問い合わせて意図レベルで危険か判定

<div style="height: 10px" />

- 拒否時は **403 Forbidden**
- ホワイトリストで**低レイテンシ**、LLMで**ゼロデイ的な抜け穴を防止**

---

## Runner: SSEの出力設計

<div style="height: 10px" />

| イベント | 内容 |
|---|---|
| `stdout` | リアルタイムストリーム |
| `stderr` | コマンド完了時にまとめて送信 |
| `complete` | exitCode付きで終了を通知 |

<div style="height: 10px" />

- 終了検知は **markerベース**
- bashの `$?` をマーカー行に埋め込んで検出

---

## まとめ

<div style="height: 20px" />

<div class="center-content">

1. **マネージドの限界を見極める**
2. **LLMの力を借りて気合の自作**

</div>

<div style="height: 10px" />

<div style="text-align: center;">
  <p style="font-size: 1rem !important; color: #4ec9b0;">
    リポジトリ: github.com/ogadra/20260327-cli-demo
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
