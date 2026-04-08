type Task = {
  id: string;
  user_id: string;
  title: string;
  memo: string | null;
  start_time: string | null;
  end_time: string | null;
  estimated_minutes: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
};

type InboxProps = {
  tasks: Task[];
};

function Inbox({ tasks }: InboxProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border rounded-lg p-4 mb-2 bg-white shadow-sm"
          >
            <span>{task.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inbox;
