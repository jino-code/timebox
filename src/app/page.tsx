import Link from 'next/link';

function Top() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-4">
        <span className="text-xl font-bold">Timebox</span>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="px-4 py-2 border border-black text-sm rounded-full hover:bg-gray-50"
          >
            ログインはこちら
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-zinc-700"
          >
            新規登録はこちら
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center gap-8 px-6 text-center">
        <div className="flex flex-col items-center gap-4 max-w-md">
          <h1 className="text-2xl font-bold tracking-tight whitespace-nowrap">
            予定とタスクを、1つのタイムラインで。
          </h1>
          <p className="text-gray-500 text-base">
            スケジュールとタスクを1画面で管理。
            <br />
            いつやるか決まっていないタスクも気軽に登録できます。
          </p>
        </div>
      </main>
    </div>
  );
}

export default Top;
