create or replace function public.can_access_course(course_row public.courses)
returns boolean
language sql
security definer
stable
as $$
  select
    public.is_admin()
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

drop policy if exists "profiles can read self or admins read all" on public.profiles;
create policy "profiles can read self or admins read all"
on public.profiles for select
using (id = auth.uid() or public.is_admin());

drop policy if exists "leaders update status" on public.profiles;
create policy "admins update status"
on public.profiles for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "leaders manage courses" on public.courses;
create policy "admins manage courses"
on public.courses for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "leaders manage modules" on public.modules;
create policy "admins manage modules"
on public.modules for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "leaders manage lessons" on public.lessons;
create policy "admins manage lessons"
on public.lessons for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "leaders manage materials" on public.course_materials;
create policy "admins manage materials"
on public.course_materials for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "course access visible to owners and leaders" on public.course_access;
create policy "course access visible to owners and admins"
on public.course_access for select
using (user_id = auth.uid() or public.is_admin());

drop policy if exists "leaders manage course access" on public.course_access;
create policy "admins manage course access"
on public.course_access for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "members track own progress" on public.lesson_progress;
create policy "members track own progress"
on public.lesson_progress for all
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "announcements visible" on public.announcements;
create policy "announcements visible"
on public.announcements for select
using (is_active = true or public.is_admin());

drop policy if exists "leaders manage announcements" on public.announcements;
create policy "admins manage announcements"
on public.announcements for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "leaders upload course files" on storage.objects;
create policy "admins upload course files"
on storage.objects for insert
with check (bucket_id in ('course-assets', 'course-videos') and public.is_admin());

drop policy if exists "leaders update course files" on storage.objects;
create policy "admins update course files"
on storage.objects for update
using (bucket_id in ('course-assets', 'course-videos') and public.is_admin())
with check (bucket_id in ('course-assets', 'course-videos') and public.is_admin());

drop policy if exists "leaders delete course files" on storage.objects;
create policy "admins delete course files"
on storage.objects for delete
using (bucket_id in ('course-assets', 'course-videos') and public.is_admin());
