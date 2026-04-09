export type Task = {
  id: string;
  user_id: string;
  title: string;
  memo: string | null;
  start_time: string | null;
  end_time: string | null;
  estimated_minutes: number;
  status: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
};
