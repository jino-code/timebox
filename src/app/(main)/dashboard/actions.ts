'use server';

import { revalidatePath } from 'next/cache';
import { isBefore } from 'date-fns';

import { createClient } from '@/lib/supabase/server';
import {
  insertTask,
  updateTaskById,
  deleteTaskById,
} from '@/repositories/tasks';
import { insertSchedule, updateScheduleById } from '@/repositories/schedules';

export type TaskState = {
  error: string;
  success: boolean;
};

export type ScheduleState = {
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

export async function createSchedule(
  prevState: ScheduleState,
  formData: FormData,
) {
  const title = formData.get('title');
  const startTime = formData.get('start_time');
  const endTime = formData.get('end_time');
  const memo = formData.get('memo');

  if (
    typeof title !== 'string' ||
    typeof startTime !== 'string' ||
    typeof endTime !== 'string' ||
    typeof memo !== 'string'
  ) {
    return { error: '入力内容を確認してください。', success: false };
  }

  if (!title || !startTime || !endTime) {
    return { error: '空欄の項目があります。', success: false };
  }

  if (!isBefore(new Date(startTime), new Date(endTime))) {
    return {
      error: '終了時間は開始時間より後に設定してください。',
      success: false,
    };
  }

  const jstStartTime = `${startTime}+09:00`;
  const jstEndTime = `${endTime}+09:00`;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: '認証エラーが発生しました。', success: false };
  }

  const { error: schedulesError } = await insertSchedule(
    supabase,
    user.id,
    title,
    jstStartTime,
    jstEndTime,
    memo,
  );

  if (schedulesError) {
    return { error: schedulesError.message, success: false };
  } else {
    revalidatePath('/dashboard');
    return { error: '', success: true };
  }
}

export async function updateSchedule(
  scheduleId: string,
  prevState: ScheduleState,
  formData: FormData,
) {
  const title = formData.get('title');
  const startTime = formData.get('start_time');
  const endTime = formData.get('end_time');
  const memo = formData.get('memo');

  if (
    typeof title !== 'string' ||
    typeof startTime !== 'string' ||
    typeof endTime !== 'string' ||
    typeof memo !== 'string'
  ) {
    return { error: '入力内容を確認してください。', success: false };
  }

  if (!title || !startTime || !endTime) {
    return { error: '空欄の項目があります。', success: false };
  }

  if (!isBefore(new Date(startTime), new Date(endTime))) {
    return {
      error: '終了時間は開始時間より後に設定してください。',
      success: false,
    };
  }

  const jstStartTime = `${startTime}+09:00`;
  const jstEndTime = `${endTime}+09:00`;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: '認証エラーが発生しました。', success: false };
  }

  const { error: schedulesError } = await updateScheduleById(
    supabase,
    scheduleId,
    title,
    jstStartTime,
    jstEndTime,
    memo,
  );

  if (schedulesError) {
    return { error: schedulesError.message, success: false };
  } else {
    revalidatePath('/dashboard');
    return { error: '', success: true };
  }
}
