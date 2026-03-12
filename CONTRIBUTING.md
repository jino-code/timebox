# コントリビューションガイド

## ブランチ戦略
GitHub Flowを採用する。

## ブランチ命名規則
ブランチは`<type>/<description>`の形式を採用する。
type: docs, feat, fix, chore, test, refactorなど
description: ハイフン区切り

## コミットメッセージ
コミットメッセージは`<type>: <description>`の形式を採用する。
type: docs, feat, fix, chore, test, refactorなど
description: スペース区切り

## プルリクエスト
- タイトルはブランチ名と対応させ、`<type>: <description>`の形式で記載する。
- 本文はテンプレートに従い、概要・変更内容・関連Issueを記載する。
- 関連IssueはPR本文に`Close #N`の形式で記載し、マージ時に自動でIssueを閉じる。
- PRテンプレートは`.github/PULL_REQUEST_TEMPLATE.md`で管理する。

## Milestone / Issue
- Milestone: 大きな作業単位で作成する。タイトルは動詞で終わる形式で記載する。（例：「Cascadingアルゴリズムを実装する」）
- Issue: 個々のタスクごとに作成してMilestoneに紐づける。タイトルはMilestoneと同様に動詞で終わる形式で記載する。
- ラベル: typeと同じものを用意する。

## 言語規則
- ブランチ名・コミットメッセージ・PRタイトル: 英語
- PR本文・Milestone / Issue・コードコメント・ドキュメント: 日本語