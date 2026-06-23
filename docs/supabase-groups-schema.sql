-- =========================================================
-- But What Can You Do — Groups Directory Schema
-- Run this in your Supabase SQL Editor (supabase.com)
-- =========================================================

-- 1. Groups table
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT NOT NULL,
  description TEXT,
  contact_email TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  platform TEXT CHECK (platform IN ('facebook','discord','signal','whatsapp','groupme','other','none')),
  platform_link TEXT,
  agree_to_contact BOOLEAN NOT NULL DEFAULT true,
  approved BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Reports table (for unresponsive groups)
CREATE TABLE group_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  reporter_email TEXT NOT NULL,
  report_type TEXT NOT NULL DEFAULT 'unresponsive',
  message TEXT,
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Inquiries table (contact requests forwarded to organizers)
CREATE TABLE group_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  requester_email TEXT NOT NULL,
  forwarded BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Indexes
CREATE INDEX idx_groups_state ON groups(state);
CREATE INDEX idx_groups_approved ON groups(approved, active);
CREATE INDEX idx_reports_group ON group_reports(group_id);
CREATE INDEX idx_inquiries_group ON group_inquiries(group_id);

-- 5. Row Level Security (RLS)
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_inquiries ENABLE ROW LEVEL SECURITY;

-- Public can read approved, active groups (no email exposed)
CREATE POLICY "Public can view approved groups"
  ON groups FOR SELECT
  USING (approved = true AND active = true);

-- Public can insert new groups (pending approval)
CREATE POLICY "Anyone can register a group"
  ON groups FOR INSERT
  WITH CHECK (approved = false);

-- Public can insert reports
CREATE POLICY "Anyone can report a group"
  ON group_reports FOR INSERT
  WITH CHECK (true);

-- Public can insert inquiries
CREATE POLICY "Anyone can inquire about a group"
  ON group_inquiries FOR INSERT
  WITH CHECK (true);

-- =========================================================
-- ADMIN ACCESS: Use the Supabase dashboard or service_role
-- key to approve groups, view reports, etc.
--
-- To approve a group from the dashboard:
--   UPDATE groups SET approved = true WHERE id = '...';
--
-- To view pending groups:
--   SELECT * FROM groups WHERE approved = false ORDER BY created_at DESC;
--
-- To view unresolved reports:
--   SELECT r.*, g.name, g.contact_email
--   FROM group_reports r JOIN groups g ON r.group_id = g.id
--   WHERE r.resolved = false ORDER BY r.created_at DESC;
-- =========================================================

-- NOTE: The SELECT policy above exposes all columns of approved groups.
-- contact_email is NOT shown on the frontend (the JS doesn't render it),
-- but it IS technically accessible via the API. If you want to hide it
-- from the API entirely, create a view:
--
-- CREATE VIEW public_groups AS
--   SELECT id, name, state, city, description, platform, platform_link, created_at
--   FROM groups WHERE approved = true AND active = true;
--
-- Then query 'public_groups' instead of 'groups' in the frontend JS.
