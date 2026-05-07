'use client';

import { useActionState, useEffect } from 'react';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

import { Schedule } from '@/types/schedule';
import { createSchedule, updateSchedule, ScheduleState } from '../actions';

type ScheduleFormProps = {
  schedule?: Schedule;
  gapStartTime?: string;
  gapEndTime?: string;
  onSuccess: () => void;
};

function ScheduleForm({
  schedule,
  gapStartTime,
  gapEndTime,
  onSuccess,
}: ScheduleFormProps) {
  const serverAction = schedule
    ? updateSchedule.bind(null, schedule.id)
    : createSchedule;
  const [state, action] = useActionState<ScheduleState, FormData>(
    serverAction,
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

  const getDefaultStartTime = () => {
    if (schedule) {
      return toDatetimeLocal(schedule.start_time);
    }
    if (gapStartTime) {
      return toDatetimeLocal(gapStartTime);
    }
    return '';
  };

  const getDefaultEndTime = () => {
    if (schedule) {
      return toDatetimeLocal(schedule.end_time);
    }
    if (gapEndTime) {
      return toDatetimeLocal(gapEndTime);
    }
    return '';
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
              defaultValue={schedule ? schedule.title : ''}
            />
          </div>
          <div>
            <label className="block mb-1">開始時間</label>
            <input
              type="datetime-local"
              name="start_time"
              className="border rounded w-full p-2 mb-4 outline-none focus:ring-2 focus:ring-black"
              min={gapStartTime ? toDatetimeLocal(gapStartTime) : undefined}
              max={gapEndTime ? toDatetimeLocal(gapEndTime) : undefined}
              step={300}
              defaultValue={getDefaultStartTime()}
            />
          </div>
          <div>
            <label className="block mb-1">終了時間</label>
            <input
              type="datetime-local"
              name="end_time"
              className="border rounded w-full p-2 mb-4 outline-none focus:ring-2 focus:ring-black"
              min={gapStartTime ? toDatetimeLocal(gapStartTime) : undefined}
              max={gapEndTime ? toDatetimeLocal(gapEndTime) : undefined}
              step={300}
              defaultValue={getDefaultEndTime()}
            />
          </div>
          <div>
            <label className="block mb-1">メモ</label>
            <input
              type="text"
              name="memo"
              className="border rounded w-full p-2 mb-4 outline-none focus:ring-2 focus:ring-black"
              defaultValue={schedule ? (schedule.memo ?? '') : ''}
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
