import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  // ブラウザ用のSupabaseクライアントを生成する。
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
