import { addDays } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

import { Task } from '@/types/task';
import { Schedule } from '@/types/schedule';
import { TimelineItem } from '@/types/timeline';

export function buildDailyTimeline(
  date: string,
  schedules: Schedule[],
  tasks: Task[],
): TimelineItem[] {
  const merged = mergeToTimeline(schedules, tasks);

  const sorted = sortByStartTime(merged);

  const timeline = insertGaps(sorted, date);

  return timeline;
}

function mergeToTimeline(schedules: Schedule[], tasks: Task[]): TimelineItem[] {
  const scheduleItems = schedules.map((schedule) => ({
    type: 'schedule' as const,
    id: schedule.id,
    title: schedule.title,
    start_time: schedule.start_time,
    end_time: schedule.end_time,
    schedule,
  }));

  // SCHEDULEDのタスクは必ずstart_time, end_timeを持つため非nullアサーションを使用する。
  const taskItems = tasks.map((task) => ({
    type: 'task' as const,
    id: task.id,
    title: task.title,
    start_time: task.start_time!,
    end_time: task.end_time!,
    task,
  }));

  const merged = [...scheduleItems, ...taskItems];

  return merged;
}

// ソートキー
// 1. start_time 2. end_time 3. type（schedule優先）4. id
function sortByStartTime(merged: TimelineItem[]): TimelineItem[] {
  const sorted = merged.sort((a, b) => {
    const startDiff = a.start_time.localeCompare(b.start_time);
    if (startDiff !== 0) {
      return startDiff;
    }

    const endDiff = a.end_time.localeCompare(b.end_time);
    if (endDiff !== 0) {
      return endDiff;
    }

    const typeOrder = { schedule: 0, task: 1 };
    const typeDiff =
      typeOrder[a.type as 'schedule' | 'task'] -
      typeOrder[b.type as 'schedule' | 'task'];
    if (typeDiff !== 0) {
      return typeDiff;
    }

    return a.id.localeCompare(b.id);
  });

  return sorted;
}

function insertGaps(sorted: TimelineItem[], date: string): TimelineItem[] {
  const startOfDay = new Date(`${date}T00:00:00+09:00`);
  const endOfDay = addDays(startOfDay, 1);
  const nextDate = formatInTimeZone(endOfDay, 'Asia/Tokyo', 'yyyy-MM-dd');

  // 0件の場合も1日分の空き時間として返す
  // 空き時間をタップしてスケジュールをGapの時間範囲で登録できるようにするため、
  if (sorted.length === 0) {
    return [
      {
        type: 'gap' as const,
        id: crypto.randomUUID(),
        start_time: `${date}T00:00:00+09:00`,
        end_time: `${nextDate}T00:00:00+09:00`,
        isFullDay: true,
      },
    ];
  }

  const timeline: TimelineItem[] = [];
  sorted.forEach((current, index) => {
    if (index > 0) {
      const prev = timeline[timeline.length - 1];
      const prevEndTime = new Date(prev.end_time);
      const currentStartTime = new Date(current.start_time);
      const diffMinutesInner = Math.floor(
        (currentStartTime.getTime() - prevEndTime.getTime()) / (1000 * 60),
      );
      if (diffMinutesInner > 0) {
        const gapItem = {
          type: 'gap' as const,
          id: crypto.randomUUID(),
          start_time: prev.end_time,
          end_time: current.start_time,
          isFullDay: false,
        };
        timeline.push(gapItem);
      }
    }
    timeline.push(current);
  });

  const firstStartTime = new Date(timeline[0].start_time);
  const diffMinutesStart = Math.floor(
    (firstStartTime.getTime() - startOfDay.getTime()) / (1000 * 60),
  );
  if (diffMinutesStart > 0) {
    const gapItem = {
      type: 'gap' as const,
      id: crypto.randomUUID(),
      start_time: `${date}T00:00:00+09:00`,
      end_time: timeline[0].start_time,
      isFullDay: false,
    };
    timeline.unshift(gapItem);
  }

  const lastEndTime = new Date(timeline[timeline.length - 1].end_time);
  const diffMinutesEnd = Math.floor(
    (endOfDay.getTime() - lastEndTime.getTime()) / (1000 * 60),
  );
  if (diffMinutesEnd > 0) {
    const gapItem = {
      type: 'gap' as const,
      id: crypto.randomUUID(),
      start_time: timeline[timeline.length - 1].end_time,
      end_time: `${nextDate}T00:00:00+09:00`,
      isFullDay: false,
    };
    timeline.push(gapItem);
  }

  return timeline;
}
