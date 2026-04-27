import { describe, it, expect, beforeEach } from 'vitest';

import { Task } from '@/types/task';
import { Schedule } from '@/types/schedule';

import { buildDailyTimeline } from './timeline';

let idCounter = 0;

describe('buildDailyTimeline', () => {
  beforeEach(() => {
    idCounter = 0;
  });

  it('マージ処理: スケジュールとタスクが両方ある場合、両方がマージされること', () => {
    const date = '2026-04-26';
    const schedules = [
      createSchedule('2026-04-26T10:00:00+09:00', '2026-04-26T11:00:00+09:00'),
      createSchedule('2026-04-26T15:00:00+09:00', '2026-04-26T16:00:00+09:00'),
    ];
    const tasks = [
      createTask('2026-04-26T12:00:00+09:00', '2026-04-26T13:00:00+09:00'),
      createTask('2026-04-26T17:00:00+09:00', '2026-04-26T18:00:00+09:00'),
    ];

    const result = buildDailyTimeline(date, schedules, tasks);

    expect(result.filter((item) => item.type === 'schedule')).toHaveLength(2);
    expect(result.filter((item) => item.type === 'task')).toHaveLength(2);
  });

  it('マージ処理: スケジュールだけの場合、スケジュールのみがマージされること', () => {
    const date = '2026-04-26';
    const schedules = [
      createSchedule('2026-04-26T10:00:00+09:00', '2026-04-26T11:00:00+09:00'),
      createSchedule('2026-04-26T15:00:00+09:00', '2026-04-26T16:00:00+09:00'),
    ];
    const tasks: Task[] = [];

    const result = buildDailyTimeline(date, schedules, tasks);

    expect(result.filter((item) => item.type === 'schedule')).toHaveLength(2);
    expect(result.filter((item) => item.type === 'task')).toHaveLength(0);
  });

  it('マージ処理: タスクだけの場合、タスクのみがマージされること', () => {
    const date = '2026-04-26';
    const schedules: Schedule[] = [];
    const tasks = [
      createTask('2026-04-26T12:00:00+09:00', '2026-04-26T13:00:00+09:00'),
      createTask('2026-04-26T17:00:00+09:00', '2026-04-26T18:00:00+09:00'),
    ];

    const result = buildDailyTimeline(date, schedules, tasks);

    expect(result.filter((item) => item.type === 'schedule')).toHaveLength(0);
    expect(result.filter((item) => item.type === 'task')).toHaveLength(2);
  });

  it('ソート処理: ランダムな時間順の場合、start_timeの昇順になること', () => {
    const date = '2026-04-26';
    const schedules = [
      createSchedule('2026-04-26T15:00:00+09:00', '2026-04-26T18:00:00+09:00'),
      createSchedule('2026-04-26T10:00:00+09:00', '2026-04-26T12:00:00+09:00'),
    ];
    const tasks = [
      createTask('2026-04-26T20:00:00+09:00', '2026-04-26T21:00:00+09:00'),
      createTask('2026-04-26T13:00:00+09:00', '2026-04-26T14:00:00+09:00'),
    ];

    const result = buildDailyTimeline(date, schedules, tasks);

    const nonGapItems = result.filter((item) => item.type !== 'gap');
    const startTimes = nonGapItems.map((item) => item.start_time);
    expect(startTimes).toEqual([
      `2026-04-26T10:00:00+09:00`,
      `2026-04-26T13:00:00+09:00`,
      `2026-04-26T15:00:00+09:00`,
      `2026-04-26T20:00:00+09:00`,
    ]);
  });

  it('ソート処理: start_timeが同一の場合、end_timeの昇順になること', () => {
    const date = '2026-04-26';
    const schedules = [
      createSchedule('2026-04-26T10:00:00+09:00', '2026-04-26T12:00:00+09:00'),
      createSchedule('2026-04-26T10:00:00+09:00', '2026-04-26T11:00:00+09:00'),
    ];
    const tasks = [
      createTask('2026-04-26T10:00:00+09:00', '2026-04-26T20:00:00+09:00'),
      createTask('2026-04-26T10:00:00+09:00', '2026-04-26T15:00:00+09:00'),
    ];

    const result = buildDailyTimeline(date, schedules, tasks);

    const nonGapItems = result.filter((item) => item.type !== 'gap');
    const endTimes = nonGapItems.map((item) => item.end_time);
    expect(endTimes).toEqual([
      `2026-04-26T11:00:00+09:00`,
      `2026-04-26T12:00:00+09:00`,
      `2026-04-26T15:00:00+09:00`,
      `2026-04-26T20:00:00+09:00`,
    ]);
  });

  it('ソート処理: start_timeとend_timeが同一の場合、typeの昇順になること', () => {
    const date = '2026-04-26';
    const schedules = [
      createSchedule('2026-04-26T10:00:00+09:00', '2026-04-26T11:00:00+09:00'),
    ];
    const tasks = [
      createTask('2026-04-26T10:00:00+09:00', '2026-04-26T11:00:00+09:00'),
    ];

    const result = buildDailyTimeline(date, schedules, tasks);

    const nonGapItems = result.filter((item) => item.type !== 'gap');
    const types = nonGapItems.map((item) => item.type);
    expect(types).toEqual(['schedule', 'task']);
  });

  it('ソート処理: start_timeとend_time、typeが同一の場合、idの昇順になること', () => {
    const date = '2026-04-26';
    const schedules = [
      createSchedule(
        '2026-04-26T10:00:00+09:00',
        '2026-04-26T11:00:00+09:00',
        '3',
      ),
      createSchedule(
        '2026-04-26T10:00:00+09:00',
        '2026-04-26T11:00:00+09:00',
        '2',
      ),
      createSchedule(
        '2026-04-26T10:00:00+09:00',
        '2026-04-26T11:00:00+09:00',
        '1',
      ),
    ];
    const tasks: Task[] = [];

    const result = buildDailyTimeline(date, schedules, tasks);

    const nonGapItems = result.filter((item) => item.type !== 'gap');
    const ids = nonGapItems.map((item) =>
      item.type === 'schedule' ? item.schedule.id : item.task.id,
    );
    expect(ids).toEqual(['1', '2', '3']);
  });

  it('空き時間処理: 開始・アイテム間・終了に空き時間ができること', () => {
    const date = '2026-04-26';
    const schedules = [
      createSchedule('2026-04-26T10:00:00+09:00', '2026-04-26T11:00:00+09:00'),
      createSchedule('2026-04-26T11:30:00+09:00', '2026-04-26T13:00:00+09:00'),
      createSchedule('2026-04-26T16:30:00+09:00', '2026-04-26T20:00:00+09:00'),
    ];
    const tasks = [
      createTask('2026-04-26T13:30:00+09:00', '2026-04-26T14:00:00+09:00'),
      createTask('2026-04-26T15:00:00+09:00', '2026-04-26T16:00:00+09:00'),
    ];
    const result = buildDailyTimeline(date, schedules, tasks);

    // idを除外
    // Gapのidはcrypto.randomUUID()で生成していて、毎回異なる値になるため。
    const gapItems = result
      .filter((item) => item.type === 'gap')
      .map(({ id: _id, ...rest }) => rest);
    expect(gapItems).toEqual([
      {
        type: 'gap',
        start_time: `2026-04-26T00:00:00+09:00`,
        end_time: `2026-04-26T10:00:00+09:00`,
        isFullDay: false,
      },
      {
        type: 'gap',
        start_time: `2026-04-26T11:00:00+09:00`,
        end_time: `2026-04-26T11:30:00+09:00`,
        isFullDay: false,
      },
      {
        type: 'gap',
        start_time: `2026-04-26T13:00:00+09:00`,
        end_time: `2026-04-26T13:30:00+09:00`,
        isFullDay: false,
      },
      {
        type: 'gap',
        start_time: `2026-04-26T14:00:00+09:00`,
        end_time: `2026-04-26T15:00:00+09:00`,
        isFullDay: false,
      },
      {
        type: 'gap',
        start_time: `2026-04-26T16:00:00+09:00`,
        end_time: `2026-04-26T16:30:00+09:00`,
        isFullDay: false,
      },
      {
        type: 'gap',
        start_time: `2026-04-26T20:00:00+09:00`,
        end_time: '2026-04-27T00:00:00+09:00',
        isFullDay: false,
      },
    ]);
  });

  it('空き時間処理: アイテムが隣接している場合、空き時間ができないこと', () => {
    const date = '2026-04-26';
    const schedules = [
      createSchedule('2026-04-26T00:00:00+09:00', '2026-04-26T10:00:00+09:00'),
      createSchedule('2026-04-26T10:00:00+09:00', '2026-04-26T11:00:00+09:00'),
      createSchedule('2026-04-26T11:00:00+09:00', '2026-04-26T12:00:00+09:00'),
    ];
    const tasks = [
      createTask('2026-04-26T12:00:00+09:00', '2026-04-26T14:00:00+09:00'),
      createTask('2026-04-26T14:00:00+09:00', '2026-04-26T16:00:00+09:00'),
      createTask('2026-04-26T16:00:00+09:00', '2026-04-27T00:00:00+09:00'),
    ];
    const result = buildDailyTimeline(date, schedules, tasks);

    const gapItems = result.filter((item) => item.type === 'gap');
    // 前後のGapのみ
    expect(gapItems).toHaveLength(0);
  });

  it('空き時間処理: アイテムが重複している場合、空き時間ができないこと', () => {
    const date = '2026-04-26';
    const schedules = [
      createSchedule('2026-04-26T00:00:00+09:00', '2026-04-26T10:00:00+09:00'),
      createSchedule('2026-04-26T10:00:00+09:00', '2026-04-26T11:00:00+09:00'),
      createSchedule('2026-04-26T10:30:00+09:00', '2026-04-26T12:00:00+09:00'),
    ];
    const tasks = [
      createTask('2026-04-26T11:30:00+09:00', '2026-04-26T14:00:00+09:00'),
      createTask('2026-04-26T13:00:00+09:00', '2026-04-26T16:00:00+09:00'),
      createTask('2026-04-26T16:00:00+09:00', '2026-04-27T00:00:00+09:00'),
    ];
    const result = buildDailyTimeline(date, schedules, tasks);

    const gapItems = result.filter((item) => item.type === 'gap');
    // 前後のGapのみ
    expect(gapItems).toHaveLength(0);
  });

  it('空き時間処理: 日を跨ぐタスクやスケジュールがある場合、終了の空き時間ができないこと', () => {
    const date = '2026-04-26';
    const schedules = [
      createSchedule('2026-04-26T22:00:00+09:00', '2026-04-27T02:00:00+09:00'),
    ];
    const tasks: Task[] = [];
    const result = buildDailyTimeline(date, schedules, tasks);

    // idを除外
    // Gapのidはcrypto.randomUUID()で生成していて、毎回異なる値になるため。
    const gapItems = result
      .filter((item) => item.type === 'gap')
      .map(({ id: _id, ...rest }) => rest);
    expect(gapItems).toEqual([
      {
        type: 'gap',
        start_time: `2026-04-26T00:00:00+09:00`,
        end_time: `2026-04-26T22:00:00+09:00`,
        isFullDay: false,
      },
    ]);
  });

  it('共通: 0件の場合、1日中空き時間となること', () => {
    const date = '2026-04-26';
    const schedules: Schedule[] = [];
    const tasks: Task[] = [];
    const result = buildDailyTimeline(date, schedules, tasks);

    // idを除外
    // Gapのidはcrypto.randomUUID()で生成していて、毎回異なる値になるため。
    const gapItem = result.map(({ id: _id, ...rest }) => rest);

    expect(gapItem).toEqual([
      {
        type: 'gap',
        start_time: `2026-04-26T00:00:00+09:00`,
        end_time: `2026-04-27T00:00:00+09:00`,
        isFullDay: true,
      },
    ]);
  });

  it('共通: 1件の場合、開始と終了の空き時間が発生すること', () => {
    const date = '2026-04-26';
    const schedules: Schedule[] = [
      createSchedule('2026-04-26T10:00:00+09:00', '2026-04-26T11:00:00+09:00'),
    ];
    const tasks: Task[] = [];
    const result = buildDailyTimeline(date, schedules, tasks);

    // idを除外
    // Gapのidはcrypto.randomUUID()で生成していて、毎回異なる値になるため。
    const gapItems = result
      .filter((item) => item.type === 'gap')
      .map(({ id: _id, ...rest }) => rest);
    expect(gapItems).toEqual([
      {
        type: 'gap',
        start_time: `2026-04-26T00:00:00+09:00`,
        end_time: `2026-04-26T10:00:00+09:00`,
        isFullDay: false,
      },
      {
        type: 'gap',
        start_time: `2026-04-26T11:00:00+09:00`,
        end_time: `2026-04-27T00:00:00+09:00`,
        isFullDay: false,
      },
    ]);
  });
});

function createSchedule(
  startTime: string,
  endTime: string,
  id: string = String(++idCounter),
): Schedule {
  return {
    id,
    user_id: 'user1',
    title: 'テスト予定',
    memo: null,
    start_time: startTime,
    end_time: endTime,
    created_at: '2026-04-25T00:00:00+09:00',
    updated_at: null,
    deleted_at: null,
  };
}

function createTask(
  startTime: string,
  endTime: string,
  id: string = String(++idCounter),
): Task {
  return {
    id,
    user_id: 'user1',
    title: 'テスト予定',
    memo: null,
    start_time: startTime,
    end_time: endTime,
    estimated_minutes: 60,
    status: 'SCHEDULED',
    created_at: '2026-04-25T00:00:00+09:00',
    updated_at: null,
    deleted_at: null,
  };
}
