<p align="center">
  <a href="https://www.newt.so/">
    <img src="https://user-images.githubusercontent.com/3859812/155490725-80ed1f06-996e-407f-8f63-fd54f0acaf14.svg" alt="Newt" width="70" height="57" />
  </a>
</p>
<h3 align="center">
Newt's starter
</h3>
<p align="center">
  <a href="https://newt-starter-nextjs-updates.vercel.app/">Demo</a> | <a href="https://www.newt.so/">Newt</a>
</p>

## 概要

[Newt](https://www.newt.so/) と [Next.js](https://nextjs.org/) を利用したアップデートノートです。<br />
[App Router](https://nextjs.org/docs/app) を用いて、アップデートノートを作成してみたい方はぜひお試しください。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FNewt-Inc%2Fnewt-starter-nextjs-updates)

## 開発をはじめる

### Step1: Newt スペースをセットアップ

1. スペースを作成します
   - スペース UID を控えておきましょう。スペース UID は 管理画面 URL（ `https://app.newt.so/{スペースUID}` ） もしくは スペース設定 > 一般 から確認できます。
2. App を作成します
   - App テンプレートから作成する場合、**Updates**を選択し「このテンプレートを追加」をクリックしてください。
   - AppUID を控えておきましょう。AppUID は管理画面 URL（ `https://app.newt.so/{スペースUID}/app/{AppUID}` ） または App 設定 > 一般 から確認できます。
3. スペース設定 > API キー から CDN API トークンを作成します

### Step2: .env.local ファイルを作成する

[.env.local.example](https://github.com/Newt-Inc/newt-starter-nextjs-updates/blob/main/.env.local.example) ファイルを参考に、`.env.local` ファイルを作成します。<br />
Step1 で取得したスペース UID・AppUID・CDN API トークンの値を設定します。

```conf
NEXT_PUBLIC_NEWT_SPACE_UID=スペースUID
NEXT_PUBLIC_NEWT_APP_UID=updates
NEXT_PUBLIC_NEWT_API_TOKEN=CDN APIトークン
NEXT_PUBLIC_NEWT_API_TYPE=cdn
NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID=article
NEXT_PUBLIC_NEWT_CATEGORY_MODEL_UID=category
NEXT_PUBLIC_PAGE_LIMIT=12
```

Next.js における環境変数の扱いについては、[公式ドキュメント](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)を参照してください。

### Step3: dev サーバーを起動する

Yarn を使う

```bash
# 依存パッケージをインストール
$ yarn install

# localhost:3000でdevサーバーを起動
$ yarn dev
```

npm を使う

```bash
# 依存パッケージをインストール
$ npm install

# localhost:3000でdevサーバーを起動
$ npm run dev
```

## ページの構成

| ページ                   | パス                                                                                    | ファイル                                                                                                                           |
| ------------------------ | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 一覧                     | /                                                                                       | [ソース](https://github.com/Newt-Inc/newt-starter-nextjs-updates/blob/main/app/page.tsx)                                           |
| 一覧<br>（ページ遷移時） | /page/1・/page/2...                                                                     | [ソース](https://github.com/Newt-Inc/newt-starter-nextjs-updates/blob/main/app/page/%5Bpage%5D/page.tsx)                           |
| カテゴリで絞り込み       | /categories/improved<br>/categories/improved/1・/categories/improved/2…（ページ遷移時） | [ソース](https://github.com/Newt-Inc/newt-starter-nextjs-updates/blob/main/app/categories/%5Bslug%5D/%5B%5B...page%5D%5D/page.tsx) |
| 検索結果                 | /search?q=hoge                                                                          | [ソース](https://github.com/Newt-Inc/newt-starter-nextjs-updates/blob/main/app/search/page.tsx)                                    |
| 詳細                     | /articles/article-1                                                                     | [ソース](https://github.com/Newt-Inc/newt-starter-nextjs-updates/blob/main/app/articles/%5Bslug%5D/page.tsx)                       |

## モデルの定義

`Updates` app の中に Article・Author・Category の 3 つのモデルを作ります。

| App 名（任意） | モデル名（モデル UID） |
| -------------- | ---------------------- |
| Updates        | Article (`article`)    |
|                | Author (`author`)      |
|                | Category (`category`)  |

### Article（`uid: article`）モデル

| フィールド ID | フィールド名 | フィールドタイプ           | オプション                                         |
| ------------- | ------------ | -------------------------- | -------------------------------------------------- |
| title         | タイトル     | テキスト                   | 必須フィールド<br />このフィールドをタイトルに使う |
| slug          | スラッグ     | テキスト                   | 必須フィールド<br />一意の文字列（ユニーク）       |
| meta          | メタ情報     | カスタムフィールド         |                                                    |
| body          | 本文         | Markdown or リッチテキスト | 必須フィールド                                     |
| author        | 著者         | 参照（Author モデル）      | 必須フィールド                                     |
| categories    | カテゴリ     | 参照（Category モデル）    | 複数値<br />必須フィールド                         |

### Author（`uid: author`）モデル

| フィールド ID | フィールド名     | フィールドタイプ | オプション                                         |
| ------------- | ---------------- | ---------------- | -------------------------------------------------- |
| fullName      | 名前             | テキスト         | 必須フィールド<br />このフィールドをタイトルに使う |
| profileImage  | プロフィール画像 | 画像             |                                                    |

### Category（`uid: category`）モデル

| フィールド ID | フィールド名 | フィールドタイプ | オプション                                         |
| ------------- | ------------ | ---------------- | -------------------------------------------------- |
| emoji         | 絵文字       | 絵文字           | 必須フィールド                                     |
| name          | 名前         | テキスト         | 必須フィールド<br />このフィールドをタイトルに使う |
| slug          | スラッグ     | テキスト         | 必須フィールド<br />一意の文字列（ユニーク）       |
| colorCode     | 色コード     | カラー           | 必須フィールド                                     |

### メタ情報（`id: META`）カスタムフィールドタイプ

| フィールド ID | フィールド名       | フィールドタイプ | オプション |
| ------------- | ------------------ | ---------------- | ---------- |
| title         | タイトル           | テキスト         |            |
| description   | ディスクリプション | テキスト         |            |
| ogImage       | OG 画像            | 画像             |            |

## License

[MIT License](https://github.com/Newt-Inc/newt-starter-nextjs-updates/blob/main/LICENSE)
