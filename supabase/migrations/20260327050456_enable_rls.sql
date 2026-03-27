-- users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can select own profile" ON users
  FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "users can insert own profile" ON users
  FOR INSERT
  WITH CHECK (id = auth.uid());

CREATE POLICY "users can update own profile" ON users
  FOR UPDATE
  USING (id = auth.uid());

CREATE POLICY "users can delete own profile" ON users
  FOR DELETE
  USING (id = auth.uid());

-- schedules
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can select own schedules" ON schedules
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "users can insert own schedules" ON schedules
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "users can update own schedules" ON schedules
  FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "users can delete own schedules" ON schedules
  FOR DELETE
  USING (user_id = auth.uid());

-- tasks
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can select own tasks" ON tasks
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "users can insert own tasks" ON tasks
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "users can update own tasks" ON tasks
  FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "users can delete own tasks" ON tasks
  FOR DELETE
  USING (user_id = auth.uid());