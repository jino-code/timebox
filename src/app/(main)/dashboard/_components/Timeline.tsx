'use client';

import { Task } from '@/types/task';
import { Schedule } from '@/types/schedule';
import DateNavigation from './DateNavigation';

type TimelineProps = {
  schedules: Schedule[],
  tasks: Task[],
  date: string,
};

function Timeline({ schedules, tasks, date }: TimelineProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <DateNavigation date={date}/>
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="border rounded-lg p-4 mb-2 bg-white shadow-sm"
          >
            <span>{schedule.title}</span>
          </div>
        ))}
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

export default Timeline;
