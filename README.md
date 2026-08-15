# ogadra's Slide Archive

おがどらの登壇資料アーカイブ置き場

## スライド作成

```bash
./create-slide.sh <英語名> <日本語名>
```

## プロジェクト構造

```
.
├── slidev/              # 各スライド
├── home/                # トップページ
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

トップページやWorkerの挙動を見るときは、ルートで `pnpm dev` を実行する。

## デプロイ

```bash
pnpm run deploy:dev
pnpm run deploy:prd
```

ビルド成果物は `dist/` に出て、R2が返す。
