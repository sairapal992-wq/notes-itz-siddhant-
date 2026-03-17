/*
  # StudentGen AI Database Schema

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `full_name` (text)
      - `class` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `generated_notes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `subject` (text)
      - `chapter` (text)
      - `topic` (text)
      - `class` (text)
      - `content` (jsonb)
      - `created_at` (timestamptz)
    
    - `practice_questions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `subject` (text)
      - `chapter` (text)
      - `difficulty` (text)
      - `questions` (jsonb)
      - `created_at` (timestamptz)
    
    - `chat_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `messages` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `quiz_results`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `subject` (text)
      - `chapter` (text)
      - `score` (integer)
      - `total_questions` (integer)
      - `created_at` (timestamptz)
    
    - `study_plans`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `subjects` (jsonb)
      - `exam_date` (date)
      - `daily_hours` (integer)
      - `plan` (jsonb)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text DEFAULT '',
  class text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS generated_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  subject text NOT NULL,
  chapter text NOT NULL,
  topic text NOT NULL,
  class text NOT NULL,
  content jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS practice_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  subject text NOT NULL,
  chapter text NOT NULL,
  difficulty text NOT NULL,
  questions jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  messages jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  subject text NOT NULL,
  chapter text NOT NULL,
  score integer DEFAULT 0,
  total_questions integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS study_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  subjects jsonb DEFAULT '[]'::jsonb,
  exam_date date,
  daily_hours integer DEFAULT 0,
  plan jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own notes"
  ON generated_notes FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own notes"
  ON generated_notes FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own notes"
  ON generated_notes FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can view own questions"
  ON practice_questions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own questions"
  ON practice_questions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view own chat history"
  ON chat_history FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own chat history"
  ON chat_history FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own chat history"
  ON chat_history FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view own quiz results"
  ON quiz_results FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own quiz results"
  ON quiz_results FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view own study plans"
  ON study_plans FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own study plans"
  ON study_plans FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own study plans"
  ON study_plans FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());