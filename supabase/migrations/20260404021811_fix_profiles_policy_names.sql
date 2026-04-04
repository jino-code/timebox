-- ポリシー名を修正する
DROP POLICY "profiles can select own profile" ON profiles;
DROP POLICY "profiles can insert own profile" ON profiles;
DROP POLICY "profiles can update own profile" ON profiles;
DROP POLICY "profiles can delete own profile" ON profiles;

CREATE POLICY "users can select own profile" ON profiles
  FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "users can insert own profile" ON profiles
  FOR INSERT
  WITH CHECK (id = auth.uid());

CREATE POLICY "users can update own profile" ON profiles
  FOR UPDATE
  USING (id = auth.uid());

CREATE POLICY "users can delete own profile" ON profiles
  FOR DELETE
  USING (id = auth.uid());