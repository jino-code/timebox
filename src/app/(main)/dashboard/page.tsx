import { createClient } from '@/lib/supabase/server';
import { getInboxTasks, getDailyTasks } from '@/repositories/tasks';
import { getDailySchedules } from '@/repositories/schedules';

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
  const targetDate = date ?? new Date().toISOString().split('T')[0];

  const { data: inboxTasks, error: inboxTasksError } =
    await getInboxTasks(supabase);
  const { data: scheduledTasks, error: scheduledTasksError } =
    await getDailyTasks(supabase, targetDate);
  const { data: schedules, error: schedulesError } = await getDailySchedules(
    supabase,
    targetDate,
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
              <Timeline
                schedules={schedules ?? []}
                tasks={scheduledTasks ?? []}
                date={targetDate}
              />
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
