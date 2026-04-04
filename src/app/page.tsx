import Link from 'next/link';

function Top() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Link
        href="/login"
        className="px-6 py-3 bg-black text-white rounded-full hover:bg-zinc-700"
      >
        ログインはこちら
      </Link>
      <Link
        href="/signup"
        className="px-6 py-3 bg-black text-white rounded-full hover:bg-zinc-700"
      >
        ユーザー登録はこちら
      </Link>
    </div>
  );
}

export default Top;
