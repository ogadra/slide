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
├── scripts/             # 運用スクリプト（sync-slides.sh）
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

### スライドの公開

スライドの成果物はR2に置いてあり、デプロイには含まれません。内容を変えたスライドだけを同期します。

```bash
# 特定のスライドを同期
./scripts/sync-slides.sh --env prd <スライド名>

# 全スライドを同期（Slidevのバージョンを上げたときなど）
./scripts/sync-slides.sh --env prd --all
```

`rclone`（Nix devShellに同梱）と、`.env` に置いたR2の認証情報が必要です。`.env.sample` を参照してください。

### Workerのデプロイ

```bash
wrangler deploy
```

`home/` の成果物が静的アセットとしてCloudflare Workersにデプロイされます。スライド本体はR2から配信されます。

## 📝 使用技術

- **Slidev** - プレゼンテーション作成
- **Hono** - ウェブフレームワーク
- **Cloudflare Workers** - ホスティングプラットフォーム
- **Cloudflare R2** - スライド成果物の保管
- **UnoCSS** - CSSフレームワーク
- **TypeScript** - 型安全性
- **Vite** - ビルドツール
