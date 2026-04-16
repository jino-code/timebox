'use client';

import { useActionState, useEffect } from 'react';

import { Task } from '@/types/task';

import { createTask, updateTask, deleteTask, TaskState } from '../actions';

type TaskFormProps = {
  task?: Task;
  onSuccess: () => void;
};

function TaskForm({ task, onSuccess }: TaskFormProps) {
  const serverAction = task ? updateTask.bind(null, task.id) : createTask;
  const [state, action] = useActionState<TaskState, FormData>(serverAction, {
    error: '',
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state.success, onSuccess]);

  const handleDelete = async () => {
    if (!task) {
      return;
    }
    await deleteTask(task.id);
    onSuccess();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-80">
        <form action={action}>
          <div>
            <label className="block mb-1">タイトル</label>
            <input
              type="text"
              name="title"
              className="border rounded w-full p-2 mb-4 outline-none focus:ring-2 focus:ring-black"
              defaultValue={task ? task.title : ''}
            />
          </div>
          <div>
            <label className="block mb-1">見込み時間</label>
            <input
              type="number"
              name="estimated_minutes"
              className="border rounded w-full p-2 mb-4 outline-none focus:ring-2 focus:ring-black"
              defaultValue={task ? task.estimated_minutes : ''}
            />
          </div>
          <div>
            <label className="block mb-1">メモ</label>
            <input
              type="text"
              name="memo"
              className="border rounded w-full p-2 mb-4 outline-none focus:ring-2 focus:ring-black"
              defaultValue={task ? (task.memo ?? '') : ''}
            />
          </div>
          <div className="flex flex-col items-center gap-2 mt-2">
            <button className="px-4 py-2 bg-black text-white rounded hover:bg-zinc-700">
              保存
            </button>
            {state.error && (
              <p className="text-red-500 text-sm">{state.error}</p>
            )}
          </div>
        </form>
        {task && (
          <button
            className="mt-4 block mx-auto text-red-500 hover:text-red-600 text-sm"
            onClick={handleDelete}
          >
            削除する
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskForm;
