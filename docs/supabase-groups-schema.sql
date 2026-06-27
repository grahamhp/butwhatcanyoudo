-- =========================================================
-- But What Can You Do — Full Supabase Schema Reference
-- Last updated: June 2026
--
-- The authoritative schema lives in the Supabase dashboard.
-- This file is a reference copy. If you need to recreate
-- the database, run the migration at:
--   outputs/supabase-migration.sql
-- =========================================================

-- Tables:
--   groups            — local organizing groups (application/approval workflow)
--   group_members     — join requests for groups without external links
--   volunteers        — volunteer signup form submissions
--   email_subscribers — newsletter / action alert signups
--   contact_messages  — contact form submissions
--   poster_events     — poster download/print tracking
--   site_events       — lightweight analytics (pageviews, clicks)

-- Views:
--   public_groups     — approved groups only, hides organizer PII

-- Key RLS policies:
--   anon can SELECT approved groups and public_groups
--   anon can INSERT into all tables (groups require status='pending')
--   anon can UPDATE email_subscribers (unsubscribe only)
--   No anon DELETE or UPDATE on other tables
--   Admin access via Supabase dashboard or service_role key

-- Functions (RPC):
--   get_nearby_groups(lat, lng, radius_miles)
--   get_group_counts_by_state()
--   get_public_stats()
--   get_dashboard_stats()
--   verify_group_email(token)

-- Triggers:
--   trigger_groups_updated_at     — auto-update updated_at on groups
--   trigger_update_member_count   — auto-count group_members
--   trigger_generate_slug         — auto-generate URL slug for groups
