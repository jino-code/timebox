import { createClient } from '@/lib/supabase/server';
import { getInboxTasks } from '@/repositories/tasks';

import Inbox from './_components/Inbox';
import DashboardTabs from './_components/DashboardTabs';

async function Dashboard() {
  const supabase = await createClient();

  const { data: tasks, error: tasksError } = await getInboxTasks(supabase);

  return (
    <DashboardTabs
      tabs={[
        {
          label: 'タイムライン',
          content: <div>タイムライン（未実装）</div>,
        },
        {
          label: 'インボックス',
          content: tasksError ? (
            <div>タスクの取得に失敗しました。再度お試しください。</div>
          ) : (
            <Inbox tasks={tasks ?? []} />
          ),
        },
      ]}
    />
  );
}

export default Dashboard;
