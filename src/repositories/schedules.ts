import { SupabaseClient } from '@supabase/supabase-js';
import { addDays } from 'date-fns';

import { Schedule } from '@/types/schedule';

export async function getDailySchedules(
  supabase: SupabaseClient,
  date: string,
) {
  const startOfDay = new Date(`${date}T00:00:00+09:00`);

  const endOfDay = addDays(startOfDay, 1);

  // start_timeで絞り込む。日を跨ぐスケジュールは開始日の予定として扱うため。
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .is('deleted_at', null)
    .gte('start_time', startOfDay.toISOString())
    .lt('start_time', endOfDay.toISOString())
    .returns<Schedule[]>();

  return { data, error };
}

export async function insertSchedule(
  supabase: SupabaseClient,
  userId: string,
  title: string,
  startTime: string,
  endTime: string,
  memo: string,
) {
  const { error } = await supabase.from('schedules').insert({
    user_id: userId,
    title,
    start_time: startTime,
    end_time: endTime,
    memo,
  });

  return { error };
}

export async function updateScheduleById(
  supabase: SupabaseClient,
  scheduleId: string,
  title: string,
  jstStartTime: string,
  jstEndTime: string,
  memo: string,
) {
  const { error } = await supabase
    .from('schedules')
    .update({
      title,
      start_time: jstStartTime,
      end_time: jstEndTime,
      memo,
    })
    .eq('id', scheduleId);

  return { error };
}

export async function deleteScheduleById(
  supabase: SupabaseClient,
  scheduleId: string,
) {
  const { error } = await supabase
    .from('schedules')
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq('id', scheduleId);

  return { error };
}
