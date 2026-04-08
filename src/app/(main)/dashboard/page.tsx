import Inbox from './_components/Inbox';
import InboxDrawer from './_components/InboxDrawer';

const tasks = [
  {
    id: '1',
    user_id: '1',
    title: 'タスクA',
    memo: null,
    start_time: null,
    end_time: null,
    estimated_minutes: 30,
    created_at: '2026-04-05T09:00:00+09:00',
    updated_at: null,
    deleted_at: null,
  },
  {
    id: '2',
    user_id: '1',
    title: 'タスクB',
    memo: '',
    start_time: null,
    end_time: null,
    estimated_minutes: 50,
    created_at: '2026-04-07T09:00:00+09:00',
    updated_at: null,
    deleted_at: null,
  },
  {
    id: '3',
    user_id: '1',
    title: 'タスクC',
    memo: null,
    start_time: null,
    end_time: null,
    estimated_minutes: 60,
    created_at: '2026-04-06T09:00:00+09:00',
    updated_at: null,
    deleted_at: null,
  },
];

function Dashboard() {
  return (
    <InboxDrawer>
      <Inbox tasks={tasks} />
    </InboxDrawer>
  );
}

export default Dashboard;
