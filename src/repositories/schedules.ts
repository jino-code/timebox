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
