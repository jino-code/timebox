import { Schedule } from '@/types/schedule';
import { Task } from '@/types/task';

export type TimelineItem = ScheduleItem | TaskItem | GapItem;

type ScheduleItem = {
  type: 'schedule';
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  schedule: Schedule;
};

type TaskItem = {
  type: 'task';
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  task: Task;
};

type GapItem = {
  type: 'gap';
  id: string;
  start_time: string;
  end_time: string;
  isFullDay: boolean;
};
