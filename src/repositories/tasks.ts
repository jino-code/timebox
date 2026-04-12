import { SupabaseClient } from '@supabase/supabase-js';
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
