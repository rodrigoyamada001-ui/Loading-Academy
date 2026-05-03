create extension if not exists "pgcrypto";

create type public.profile_status as enum ('pending', 'approved', 'rejected');
create type public.profile_role as enum ('member', 'leader', 'admin');
create type public.course_status as enum ('draft', 'published', 'inactive');
create type public.course_level as enum ('basic', 'intermediate', 'leadership');
create type public.access_mode as enum ('all', 'specific');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  role public.profile_role not null default 'member',
  status public.profile_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  cover_url text,
  status public.course_status not null default 'draft',
  level public.course_level not null default 'basic',
  access_mode public.access_mode not null default 'all',
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  description text,
  position integer not null default 1,
  created_at timestamptz not null default now()
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  title text not null,
  content text,
  video_url text,
  pdf_url text,
  image_url text,
  video_file_url text,
  position integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.course_materials (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete cascade,
  type text not null check (type in ('pdf', 'image', 'video')),
  title text not null,
  file_url text not null,
  created_at timestamptz not null default now()
);

create table public.course_access (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  last_lesson_id uuid references public.lessons(id) on delete set null,
  granted_at timestamptz not null default now(),
  unique (course_id, user_id)
);

create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  completed_at timestamptz not null default now(),
  unique (lesson_id, user_id)
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  is_active boolean not null default true,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
create trigger courses_updated_at before update on public.courses for each row execute procedure public.set_updated_at();
create trigger lessons_updated_at before update on public.lessons for each row execute procedure public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role, status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email,
    'member',
    'pending'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.prevent_role_change_by_leader()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if auth.uid() is null then
    return new;
  end if;

  if old.role is distinct from new.role and not public.is_admin() then
    raise exception 'Only admins can change user roles.';
  end if;
  return new;
end;
$$;

create trigger prevent_role_change_by_leader
before update on public.profiles
for each row execute procedure public.prevent_role_change_by_leader();

create or replace function public.current_role()
returns public.profile_role
language sql
security definer
stable
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.current_status()
returns public.profile_status
language sql
security definer
stable
as $$
  select status from public.profiles where id = auth.uid();
$$;

create or replace function public.is_leader_or_admin()
returns boolean
language sql
security definer
stable
as $$
  select coalesce(public.current_role() in ('leader', 'admin'), false);
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select coalesce(public.current_role() = 'admin', false);
$$;

create or replace function public.can_access_course(course_row public.courses)
returns boolean
language sql
security definer
stable
as $$
  select
    public.is_leader_or_admin()
    or (
      public.current_status() = 'approved'
      and course_row.status = 'published'
      and (
        course_row.access_mode = 'all'
        or exists (
          select 1 from public.course_access ca
          where ca.course_id = course_row.id and ca.user_id = auth.uid()
        )
      )
    );
$$;

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.course_materials enable row level security;
alter table public.course_access enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.announcements enable row level security;

create policy "profiles can read self or admins read all"
on public.profiles for select
using (id = auth.uid() or public.is_leader_or_admin());

create policy "leaders update status"
on public.profiles for update
using (public.is_leader_or_admin())
with check (public.is_leader_or_admin());

create policy "admins update roles"
on public.profiles for update
using (public.is_admin())
with check (public.is_admin());

create policy "courses visible by access"
on public.courses for select
using (public.can_access_course(courses));

create policy "leaders manage courses"
on public.courses for all
using (public.is_leader_or_admin())
with check (public.is_leader_or_admin());

create policy "modules visible by course access"
on public.modules for select
using (exists (select 1 from public.courses c where c.id = modules.course_id and public.can_access_course(c)));

create policy "leaders manage modules"
on public.modules for all
using (public.is_leader_or_admin())
with check (public.is_leader_or_admin());

create policy "lessons visible by course access"
on public.lessons for select
using (
  exists (
    select 1
    from public.modules m
    join public.courses c on c.id = m.course_id
    where m.id = lessons.module_id and public.can_access_course(c)
  )
);

create policy "leaders manage lessons"
on public.lessons for all
using (public.is_leader_or_admin())
with check (public.is_leader_or_admin());

create policy "materials visible by course access"
on public.course_materials for select
using (
  exists (select 1 from public.courses c where c.id = course_materials.course_id and public.can_access_course(c))
  or exists (
    select 1
    from public.lessons l
    join public.modules m on m.id = l.module_id
    join public.courses c on c.id = m.course_id
    where l.id = course_materials.lesson_id and public.can_access_course(c)
  )
);

create policy "leaders manage materials"
on public.course_materials for all
using (public.is_leader_or_admin())
with check (public.is_leader_or_admin());

create policy "course access visible to owners and leaders"
on public.course_access for select
using (user_id = auth.uid() or public.is_leader_or_admin());

create policy "leaders manage course access"
on public.course_access for all
using (public.is_leader_or_admin())
with check (public.is_leader_or_admin());

create policy "members track own progress"
on public.lesson_progress for all
using (user_id = auth.uid() or public.is_leader_or_admin())
with check (user_id = auth.uid() or public.is_leader_or_admin());

create policy "announcements visible"
on public.announcements for select
using (is_active = true or public.is_leader_or_admin());

create policy "leaders manage announcements"
on public.announcements for all
using (public.is_leader_or_admin())
with check (public.is_leader_or_admin());

insert into storage.buckets (id, name, public)
values ('course-assets', 'course-assets', true),
       ('course-videos', 'course-videos', true)
on conflict (id) do nothing;

create policy "course assets public read"
on storage.objects for select
using (bucket_id in ('course-assets', 'course-videos'));

create policy "leaders upload course files"
on storage.objects for insert
with check (bucket_id in ('course-assets', 'course-videos') and public.is_leader_or_admin());

create policy "leaders update course files"
on storage.objects for update
using (bucket_id in ('course-assets', 'course-videos') and public.is_leader_or_admin())
with check (bucket_id in ('course-assets', 'course-videos') and public.is_leader_or_admin());

create policy "leaders delete course files"
on storage.objects for delete
using (bucket_id in ('course-assets', 'course-videos') and public.is_leader_or_admin());
