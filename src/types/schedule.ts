export type Schedule = {
  id: string;
  user_id: string;
  title: string;
  memo: string | null;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
};
