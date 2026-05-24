# Timebox

## デモ

URL: https://timebox-blond.vercel.app/

テストアカウント
- メールアドレス: timebox.guest@example.com
- パスワード: timeboxguest

## 概要

予定とタスクを1つのアプリで一元管理する。

## 開発背景

タスク管理にNotion、スケジュール管理にGoogleカレンダーを使っていたが、2つのアプリを行き来する手間がストレスになっていた。
そこで、GoogleカレンダーのTODOリストに移行したが、カレンダーでスケジュールを確認しながらTODOリストで日時を入力し、
再びカレンダーに戻って確認するという往復操作が発生し、使いづらかった。
この手間をなくすために、インボックスとタイムラインをタブ切り替えで、1つのアプリ内で完結できるTimeboxを開発することにした。

## MVP

- 日次ビュー
- インボックス
- タスク移動(編集機能による移動方式)
- 認証（Supabase Auth）

## 技術スタック

- フロントエンド / バックエンド: TypeScript / Next.js
- ミドルウェア: Supabase（PostgreSQL・Auth・RLS）
- インフラ: Vercel
- CI/CD: GitHub Actions
- テスト: Vitest