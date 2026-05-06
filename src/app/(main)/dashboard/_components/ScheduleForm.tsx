'use client';

import { useActionState, useEffect } from 'react';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

import { createSchedule, ScheduleState } from '../actions';

type ScheduleFormProps = {
  gapStartTime: string;
  gapEndTime: string;
  onSuccess: () => void;
};

function ScheduleForm({
  gapStartTime,
  gapEndTime,
  onSuccess,
}: ScheduleFormProps) {
  const [state, action] = useActionState<ScheduleState, FormData>(
    createSchedule,
    {
      error: '',
      success: false,
    },
  );

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
            <label className="block mb-1">開始時間</label>
            <input
              type="datetime-local"
              name="start_time"
              className="border rounded w-full p-2 mb-4 outline-none focus:ring-2 focus:ring-black"
              min={toDatetimeLocal(gapStartTime)}
              max={toDatetimeLocal(gapEndTime)}
              step={300}
              defaultValue={toDatetimeLocal(gapStartTime)}
            />
          </div>
          <div>
            <label className="block mb-1">終了時間</label>
            <input
              type="datetime-local"
              name="end_time"
              className="border rounded w-full p-2 mb-4 outline-none focus:ring-2 focus:ring-black"
              min={toDatetimeLocal(gapStartTime)}
              max={toDatetimeLocal(gapEndTime)}
              step={300}
              defaultValue={toDatetimeLocal(gapEndTime)}
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
          <div className="flex flex-col items-center gap-2 mt-2">
            <button className="px-4 py-2 bg-black text-white rounded hover:bg-zinc-700">
              保存
            </button>
            {state.error && (
              <p className="text-red-500 text-sm">{state.error}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function toDatetimeLocal(isoString: string) {
  const zonedDate = toZonedTime(isoString, 'Asia/Tokyo');
  return format(zonedDate, "yyyy-MM-dd'T'HH:mm");
}

export default ScheduleForm;
