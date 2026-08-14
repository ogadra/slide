# ogadra's Slide Archive

Slidevで作ったスライドを公開しているサイトです。

## 新しいスライドの作成

```bash
./create-slide.sh <英語名> <日本語名>
```

英語名はkebab-caseだけ受け付けます。実行すると `slidev/<英語名>/` に一式を作り、依存をインストールして、そのままdevサーバーが立ち上がります。

生成されるファイルは以下です。

- `package.json` - ビルドとエクスポートのスクリプト
- `slides.md` - スライド本体
- `components/Footer.vue` - 各ページ下部のフッター
- `components/LiveIcon.vue` - スライド同期の接続状態を切り替えるボタン
- `setup/connectionState.ts` - その接続状態
- `global-top.vue` / `global-bottom.vue` - 上の2つを全ページに差し込む
- `style.css` - 見出しやコードブロックの装飾
- `uno.config.ts` - UnoCSS設定
- `imgs/qr.png` - 空ファイル。スライドのQRコードに差し替える

## プロジェクト構造

```
.
├── slidev/              # 各スライド
├── home/                # トップページ（Hono）
├── scripts/             # 運用スクリプト（sync-slides.ts）
├── create-slide.sh      # スライド作成コマンド
└── CLAUDE.md            # Claude Code向けの指示
```

## 開発

```bash
cd slidev/[スライド名]

pnpm run dev          # devサーバー
pnpm run build        # このスライドだけビルド
pnpm run export:png   # サムネイル用のPNGを slides-export/ に書き出す
```

全体をビルドするなら、リポジトリのルートで `pnpm run build` です。

## デプロイ

```bash
pnpm run deploy:dev
pnpm run deploy:prd
```

スライドの成果物は `dist/slides/` に出て、WorkerがR2から読んで返します。static assetsとして上がるのは `dist/home/` だけです。

同期にはrcloneを使っていて、チェックサムを比べて変わったファイルだけを上げます。毎回全スライドが対象になるので、どれを同期するか選ぶ必要はありません。

rclone（Nix devShellに同梱）と、`.env` に置いたR2の認証情報が必要です。APIトークンは環境ごとに分けてあるので、devの同期が本番に書き込むことはありません。`.env.sample` を参照してください。
