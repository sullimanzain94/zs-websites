/*
# Create leads pipeline tables (single-tenant, no auth)

1. New Tables
- `leads`
  - `id` (uuid, primary key)
  - `name` (text, not null) — customer name
  - `vehicle` (text) — vehicle of interest
  - `budget` (text) — monthly budget or cash buyer info
  - `phone` (text) — WhatsApp/contact number
  - `score` (int, default 50) — lead score 0-100
  - `stage` (text, default 'new_lead') — pipeline stage
  - `priority` (text, default 'warm') — hot/warm/cold
  - `notes` (text) — free-form notes
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

2. Security
- Enable RLS on `leads`.
- Allow anon + authenticated CRUD — single-tenant internal ops tool, no sign-in screen.

3. Indexes
- Index on `stage` for column filtering
- Index on `created_at` for sorting
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  vehicle text,
  budget text,
  phone text,
  score int NOT NULL DEFAULT 50,
  stage text NOT NULL DEFAULT 'new_lead',
  priority text NOT NULL DEFAULT 'warm',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_leads" ON leads;
CREATE POLICY "anon_select_leads" ON leads FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
CREATE POLICY "anon_insert_leads" ON leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_leads" ON leads;
CREATE POLICY "anon_update_leads" ON leads FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_leads" ON leads;
CREATE POLICY "anon_delete_leads" ON leads FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads (stage);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
