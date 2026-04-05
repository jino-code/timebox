'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export type AuthState = {
  error: string;
};

export async function signUp(prevState: AuthState, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof confirmPassword !== 'string'
  ) {
    return { error: '入力内容を確認してください。' };
  }

  if (!email || !password || !confirmPassword) {
    return { error: '空欄の項目があります。' };
  }

  if (password !== confirmPassword) {
    return { error: 'パスワードが一致しません。' };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect('/');
}

export async function login(prevState: AuthState, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return { error: '入力内容を確認してください。' };
  }

  if (!email || !password) {
    return { error: '空欄の項目があります。' };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect('/dashboard');
}

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect('/');
}
