import { createClient } from '@/lib/supabase/server';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { getInboxTasks, getDailyTasks } from '@/repositories/tasks';
import { getDailySchedules } from '@/repositories/schedules';
import { buildDailyTimeline } from '@/utils/timeline';

import Inbox from './_components/Inbox';
import DashboardTabs from './_components/DashboardTabs';
import Timeline from './_components/Timeline';

type DashboardProps = {
  searchParams: Promise<{ date?: string }>;
};

async function Dashboard({ searchParams }: DashboardProps) {
  const supabase = await createClient();

  const { date } = await searchParams;

  // dateパラメータが未指定の場合は今日日付をデフォルトにする。
  const today = format(toZonedTime(new Date(), 'Asia/Tokyo'), 'yyyy-MM-dd');
  const targetDate = date ?? today;

  const { data: inboxTasks, error: inboxTasksError } =
    await getInboxTasks(supabase);
  const { data: scheduledTasks, error: scheduledTasksError } =
    await getDailyTasks(supabase, targetDate);
  const { data: schedules, error: schedulesError } = await getDailySchedules(
    supabase,
    targetDate,
  );

  const timeline = buildDailyTimeline(
    targetDate,
    schedules ?? [],
    scheduledTasks ?? [],
  );

  return (
    <DashboardTabs
      tabs={[
        {
          label: 'タイムライン',
          content:
            scheduledTasksError || schedulesError ? (
              <div>スケジュールの取得に失敗しました。再度お試しください。</div>
            ) : (
              <Timeline date={targetDate} timeline={timeline} />
            ),
        },
        {
          label: 'インボックス',
          content: inboxTasksError ? (
            <div>タスクの取得に失敗しました。再度お試しください。</div>
          ) : (
            <Inbox tasks={inboxTasks ?? []} />
          ),
        },
      ]}
    />
  );
}

export default Dashboard;
