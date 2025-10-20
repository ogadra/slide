---
theme: purplin
title: 深堀り！Playwright MCP
info: 深堀り！Playwright MCP
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

# 深堀り！Playwright MCP
## ogadra

---
layout: image-x
image: https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif
imageOrder: 2
---

# ogadra

Motto: Done is better than perfect.

Favorite languages: TypeScript, Go
Contributions: Playwright, playwright-mcp
---

## テーマ

<div style="margin-top: 3.5em ;font-weight: bold; text-align: center;">
  <p style="font-size: 1.75em !important">
  コンテキストエンジニアリング力向上のために<br/>
  Playwright MCPの仕組みを理解しよう！
  </p>
</div>

---

## コンテキストエンジニアリングとは

>「コンテキストエンジニアリングとは、コンテキストウィンドウを精巧に設計する芸術と科学である」
> <div style="text-align: right; font-size: 1.25em;">Andrej Karpathy</div>

---

## コンテキストエンジニアリングとは

- LLMが得る情報を統括的にコントロールすること
  - プロンプト設計
  - MCPから得られる情報
  - 履歴
  - etc.

---

## コンテキスト、把握してますか？

<div style="margin-top: 3em; font-size: 1.5em !important;">
LLMがMCPから何を得ているか把握することにより、<br/>
より意図通りの出力を得やすくなります
</div>

---

## 皆さんの10分を頂戴して

<div style="margin-top: 2em; margin-bottom: 2em; font-size: 1.5em !important;">
Playwright MCPからLLMが何を得ているか、<br/>
一緒に深堀りしていきましょう！
</div>

※ Chrome DebTools MCPにも応用可能です

---

## 目次

- コンテキストエンジニアリングについて
- MCPサーバーの仕組み
  - initialize
  - tools/list
  - ツール呼び出し
- Playwright MCPの渡す情報
  - ソースコードを追う
  - demo
- まとめ

---

## MCPサーバーの仕組み


---

### 接続フロー（接続確立）

<div style="display: flex; justify-content: center;">
  <div style="background: #1e1e1e; padding: 0.1rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); border: 2px solid transparent; background-image: linear-gradient(#1e1e1e, #1e1e1e), linear-gradient(90deg, #00d4ff 0%, #007acc 100%); background-origin: border-box; background-clip: content-box, border-box;">

```mermaid {scale: 0.9, theme: 'dark'}
sequenceDiagram
    participant C as LLM
    participant S as MCP

    C->>S: initialize
    C->>S: notifications/initialized
    C->>S: tools/list
    S-->>C: ツール一覧
    C->>S: tools/call
```

  </div>
</div>

---

### MCPサーバーの仕組み - 詳細

<div style="margin-top: 4.5em;">

1. 初期セットアップ後
2. LLMはMCPサーバーに対してツール一覧を要求
3. MCPサーバーは利用可能なツールのリストをLLMに返す
4. LLMは必要に応じてツールを呼び出す

</div>



---
## ご清聴ありがとうございました

- Twitter: [@const_myself](https://twitter.com/const_myself)
- GitHub: [ogadra](https://github.com/ogadra)

<PoweredBySlidev mt-10 />

