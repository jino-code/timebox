'use client';

import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

import { TimelineItem } from '@/types/timeline';

import Modal from './Modal';
import ScheduleForm from './ScheduleForm';
import TaskForm from './TaskForm';
import DateNavigation from './DateNavigation';

type TimelineProps = {
  date: string;
  timeline: TimelineItem[];
};

function Timeline({ date, timeline }: TimelineProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <DateNavigation date={date} />
        {timeline.map((item) => {
          if (item.type === 'gap') {
            return (
              <div
                key={item.id}
                className="border rounded-lg p-4 mb-2 bg-white shadow-sm"
              >
                <Modal
                  trigger={
                    <div className="flex items-center gap-4">
                      <span className="w-24 shrink-0 text-sm text-gray-500">
                        {item.isFullDay
                          ? '終日'
                          : `${formatTime(item.start_time)}〜${formatTime(item.end_time)}`}
                      </span>
                      <span>空き時間</span>
                    </div>
                  }
                  title={'スケジュール登録'}
                >
                  {(onSuccess) => (
                    <ScheduleForm
                      gapStartTime={item.start_time}
                      gapEndTime={item.end_time}
                      onSuccess={onSuccess}
                    />
                  )}
                </Modal>
              </div>
            );
          }
          if (item.type === 'schedule') {
            return (
              <div
                key={item.id}
                className="border rounded-lg p-4 mb-2 bg-white shadow-sm"
              >
                <Modal
                  trigger={
                    <div className="flex items-center gap-4">
                      <span className="w-24 shrink-0 text-sm text-gray-500">
                        {`${formatTime(item.start_time)}〜${formatTime(item.end_time)}`}
                      </span>
                      <span>{item.title}</span>
                    </div>
                  }
                  title={'スケジュール詳細'}
                >
                  {(onSuccess) => (
                    <ScheduleForm
                      schedule={item.schedule}
                      onSuccess={onSuccess}
                    />
                  )}
                </Modal>
              </div>
            );
          }
          if (item.type === 'task') {
            return (
              <div
                key={item.id}
                className="border rounded-lg p-4 mb-2 bg-white shadow-sm"
              >
                <Modal
                  trigger={
                    <div className="flex items-center gap-4">
                      <span className="w-24 shrink-0 text-sm text-gray-500">
                        {`${formatTime(item.start_time)}〜${formatTime(item.end_time)}`}
                      </span>
                      <span>{item.title}</span>
                    </div>
                  }
                  title={'タスク詳細'}
                >
                  {(onSuccess) => (
                    <TaskForm task={item.task} onSuccess={onSuccess} />
                  )}
                </Modal>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

const formatTime = (isoString: string) => {
  const zonedDate = toZonedTime(isoString, 'Asia/Tokyo');
  return format(zonedDate, 'HH:mm');
};

export default Timeline;
