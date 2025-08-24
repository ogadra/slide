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
├── create-slide.sh      # スライド作成コマンド
└── CLAUDE.md            # プロジェクトガイドライン
```

## 🛠 開発

### 既存スライドの編集

```bash
cd slidev/[スライド名]
npm run dev
```

### ビルド

```bash
# 全体ビルド
npm run build

# 個別スライドビルド
cd slidev/[スライド名]
npm run build
```

### PNG エクスポート

```bash
cd slidev/[スライド名]
npm run export:png
```

## 🌐 デプロイ

```bash
wrangler deploy
```

Cloudflare Workersにデプロイされ、静的アセットとしてスライドが配信されます。

## 📝 使用技術

- **Slidev** - プレゼンテーション作成
- **Hono** - ウェブフレームワーク
- **Cloudflare Workers** - ホスティングプラットフォーム
- **UnoCSS** - CSSフレームワーク
- **TypeScript** - 型安全性
- **Vite** - ビルドツール
