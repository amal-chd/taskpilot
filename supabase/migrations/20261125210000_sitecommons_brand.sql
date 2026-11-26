-- Update platform branding without rewriting historical billing records or tenant names.
update public.platform_settings
set value = value
  || case when coalesce(value->>'product_name', '') in ('', 'Task Pilot', 'TaskPilot')
          then jsonb_build_object('product_name', 'SiteCommons') else '{}'::jsonb end
  || case when coalesce(value->>'support_email', '') in ('', 'support@taskpilot.app')
          then jsonb_build_object('support_email', 'info@thekada.in') else '{}'::jsonb end,
    updated_at = now()
where key = 'general'
  and (coalesce(value->>'product_name', '') in ('', 'Task Pilot', 'TaskPilot')
    or coalesce(value->>'support_email', '') in ('', 'support@taskpilot.app'));

create or replace function public.run_subscription_lifecycle()
returns void language plpgsql security definer set search_path = public as $$
declare grace integer := coalesce((select (value->>'grace_period_days')::int from platform_settings where key='general'), 7);
begin
  -- Trial reminders (3 days and 1 day before end) to the owner.
  insert into public.app_notifications (id, title, body, user_id, is_read, type, related_id, related_type, created_at, org_id)
  select gen_random_uuid()::text,
         'Your SiteCommons trial ends ' || case when o.trial_ends_at::date = (now() + interval '1 day')::date then 'tomorrow' else 'in 3 days' end,
         'Choose a plan in Settings → Billing to keep your workspace running without interruption.',
         o.owner_uid, '{}'::jsonb, 'billing', o.id, 'organization', now(), o.id
    from public.organizations o
   where o.status = 'trialing' and o.owner_uid is not null
     and o.trial_ends_at::date in ((now() + interval '3 days')::date, (now() + interval '1 day')::date)
     and not exists (select 1 from public.app_notifications n
                      where n.related_id = o.id and n.type = 'billing' and n.created_at::date = now()::date);

  update public.organizations set status = 'expired', updated_at = now()
   where status = 'trialing' and trial_ends_at < now() and not is_legacy;

  update public.organizations set status = 'suspended', updated_at = now()
   where status = 'past_due' and not is_legacy
     and coalesce(current_period_end, now()) < now() - make_interval(days => grace);
end $$;

revoke execute on function public.run_subscription_lifecycle() from anon, authenticated, public;
