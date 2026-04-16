import { createClient } from '@/lib/supabase/server';
import { getInboxTasks } from '@/repositories/tasks';

import Inbox from './_components/Inbox';
import InboxDrawer from './_components/InboxDrawer';

async function Dashboard() {
  const supabase = await createClient();

  const { data: tasks, error: tasksError } = await getInboxTasks(supabase);

  return (
    <InboxDrawer>
      {tasksError ? (
        <div>タスクの取得に失敗しました。再度お試しください。</div>
      ) : (
        <Inbox tasks={tasks ?? []} />
      )}
    </InboxDrawer>
  );
}

export default Dashboard;
