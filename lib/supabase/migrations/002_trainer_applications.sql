-- ============================================================
-- 002_trainer_applications.sql
-- Trainer applications table + admin user setup helper
-- Run this AFTER 001_core_tables.sql
-- ============================================================

-- ============================================================
-- TRAINER APPLICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS trainer_applications (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name        text NOT NULL,
  email            text NOT NULL,
  country          text,
  specialities     text[]   DEFAULT '{}',
  experience       text,
  bio              text,
  hourly_rate_ksh  numeric  DEFAULT 0,
  hourly_rate_usd  numeric  DEFAULT 0,
  linkedin_url     text,
  github_url       text,
  sample_work_url  text,
  status           text     NOT NULL DEFAULT 'pending',   -- pending | approved | rejected
  reviewer_note    text,
  reviewed_by      uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at      timestamptz,
  created_at       timestamptz DEFAULT now()
);

ALTER TABLE trainer_applications ENABLE ROW LEVEL SECURITY;

-- Applicants can read their own application
CREATE POLICY "applications_self_read" ON trainer_applications
  FOR SELECT USING (auth.uid() = user_id);

-- Applicants can insert their own application
CREATE POLICY "applications_self_insert" ON trainer_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Service role (admin) has full access via bypass RLS — no extra policy needed.

-- Index for fast status queries
CREATE INDEX IF NOT EXISTS idx_trainer_applications_status
  ON trainer_applications (status, created_at DESC);

-- ============================================================
-- PROMOTE murutubrian@gmail.com TO ADMIN
-- This sets the role in user_metadata so the admin layout
-- grants access.  Run once after the user has signed up.
-- ============================================================
DO $$
DECLARE
  target_uid uuid;
BEGIN
  SELECT id INTO target_uid
  FROM auth.users
  WHERE email = 'murutubrian@gmail.com'
  LIMIT 1;

  IF target_uid IS NOT NULL THEN
    UPDATE auth.users
    SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
    WHERE id = target_uid;

    RAISE NOTICE 'Admin role granted to murutubrian@gmail.com (uid: %)', target_uid;
  ELSE
    RAISE NOTICE 'User murutubrian@gmail.com not found — sign up first then re-run.';
  END IF;
END;
$$;
