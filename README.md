# ogadra's Slide Archive

個人のスライドアーカイブサイトです。Slidevを使用して作成したプレゼンテーションを管理・公開しています。

## 🚀 新しいスライドの作成

### スライド作成コマンド

```bash
./create-slide.sh <英語名> <日本語名>
```

**例:**
```bash
./create-slide.sh my-awesome-presentation "私の素晴らしいプレゼンテーション"
```
### 作成されるファイル

- `package.json` - プロジェクト設定とビルドスクリプト
- `slides.md` - メインのスライドコンテンツ
- `components/Footer.vue` - フッターコンポーネント
- `global-bottom.vue` - グローバルフッター設定
- `style.css` - カスタムスタイル
- `uno.config.ts` - UnoCSS設定

## 📁 プロジェクト構造

```
.
├── slidev/              # 個別のスライドプレゼンテーション
├── home/                # ホームページ（Hono）
├── scripts/             # 運用スクリプト（sync-slides.ts）
├── create-slide.sh      # スライド作成コマンド
└── CLAUDE.md            # プロジェクトガイドライン
```

## 🛠 開発

### 既存スライドの編集

```bash
cd slidev/[スライド名]
pnpm run dev
```

### ビルド

```bash
# 全体ビルド
pnpm run build

# 個別スライドビルド
cd slidev/[スライド名]
pnpm run build
```

### PNG エクスポート

```bash
cd slidev/[スライド名]
pnpm run export:png
```

## 🌐 デプロイ

```bash
# ビルド、R2への同期、Workerのデプロイまで
pnpm run deploy:dev
pnpm run deploy:prd

# デプロイせず同期だけ
pnpm run sync:dev
pnpm run sync:prd
```

スライドの成果物は `dist/slides/` に出て、R2から配信されます。static assetsとしてデプロイされるのは `dist/home/` だけです。

同期は `rclone sync --checksum` なので、毎回全スライドを比較して差分だけをアップロードします。どれを同期するか選ぶ必要はありません。

`rclone`（Nix devShellに同梱）と、`.env` に置いたR2の認証情報が必要です。APIトークンは環境ごとに分けてあるので、devの同期が本番に書き込むことはありません。`.env.sample` を参照してください。

## 📝 使用技術

- **Slidev** - プレゼンテーション作成
- **Hono** - ウェブフレームワーク
- **Cloudflare Workers** - ホスティングプラットフォーム
- **Cloudflare R2** - スライド成果物の保管
- **UnoCSS** - CSSフレームワーク
- **TypeScript** - 型安全性
- **Vite** - ビルドツール
