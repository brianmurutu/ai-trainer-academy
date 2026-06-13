-- Migration: Add is_suspended column to trainer_applications
-- Run this in your Supabase SQL Editor (Dashboard ? SQL Editor ? New Query)

ALTER TABLE trainer_applications
  ADD COLUMN IF NOT EXISTS is_suspended BOOLEAN NOT NULL DEFAULT FALSE;

-- Optional: index for fast lookups
CREATE INDEX IF NOT EXISTS idx_trainer_applications_suspended
  ON trainer_applications (is_suspended);

-- Also ensure user_id column exists
-- (needed so the suspend action can look up the linked public trainer row)
ALTER TABLE trainer_applications
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
