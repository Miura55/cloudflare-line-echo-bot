# Cloudflare LINE Echo Bot
Cloudflare WrokerでLINE botを動かすサンプル

## 環境変数の追加
Messaging APIのチャネルシークレットを以下のコマンドで追加

```shell
npx wrangler secret put LINE_CHANNEL_ACCESS_TOKEN
```

ローカルで検証する時はレポジトリ直下に `.dev.vars` を作成し、以下の内容を記述

```shell
LINE_CHANNEL_ACCESS_TOKEN="YOUR_CHANNEL_ACCESS_TOKEN"
```

## ローカルでの検証
以下のコマンドでローカルで検証

```shell
npm run dev
```

## デプロイ
以下のコマンドでデプロイ

```shell
npm run deploy
```
