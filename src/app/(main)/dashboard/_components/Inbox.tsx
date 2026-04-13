'use client';

import { Task } from '@/types/task';
import Modal from './Modal';
import TaskForm from './TaskForm';

type InboxProps = {
  tasks: Task[];
};

function Inbox({ tasks }: InboxProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-start p-2">
        <Modal
          trigger={
            <button className="px-4 py-2 bg-black text-white rounded hover:bg-zinc-700">
              登録
            </button>
          }
          title={'タスク登録'}
        >
          {(onSuccess) => <TaskForm onSuccess={onSuccess} />}
        </Modal>
      </div>
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
