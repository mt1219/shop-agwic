-- 0004_explicit_grants.sql
-- Required for Supabase projects created after May 30, 2026

-- Public read tables (anon + authenticated can SELECT)
GRANT SELECT ON public.product_images TO anon, authenticated;
GRANT SELECT ON public.product_stats TO anon, authenticated;
GRANT SELECT ON public.reviews TO anon, authenticated;

-- Insert-only tables (anon + authenticated can INSERT)
GRANT INSERT ON public.reviews TO anon, authenticated;
GRANT INSERT ON public.events TO anon, authenticated;
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT INSERT ON public.product_requests TO anon, authenticated;
GRANT INSERT ON public.email_signups TO anon, authenticated;

-- Service role needs full access on everything for server actions
GRANT ALL ON public.product_images TO service_role;
GRANT ALL ON public.product_stats TO service_role;
GRANT ALL ON public.reviews TO service_role;
GRANT ALL ON public.events TO service_role;
GRANT ALL ON public.contact_submissions TO service_role;
GRANT ALL ON public.product_requests TO service_role;
GRANT ALL ON public.email_signups TO service_role;
GRANT ALL ON public.emails TO service_role;

-- Ensure the RPCs are executable
GRANT EXECUTE ON FUNCTION public.bump_stat(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.recompute_review_stats(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.log_email(text, text, text, text, text, text, text, text, uuid, jsonb) TO service_role;