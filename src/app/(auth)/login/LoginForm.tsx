'use client';

import { useActionState } from 'react';
import { login, AuthState } from '../actions';

function LoginForm() {
  const [state, action] = useActionState<AuthState, FormData>(login, {
    error: '',
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form action={action} className="bg-white shadow-md rounded-lg p-8 w-80">
        <div>
          <label className="block mb-1">メールアドレス</label>
          <input
            type="text"
            name="email"
            className="border rounded w-full p-2 mb-4 outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block mb-1">パスワード</label>
          <input
            type="password"
            name="password"
            className="border rounded w-full p-2 mb-4 outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <button className="w-full py-2 bg-black text-white rounded hover:bg-zinc-700">
            ログイン
          </button>
          {state.error && <p>エラー: {state.error}</p>}
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
