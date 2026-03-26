import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'

export async function proxy(request: NextRequest) {
  // ユーザの認証セッションを更新する。
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * 以下で始まるリクエストパスの場合、proxy()が呼ばれない。
     * - _next/static（静的ファイル）
     * - _next/image （画像最適化ファイル）
     * - favicon.ico（ファビコン）
     * - svg・png・jpg・jpeg・gif・webp（画像ファイル）
     * これらのパスは、認証セッションの更新が不要なため除外する。
     * 必要に応じて、不要なパターンを追記する。
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}