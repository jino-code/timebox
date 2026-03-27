# コントリビューションガイド

## ブランチ戦略
- GitHub Flowを採用する。

## ブランチ命名規則
- ブランチは`<type>/<description>`の形式を採用する。
- type: docs, feat, fix, chore, test, refactorなど
- description: ハイフン区切り

## コミットメッセージ
- コミットメッセージは`<type>: <description>`の形式を採用する。
- type: docs, feat, fix, chore, test, refactorなど
- description: スペース区切り
- 変更内容が複数にわたる場合や判断の背景を残したい場合は、空行を挟んで本文を記載する。

## プルリクエスト
- タイトルはブランチの変更内容と一致させ、`<type>: <description>`の形式で記載する。
- 本文はテンプレートに従い、概要・変更内容・関連Issueを記載する。
- 関連IssueはPR本文に`Close #N`の形式で記載し、マージ時に自動でIssueを閉じる。
- PRテンプレートは`.github/PULL_REQUEST_TEMPLATE.md`で管理する。
- 原則として小さく切り、1PRに対して1Issueを対応させる。
- ただし、ドキュメント整備は例外として1PRに複数Issueをまとめる。
- マージ戦略はSquash and mergeを採用する。mainブランチの履歴をPR単位で一本化し、詳細はPRを参照することで追跡できる。

## Milestone / Issue
- Milestone: 大きな作業単位で作成する。タイトルは動詞で終わる形式で記載する。（例：「Cascadingアルゴリズムを実装する」）
- Issue: 個々のタスクごとに作成してMilestoneに紐づける。タイトルはMilestoneと同様に動詞で終わる形式で記載する。
- ラベル: typeと同じものを用意する。

## 言語規則
- ブランチ名・コミットメッセージ・PRタイトル: 英語
- PR本文・Milestone / Issue・コードコメント・ドキュメント: 日本語