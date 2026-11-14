-- ============================================================================
-- AGWIC — initial schema
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- product_images
-- Mirrors the gallery_images pattern: product files in code (lib/products/),
-- images in Storage, paths referenced here by slug.
-- ----------------------------------------------------------------------------
create table if not exists product_images (
  id           uuid primary key default gen_random_uuid(),
  product_slug text not null,
  storage_path text not null,
  alt          text,
  sort_order   int  not null default 0,
  is_hero      boolean not null default false,
  created_at   timestamptz not null default now()
);

create index if not exists product_images_slug_idx
  on product_images (product_slug, sort_order);

alter table product_images enable row level security;

create policy "product_images public read"
  on product_images for select
  to public
  using (true);

create policy "product_images authenticated write"
  on product_images for all
  to authenticated
  using (true)
  with check (true);

-- ----------------------------------------------------------------------------
-- product_stats
-- Counters that power rankings + display numbers. Bumped by RPC.
-- ----------------------------------------------------------------------------
create table if not exists product_stats (
  product_slug       text primary key,
  add_to_cart_count  int not null default 0,
  purchase_count     int not null default 0,
  last_added_at      timestamptz,
  last_purchased_at  timestamptz,
  avg_rating         numeric(3,2),
  review_count       int not null default 0,
  updated_at         timestamptz not null default now()
);

alter table product_stats enable row level security;

create policy "product_stats public read"
  on product_stats for select
  to public
  using (true);

-- ----------------------------------------------------------------------------
-- reviews
-- Seeded reviews (is_seed = true) + user reviews.
-- ----------------------------------------------------------------------------
create table if not exists reviews (
  id                 uuid primary key default gen_random_uuid(),
  product_slug       text not null,
  author_name        text not null,
  rating             int check (rating between 1 and 5),
  title              text,
  body               text not null,
  is_seed            boolean not null default false,
  verified_purchase  boolean not null default false,
  helpful_count      int not null default 0,
  published          boolean not null default false,
  created_at         timestamptz not null default now()
);

create index if not exists reviews_slug_created_idx
  on reviews (product_slug, created_at desc);

alter table reviews enable row level security;

create policy "reviews public read published"
  on reviews for select
  to public
  using (published = true);

create policy "reviews public insert"
  on reviews for insert
  to public
  with check (true);

-- ----------------------------------------------------------------------------
-- RPC: bump_stat
-- Called from server actions to increment add-to-cart / purchase counters.
-- ----------------------------------------------------------------------------
create or replace function bump_stat(slug text, kind text)
returns void
language plpgsql
security definer
as $$
begin
  if kind not in ('add', 'purchase') then
    raise exception 'bump_stat: kind must be add or purchase, got %', kind;
  end if;

  insert into product_stats (product_slug) values (slug)
    on conflict (product_slug) do nothing;

  if kind = 'add' then
    update product_stats
       set add_to_cart_count = add_to_cart_count + 1,
           last_added_at     = now(),
           updated_at        = now()
     where product_slug = slug;
  else
    update product_stats
       set purchase_count     = purchase_count + 1,
           last_purchased_at  = now(),
           updated_at         = now()
     where product_slug = slug;
  end if;
end;
$$;

grant execute on function bump_stat(text, text) to anon, authenticated;

-- ----------------------------------------------------------------------------
-- RPC: recompute_review_stats
-- Called after a review is inserted. Recomputes avg_rating + review_count.
-- ----------------------------------------------------------------------------
create or replace function recompute_review_stats(slug text)
returns void
language plpgsql
security definer
as $$
begin
  insert into product_stats (product_slug) values (slug)
    on conflict (product_slug) do nothing;

  update product_stats
     set avg_rating   = (
           select round(avg(rating)::numeric, 2)
             from reviews
            where product_slug = slug
              and rating is not null
              and published = true
         ),
         review_count = (
           select count(*)
             from reviews
            where product_slug = slug
              and published = true
         ),
         updated_at   = now()
   where product_slug = slug;
end;
$$;

grant execute on function recompute_review_stats(text) to anon, authenticated;

-- ----------------------------------------------------------------------------
-- Storage bucket: product-images
-- Public read, authenticated write. Matches your gallery pattern.
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "product-images public read"
  on storage.objects for select
  to public
  using (bucket_id = 'product-images');

create policy "product-images authenticated write"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');