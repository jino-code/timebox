'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import {
  insertTask,
  updateTaskById,
  deleteTaskById,
} from '@/repositories/tasks';

export type TaskState = {
  error: string;
  success: boolean;
};

export async function createTask(prevState: TaskState, formData: FormData) {
  const title = formData.get('title');
  const estimatedMinutesStr = formData.get('estimated_minutes');
  const memo = formData.get('memo');

  if (
    typeof title !== 'string' ||
    typeof estimatedMinutesStr !== 'string' ||
    typeof memo !== 'string'
  ) {
    return { error: '入力内容を確認してください。', success: false };
  }

  if (!title || !estimatedMinutesStr) {
    return { error: '空欄の項目があります。', success: false };
  }

  const estimatedMinutes = Number(estimatedMinutesStr);

  if (isNaN(estimatedMinutes) || estimatedMinutes <= 0) {
    return {
      error: '見込み時間は1以上の数値を入力してください。',
      success: false,
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: '認証エラーが発生しました。', success: false };
  }

  const { error: tasksError } = await insertTask(
    supabase,
    user.id,
    title,
    estimatedMinutes,
    memo,
  );

  if (tasksError) {
    return { error: tasksError.message, success: false };
  } else {
    revalidatePath('/dashboard');
    return { error: '', success: true };
  }
}

export async function updateTask(
  taskId: string,
  prevState: TaskState,
  formData: FormData,
) {
  const title = formData.get('title');
  const estimatedMinutesStr = formData.get('estimated_minutes');
  const memo = formData.get('memo');

  if (
    typeof title !== 'string' ||
    typeof estimatedMinutesStr !== 'string' ||
    typeof memo !== 'string'
  ) {
    return { error: '入力内容を確認してください。', success: false };
  }

  if (!title || !estimatedMinutesStr) {
    return { error: '空欄の項目があります。', success: false };
  }

  const estimatedMinutes = Number(estimatedMinutesStr);

  if (isNaN(estimatedMinutes) || estimatedMinutes <= 0) {
    return {
      error: '見込み時間は1以上の数値を入力してください。',
      success: false,
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: '認証エラーが発生しました。', success: false };
  }

  const { error: tasksError } = await updateTaskById(
    supabase,
    taskId,
    title,
    estimatedMinutes,
    memo,
  );

  if (tasksError) {
    return { error: tasksError.message, success: false };
  } else {
    revalidatePath('/dashboard');
    return { error: '', success: true };
  }
}

export async function deleteTask(taskId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: '認証エラーが発生しました。', success: false };
  }

  const { error: tasksError } = await deleteTaskById(supabase, taskId);

  if (tasksError) {
    return { error: tasksError.message, success: false };
  } else {
    revalidatePath('/dashboard');
    return { error: '', success: true };
  }
}
