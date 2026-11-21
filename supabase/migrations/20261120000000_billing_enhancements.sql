-- ═══════════════════════════════════════════════════════════════════════════
--  Task Pilot SaaS — Billing enhancements & Razorpay configuration
-- ═══════════════════════════════════════════════════════════════════════════

insert into public.platform_settings (key, value) values
  ('razorpay', '{"key_id":"","key_secret":"","webhook_secret":""}'::jsonb)
on conflict (key) do nothing;

create index if not exists payments_provider_payment_idx on public.payments(provider_payment_id);
create index if not exists subscriptions_provider_sub_idx on public.subscriptions(provider_subscription_id);
