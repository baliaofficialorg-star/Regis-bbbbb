-- Clean up any existing policies to avoid duplicates
drop policy if exists "Users can select their own waitlist entry" on public.waitlist;
drop policy if exists "Users can insert their own waitlist entry" on public.waitlist;
drop policy if exists "Users can update their own waitlist entry" on public.waitlist;
drop policy if exists "Users can delete their own waitlist entry" on public.waitlist;

-- Ensure update_updated_at_column exists
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create waitlist table (idempotent)
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  email text not null,
  name text,
  wallet_address text,
  github text,
  x_handle text,
  role text,
  notes text,
  marketing_opt_in boolean not null default false,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id),
  constraint email_format_valid check (position('@' in email) > 1)
);

-- Enable RLS
alter table public.waitlist enable row level security;

-- Policies: users can manage their own waitlist row
create policy "Users can select their own waitlist entry"
  on public.waitlist for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own waitlist entry"
  on public.waitlist for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own waitlist entry"
  on public.waitlist for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own waitlist entry"
  on public.waitlist for delete
  to authenticated
  using (auth.uid() = user_id);

-- Trigger for updated_at
create or replace trigger update_waitlist_updated_at
before update on public.waitlist
for each row execute function public.update_updated_at_column();

-- Helpful index
create index if not exists idx_waitlist_user_id on public.waitlist(user_id);
