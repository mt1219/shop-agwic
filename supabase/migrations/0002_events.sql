-- ============================================================================
-- AGWIC — tracking events
-- Run AFTER 0001_init.sql.
-- ============================================================================

create table if not exists events (
  id           uuid primary key default gen_random_uuid(),
  event_name   text not null,
  page         text,
  product_slug text,
  category     text,
  session_id   text,
  referrer     text,
  ip_hash      text,
  metadata     jsonb,
  created_at   timestamptz not null default now()
);

create index if not exists events_name_created_idx
  on events (event_name, created_at desc);

create index if not exists events_slug_created_idx
  on events (product_slug, created_at desc)
  where product_slug is not null;

create index if not exists events_session_idx
  on events (session_id)
  where session_id is not null;

alter table events enable row level security;

create policy "events public insert"
  on events for insert
  to public
  with check (true);

-- Read is service-role only. No select policy = no reads via anon key.