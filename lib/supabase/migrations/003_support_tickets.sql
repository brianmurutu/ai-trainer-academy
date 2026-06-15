-- ============================================================
-- 003_support_tickets.sql
-- AI Trainer Academy - Support Tickets Table + RLS Policies
-- ============================================================

CREATE TABLE IF NOT EXISTS support_tickets (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  subject      text NOT NULL,
  message      text NOT NULL,
  status       text NOT NULL DEFAULT 'open', -- open | resolved | closed
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Learners can read only their own tickets
CREATE POLICY "tickets_learner_read" ON support_tickets
  FOR SELECT USING (auth.uid() = user_id);

-- Learners can insert only their own tickets
CREATE POLICY "tickets_learner_insert" ON support_tickets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Note: Admin / service role bypasses RLS automatically, no extra policies needed.
