-- auth.usersと区別しやすくするためusersをprofilesに変更する
DROP POLICY "users can select own profile" ON users;
DROP POLICY "users can insert own profile" ON users;
DROP POLICY "users can update own profile" ON users;
DROP POLICY "users can delete own profile" ON users;

ALTER TABLE users RENAME TO profiles;

CREATE POLICY "profiles can select own profile" ON profiles
  FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "profiles can insert own profile" ON profiles
  FOR INSERT
  WITH CHECK (id = auth.uid());

CREATE POLICY "profiles can update own profile" ON profiles
  FOR UPDATE
  USING (id = auth.uid());

CREATE POLICY "profiles can delete own profile" ON profiles
  FOR DELETE
  USING (id = auth.uid());