import Link from 'next/link';

import { logout } from '../(auth)/actions';

function mainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-4 w-full flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold hover:underline">
          Timebox
        </Link>
        <form action={logout}>
          <button className="hover:underline">ログアウト</button>
        </form>
      </div>
      <main>{children}</main>
    </div>
  );
}

export default mainLayout;
