'use client';

import { useActionState, useEffect } from 'react';
import { createTask, TaskState } from '../actions';

type TaskCreateFormProps = {
  onSuccess: () => void;
};

function TaskCreateForm({ onSuccess }: TaskCreateFormProps) {
  const [state, action] = useActionState<TaskState, FormData>(createTask, {
    error: '',
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state.success, onSuccess]);

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
            />
          </div>
          <div>
            <label className="block mb-1">見込み時間</label>
            <input
              type="number"
              name="estimated_minutes"
              className="border rounded w-full p-2 mb-4 outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block mb-1">メモ</label>
            <input
              type="text"
              name="memo"
              className="border rounded w-full p-2 mb-4 outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <button className="px-4 py-2 bg-black text-white rounded hover:bg-zinc-700">
              登録
            </button>
            {state.error && <p>エラー: {state.error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskCreateForm;
