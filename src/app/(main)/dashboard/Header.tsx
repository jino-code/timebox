'use client';

import Link from 'next/link';
import { logout } from '../../(auth)/actions';

function Header() {
  return (
    <div className="bg-white shadow-md p-4 w-full flex justify-between items-center">
      <Link href="/dashboard" className="text-xl font-bold hover:underline">
        Timebox
      </Link>
      <form action={logout}>
        <button className="hover:underline">ログアウト</button>
      </form>
    </div>
  );
}

export default Header;
