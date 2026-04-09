import { Task } from '@/types/task';

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
