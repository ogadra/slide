---
theme: purplin
title: 大興奮！Claude Codeはなぜ我々の価値観を変えるのか
info: Claude Codeの革新的な機能と開発フローへの影響について
colorSchema: 'dark'
drawings:
  enabled: false
transition: slide-left
mdc: true
canvasWidth: 960
---

<style>
h2 {
  padding-top: 30px;
}
</style>

# 大興奮！
# Claude Codeはなぜ
# 我々の価値観を変えるのか
## おがどら

---
layout: image-x
image: https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif
imageOrder: 2
---

# おがどら

座右の銘は<br/>
Done is better than perfect.

Claude Code Maxプラン契約中

Claude Codeが楽しすぎて、<br/>1日で198コミットしたことあり

---

## Claude Codeとは？

- AnthropicがリリースしたCLIツール
- コードベース**全体**を理解したコーディング支援
- インタラクティブな**CLI**体験
- **月額定額制**


---

契約1週目

```
ccusage monthly

┌──────────┬─────────────┐
│ Month    │  Cost (USD) │
├──────────┼─────────────┤
│ 2025-07  │     $371.42 │
└──────────┴─────────────┘
```

---

## コードベース**全体**を理解

<Comparison>
  <template #left>
    <ul>
      <li>単発のファイル編集</li>
      <li>局所的な理解</li>
      <li>手動でコンテキスト収集</li>
    </ul>
  </template>
  <template #right>
    <ul>
      <li>プロジェクト全体を把握</li>
      <li>ファイル間の関係性を理解</li>
      <li>一貫した変更提案</li>
    </ul>
  </template>
</Comparison>

---

## コードベース**全体**理解の実例

```bash
# 従来: 手動でファイルを探し回る
find . -name "*.ts" | grep component
cat src/components/Button.tsx
grep -r "handleClick" src/
```

```bash
# Claude Code: 一発で全体を理解
claude "Buttonコンポーネントのローディング状態を追加"
# → 関連するファイルを自動で特定・編集
# → テストファイルも同時に更新
# → 型定義も適切に変更
```

---

## インタラクティブな**CLI**体験

<Comparison leftTitle="従来のCLI" rightTitle="Claude Code">
  <template #left>
    <ul>
      <li>一方向の命令実行</li>
      <li>結果を見て次の命令を考える</li>
      <li>エラーが出たら手動で対処</li>
    </ul>
  </template>
  <template #right>
    <ul>
      <li>対話形式で進行</li>
      <li>途中で方向性を変更可能</li>
      <li>エラーも一緒に解決</li>
    </ul>
  </template>
</Comparison>

---

## インタラクティブ**CLI**の実例

```bash
# 従来のCLI
$ npm test
❌ 3 tests failed
$ # 手動でエラーを確認
$ # 一つずつ修正
$ # 再度テスト実行
```

```bash
# Claude Code
$ claude "テストを修正して"
Claude: テストの失敗を確認します...
Claude: 3つのテストが失敗していますね。修正しましょう
Claude: 修正完了！再実行しますか？
> はい
✅ All tests passed!
```

---

## **月額定額制**

<Comparison leftTitle="従来の料金体系" rightTitle="Claude Code">
  <template #left>
    <ul>
      <li>使用量に応じた従量課金</li>
      <li>予算の予測が困難</li>
      <li>使用を控えめにしがち</li>
    </ul>
  </template>
  <template #right>
    <ul>
      <li>月額固定料金</li>
      <li>使い放題で気兼ねなし</li>
      <li>積極的に活用できる</li>
    </ul>
  </template>
</Comparison>

---

## **月額定額制**の心理的効果

**従来の従量課金**:
- 「この作業にいくらかかるかな...」
- 「簡単な作業は自分でやろう」
- 使用を控えめにする心理

**Claude Code定額制**:
- 「どんどん使おう！」
- 「小さな作業も任せよう」
- 積極的に活用する心理

→ **開発効率が劇的に向上**

---

## 価値観の変化 #1
### 「コードを書く」から「問題を解決する」へ

**従来**: 
- どうコードを書くかを考える
- 実装の詳細に集中

**Claude Code後**:
- 何を解決したいかを伝える
- 問題解決に集中できる

---

## 価値観の変化 #2
### 「完璧を目指す」から「素早く試す」へ

**従来**: 
- 慎重に設計してから実装
- 失敗を恐れて動けない

**Claude Code後**:
- とりあえず動くものを作る
- 素早く試行錯誤できる

---

## 価値観の変化 #3
### 「個人の技術力」から「AIとの協働力」へ

**従来**: 
- 個人のスキルが全て
- 知識の蓄積が重要

**Claude Code後**:
- AIとの対話スキルが重要
- 問題発見・定義力が重要

---

## 実際の開発体験

- バグ修正：症状を説明するだけで原因特定
- 機能追加：要件を伝えるだけで実装
- リファクタリング：目的を説明するだけで最適化
- テスト：「このコンポーネントのテストを書いて」

---

## 開発者の未来

- コードを書く時間 ↓
- 問題を考える時間 ↑
- 価値創造に集中
- より創造的な作業へシフト

---

## まとめ

Claude Codeは単なるツールではなく、<br/>
**開発者の思考と価値観を変える**革新的な体験

- 問題解決重視の思考
- 素早い試行錯誤
- AIとの協働スキル

これが我々の価値観を変える理由です！

---

ご清聴ありがとうございました

- Twitter: [@const_myself](https://twitter.com/const_myself)
- GitHub: [ogadra](https://github.com/ogadra)

<PoweredBySlidev mt-10 />
