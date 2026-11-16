-- ----------------------------------------------------------------------------
-- contact_submissions
-- ----------------------------------------------------------------------------
create table if not exists contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text,
  email       text not null,
  subject     text,
  message     text not null,
  ip_hash     text,
  created_at  timestamptz not null default now(),
  responded_at timestamptz
);

create index if not exists contact_submissions_created_idx
  on contact_submissions (created_at desc);

alter table contact_submissions enable row level security;

create policy "contact_submissions public insert"
  on contact_submissions for insert
  to public
  with check (true);

-- ----------------------------------------------------------------------------
-- product_requests
-- ----------------------------------------------------------------------------
create table if not exists product_requests (
  id           uuid primary key default gen_random_uuid(),
  email        text,
  product_idea text not null,
  grievance    text,
  created_at   timestamptz default now(),
  reviewed     boolean not null default false
);

create index if not exists product_requests_created_idx
  on product_requests (created_at desc);

alter table product_requests enable row level security;

create policy "product_requests public insert"
  on product_requests for insert
  to public
  with check (true);

-- ----------------------------------------------------------------------------
-- email_signups
-- ----------------------------------------------------------------------------
create table if not exists email_signups (
  id           uuid primary key default gen_random_uuid(),
  email        text not null unique,
  source       text,
  product_slug text,
  metadata     jsonb,
  created_at   timestamptz not null default now(),
  unsubscribed_at timestamptz
);

create index if not exists email_signups_source_idx
  on email_signups (source);

alter table email_signups enable row level security;

create policy "email_signups public insert"
  on email_signups for insert
  to public
  with check (true);

-- ----------------------------------------------------------------------------
-- emails
-- ----------------------------------------------------------------------------
create table if not exists emails (
  id            uuid primary key default gen_random_uuid(),
  to_email      text not null,
  from_email    text not null,
  subject       text not null,
  template      text,
  resend_id     text,
  status        text not null default 'queued',
  error         text,
  related_slug  text,
  related_id    uuid,
  metadata      jsonb,
  sent_at       timestamptz not null default now(),
  delivered_at  timestamptz,
  opened_at     timestamptz,
  clicked_at    timestamptz
);

create index if not exists emails_to_idx
  on emails (to_email, sent_at desc);

create index if not exists emails_template_idx
  on emails (template, sent_at desc);

create index if not exists emails_resend_id_idx
  on emails (resend_id)
  where resend_id is not null;

alter table emails enable row level security;

-- ----------------------------------------------------------------------------
-- RPC: log_email
-- ----------------------------------------------------------------------------
create or replace function log_email(
  p_to        text,
  p_from      text,
  p_subject   text,
  p_template  text default null,
  p_resend_id text default null,
  p_status    text default 'sent',
  p_error     text default null,
  p_related_slug text default null,
  p_related_id   uuid default null,
  p_metadata  jsonb default null
) returns uuid
language plpgsql
security definer
as $$
declare
  new_id uuid;
begin
  insert into emails (
    to_email, from_email, subject, template, resend_id, status, error,
    related_slug, related_id, metadata
  )
  values (
    p_to, p_from, p_subject, p_template, p_resend_id, p_status, p_error,
    p_related_slug, p_related_id, p_metadata
  )
  returning id into new_id;
  return new_id;
end;
$$;

grant execute on function log_email(
  text, text, text, text, text, text, text, text, uuid, jsonb
) to authenticated;