# Quiz Front POC (Proof of Concept)

インタラクティブなクイズ UI のプロトタイプフロントエンドアプリケーションです。複数のクイズタイプをサポートし、モダンでレスポンシブな UI を提供します。

## 機能概要

-   **10 種類のクイズタイプをサポート**:

    -   テキスト問題 (`text`)
    -   画像付き問題 (`image`)
    -   動画付き問題 (`video`)
    -   音声付き問題 (`audio`)
    -   画像選択問題 (`imageChoice`)
    -   複数回答問題 (`multiAnswer`)
    -   順序選択問題 (`orderSelection`)
    -   文字順序問題 (`characterOrder`)
    -   組み合わせ問題 (`combination`)
    -   数字入力問題 (`numberInput`)

-   **デバッグモード**: 開発中に各種クイズタイプのテストと動作確認が可能
-   **テスト駆動開発(TDD)**: 各コンポーネントに対する包括的なテストスイート
-   **レスポンシブデザイン**: モバイルからデスクトップまで様々な画面サイズに対応
-   **アクセシビリティ**: キーボードナビゲーションやスクリーンリーダー対応

## 技術スタック

-   **フレームワーク**: React 19
-   **言語**: TypeScript
-   **ビルドツール**: Vite
-   **スタイリング**: TailwindCSS
-   **テスト**: Vitest, React Testing Library
-   **リント**: Biome
-   **デプロイ**: Cloudflare Pages

## プロジェクト構造

```
quiz-front-poc/
├── src/                  # ソースコード
│   ├── components/       # Reactコンポーネント
│   │   ├── quiz/         # 各種クイズタイプのコンポーネント
│   │   │   ├── TextQuiz.tsx
│   │   │   ├── ImageQuiz.tsx
│   │   │   ├── VideoQuiz.tsx
│   │   │   ├── AudioQuiz.tsx
│   │   │   ├── ImageChoiceQuiz.tsx
│   │   │   ├── MultiAnswerQuiz.tsx
│   │   │   ├── OrderSelectionQuiz.tsx
│   │   │   ├── CharacterOrderQuiz.tsx
│   │   │   ├── CombinationQuiz.tsx
│   │   │   ├── NumberInputQuiz.tsx
│   │   │   ├── QuizItem.tsx        # クイズタイプのディスパッチャー
│   │   │   └── ChoiceList.tsx      # 選択肢リスト共通コンポーネント
│   │   ├── debug/        # デバッグ用コンポーネント
│   │   │   ├── DebugManager.tsx    # デバッグ機能の管理
│   │   │   └── DebugModal.tsx      # デバッグUIモーダル
│   │   ├── QuizApp.tsx   # メインアプリケーションコンポーネント
│   │   ├── QuizComplete.tsx # クイズ完了画面
│   │   ├── QuizDemo.tsx  # デモ用コンポーネント
│   │   └── SingleQuizView.tsx # 単一クイズ表示コンポーネント
│   ├── types/            # 型定義
│   │   └── quiz.ts       # クイズ関連の型定義
│   ├── data/             # データファイル
│   │   └── sampleQuizData.ts # サンプルクイズデータ
│   └── lib/              # ユーティリティ関数
│       └── utils.ts      # 汎用ユーティリティ
├── public/               # 静的ファイル
├── .cursor/              # Cursor IDE設定
│   └── docs/             # ドキュメント
│       ├── 01_task-execution-guide.md
│       ├── 03_tdd-guide.md
│       └── 04_technology-stack.md
└── wrangler.toml         # Cloudflare Pages設定
```

## 開発方法

### 依存関係のインストール

```bash
pnpm install
```

### 開発サーバーの起動

```bash
pnpm dev
```

### テストの実行

```bash
# 全テストの実行
pnpm test

# 特定のテストファイルの実行
pnpm test src/components/quiz/__tests__/TextQuiz.test.tsx

# ウォッチモードでテスト実行
pnpm test:watch

# カバレッジレポート生成
pnpm test:coverage
```

### ビルドの実行

```bash
pnpm build
```

### リントとフォーマット

```bash
# リント実行
pnpm lint

# 自動修正を含むリント
pnpm lint:fix

# 型チェック
pnpm typecheck
```

### デプロイ

```bash
# 本番環境へのデプロイ
pnpm deploy

# 開発環境へのデプロイ
pnpm deploy:dev

# プレビュー環境へのデプロイ
pnpm deploy:preview
```

## クイズタイプ

各クイズタイプの特徴と使用例については以下をご参照ください：

### テキスト問題 (text)

テキストのみの問題と選択肢を表示します。

### 画像付き問題 (image)

質問に関連する画像と選択肢を表示します。

### 動画付き問題 (video)

質問に関連する動画と選択肢を表示します。

### 音声付き問題 (audio)

質問に関連する音声と選択肢を表示します。

### 画像選択問題 (imageChoice)

選択肢がテキストではなく画像になっている問題です。

### 複数回答問題 (multiAnswer)

複数の正解がある問題で、ユーザーは複数の選択肢を選べます。

### 順序選択問題 (orderSelection)

正しい順序に項目を並べ替える問題です。

### 文字順序問題 (characterOrder)

バラバラになった文字を正しい順序に並べ替える問題です。

### 組み合わせ問題 (combination)

左右のアイテムを正しく組み合わせる問題です。

### 数字入力問題 (numberInput)

特定の数値を入力する問題です。桁数制限があります。

## ライセンス

このプロジェクトは MIT ライセンスの下で提供されています。

## 貢献

バグ報告や機能リクエストは[Issue ページ](https://github.com/noplan-inc/quiz-front-poc/issues)から行えます。
Pull Request は大歓迎です。大きな変更を行う場合は、まず Issue で議論することをお勧めします。
