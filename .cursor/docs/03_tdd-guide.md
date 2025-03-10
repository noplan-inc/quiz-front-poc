# テスト駆動開発 (TDD) の基本 – Vitest + TypeScript

テスト駆動開発（TDD）は、テストを先に書き、そのテストに合わせて実装コードを書く開発手法です。Vitest（Vite ベースの高速なテストフレームワーク）と TypeScript を用いた環境を例に、TDD の基本サイクルや重要な考え方、リファクタリング時に活用するツールについて解説します。

## 基本概念

TDD では、小さな単位で **Red→Green→Refactor** のサイクルを繰り返しながら開発を進めます。まず「Red」フェーズで失敗するテストを書き、次に「Green」フェーズでテストが通る最小限の実装コードを書きます。テストがグリーンになったら「Refactor」フェーズでリファクタリング（コードの整理・最適化）を行います。この一連の流れを機能ごとに何度も反復し、機能追加とコード品質改善を両立させるのが TDD です。また、Red/Green という名称は、テスティングフレームワークで失敗時に赤、成功時に緑の表示がされることに由来します。

1. **Red (レッド)** – まず新たに実装したい機能に対して**失敗するテスト**を書きます。まだ実装がないためこのテストは失敗します。何を実現すべきか（期待する動作）をテストとして明文化するステップです。
2. **Green (グリーン)** – Red で書いたテストが**通るように**、必要最小限の実装コードを書きます。テストがグリーン（成功）になることを最優先し、この段階では動作させるための暫定的な実装で構いません。
3. **Refactor (リファクタ)** – テストが通ったら、**リファクタリング**を行いコードを改善します。重複の排除や変数名の整理、設計の見直しなどを行います。ただし**動作は変えない**ことが重要で、リファクタ後もテストがすべてグリーンであることを確認します。

## 重要な考え方

-   **テストは仕様である**: テストコードは実装の**仕様**（要件）を表現したものです。テストはソフトウェアの期待される振る舞いを明示し、実行可能な仕様書の役割を果たします。テストが全て通るということは、その範囲においてコードが仕様どおり動作していることを意味します。

-   **Assert-Act-Arrange の順序で考える**: テストコードを書く際は、通常の「Arrange-Act-Assert」ではなく**期待結果から逆算**して考えると分かりやすくなります。すなわち次の順序でテストを設計します:

    1. まず**期待する結果**（アサーション条件）を定義する – *「どんな結果が得られればテストが合格となるか？」*を考える。
    2. 次に**操作**（テスト対象の処理・アクション）を定義する – *「どのメソッドや関数を実行すればその結果が得られるか？」*を決める。
    3. 最後に**準備**（テスト環境や入力データのセットアップ）を行う – *「その操作を実行するためにどんな前提条件やデータが必要か？」*を整える。

    こうすることでテストが冗長にならず、「何を検証したいか」にフォーカスした明確なテストコードを書けます。

-   **テスト名は「状況 → 操作 → 結果」の形式で記述**: テストケースの名前（説明）は、**前提条件（状況）**・**操作**・**期待結果**がひと目で分かるように書きます。例えば以下のように記述すると、テストの意図が明確になります。

    _例_: 「**有効なトークンの場合に**ユーザー情報を取得すると**成功すること**」  
     _(状況: トークンが有効、操作: ユーザー情報を取得する処理を呼ぶ、結果: 成功する)_

    このように書くことで、失敗時のメッセージも分かりやすくなり、何をテストしているのかが一目で理解できます。

## リファクタリングフェーズの重要ツール

テストが全てグリーンになった後のリファクタリングフェーズでは、コードの品質を高めるために以下のツールを活用します。リファクタリングは動作を変えずに内部構造を改善する作業なので、これらのツールで不備がないか確認しつつ進めると安全です。

1. **静的解析・型チェック** – TypeScript のコンパイラによる型チェックを行います。`tsc --noEmit` コマンドでコードをコンパイルし、型エラーや未使用変数などの問題がないか確認します。コンパイルエラーがない状態を保つことで、低レベルの不具合を早期に検出できます。

2. **Linter チェック** – コードリント（静的解析ツール）を使ってコードスタイルの統一や潜在的なバグの検知を行います。例えば `biome check .` コマンドでプロジェクト全体のコードをチェックし、規約違反や改善点を洗い出します。リンターを導入することで、手作業では見落としがちなコードの臭いやミスを自動で指摘できます。

3. **コードカバレッジ測定** – テストの網羅率を確認します。`vitest --coverage` を実行すると、どのコードがテストで実行されたかをレポートできます。カバレッジレポートを参考にして、重要なロジックにテスト漏れがないかチェックしましょう。網羅率 100%が必須というわけではありませんが、カバレッジが低い部分はバグが潜みやすいため追加のテストを検討します。

4. **Git によるバージョン管理** – コード変更の履歴をこまめに残し、いつでも前の状態に戻せるようにします。特に各フェーズ（テスト作成 → 実装 → リファクタリング）の完了時にコミットする習慣をつけると良いでしょう。タスク完了時には以下の手順で変更内容を確認してコミットします:

    ```bash
    git status    # 変更状態を確認
    git add <変更したファイル>
    git commit -m "<適切なコミットメッセージ>"
    ```

    コミットメッセージには、変更内容を簡潔に表すメッセージを付けます。加えて、以下のようなプレフィックス（接頭辞）を付けることで内容の種類がひと目で分かるようにします:

    - `test:` テストコードの追加・修正に関するコミット
    - `feat:` 新機能の実装に関するコミット
    - `refactor:` リファクタリング（機能追加やバグ修正を含まない純粋な改善）のコミット

    _（例：「`test: ユーザー認証周りのバリデーションテストを追加`」といったメッセージにする）_  
    このようにコミットを分類しておくと、後で履歴を振り返る際に変更の目的が分かりやすくなります。
