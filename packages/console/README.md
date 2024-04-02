# 開発用のメモ

- 基本的な考え方は Atomic パターンやコンテナ・プレゼンテーションパターンを参考
- 複雑にしたくないので Next.js はルーティングでのみ活用する
  - SSR 機能等は使用しない

# プロジェクト構造

`/src/pages/`

- ページコンポーネント
  - URL のハンドリングを行う
  - MVC でいうコントローラー層？
  - これより下位のコンポーネントは URL に関心を持たない

`/src/components/`

`/pages/`

- `{PageName}.tsx`（ページコンテナコンポーネント）
  - データの取得および、取得結果を下位のテンプレートコンポーネントに渡す
  - イベントハンドリング当のビジネスロジックを定義する
  - Container / Presenter パターンの container
  - ビジネスデータをステートに持つ
- `{PageName}Template.tsx`（テンプレートコンポーネント）
  - 受け取ったデータの表示を担う
  - Container / Presenter パターンの Presenter
  - これより下位コンポーネントはドメイン知識を持たない
    - UI 用のステートは OK

`/ui/`

- `{ComponentName}.tsx`（UI コンポーネント）

  - ドメイン知識を待たないコンポーネント
  - organisms / molecules / atoms をまとめて UI コンポーネントとする（コンポーネントが多くなったら分割する）

- story は テンプレート以下のコンポーネントを作成する


# @ebay/nice-modal-react メモ

- NiceModal.show は NiceModal.create で作成されたコンポーネントしか呼び出せない
- NiceModal.create で作成されたコンポーネントをラップしたコンポーネントを NiceModal.show で呼び出した場合、NiceModal.show の args で渡した値がラップされたコンポーネントに渡されず、NiceModal.create で作成したコンポーネントに直接渡されるので注意
- 同一モーダルのネストができない -> ConfirmDialog などを都度 NiceModal.create するのは面倒なのでどうにかしたい