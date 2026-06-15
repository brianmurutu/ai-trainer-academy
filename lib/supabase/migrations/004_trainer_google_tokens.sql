-- ============================================================
-- 004_trainer_google_tokens.sql
-- AI Trainer Academy - Google OAuth storage fields for trainers
-- ============================================================

ALTER TABLE trainers 
  ADD COLUMN IF NOT EXISTS google_refresh_token text,
  ADD COLUMN IF NOT EXISTS google_access_token text,
  ADD COLUMN IF NOT EXISTS google_token_expires_at timestamptz,
  ADD COLUMN IF NOT EXISTS google_calendar_connected boolean DEFAULT false;
