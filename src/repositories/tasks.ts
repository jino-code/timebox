import { SupabaseClient } from '@supabase/supabase-js';
import { addDays } from 'date-fns';

import { Task } from '@/types/task';

export async function getInboxTasks(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('status', 'INBOX')
    .is('deleted_at', null)
    .returns<Task[]>();

  return { data, error };
}

export async function getDailyTasks(supabase: SupabaseClient, date: string) {
  const startOfDay = new Date(`${date}T00:00:00+09:00`);

  const endOfDay = addDays(startOfDay, 1);

  // start_timeで絞り込む。日を跨ぐタスクは開始日の予定として扱うため。
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('status', 'SCHEDULED')
    .is('deleted_at', null)
    .gte('start_time', startOfDay.toISOString())
    .lt('start_time', endOfDay.toISOString())
    .returns<Task[]>();

  return { data, error };
}

export async function insertTask(
  supabase: SupabaseClient,
  userId: string,
  title: string,
  estimatedMinutes: number,
  memo: string,
) {
  const { error } = await supabase.from('tasks').insert({
    user_id: userId,
    title,
    estimated_minutes: estimatedMinutes,
    memo,
  });

  return { error };
}

export async function updateTaskById(
  supabase: SupabaseClient,
  taskId: string,
  title: string,
  estimatedMinutes: number,
  jstStartTime: string | null,
  jstEndTime: string | null,
  status: string,
  memo: string,
) {
  const { error } = await supabase
    .from('tasks')
    .update({
      title,
      estimated_minutes: estimatedMinutes,
      start_time: jstStartTime,
      end_time: jstEndTime,
      status,
      memo,
    })
    .eq('id', taskId);

  return { error };
}

export async function deleteTaskById(supabase: SupabaseClient, taskId: string) {
  const { error } = await supabase
    .from('tasks')
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq('id', taskId);

  return { error };
}
