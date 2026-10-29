alter table public.profiles
  add column role text not null default 'member'
  check (role in ('member', 'admin'));

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

revoke all on function public.handle_new_user() from public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

insert into public.profiles (id)
select id from auth.users
on conflict (id) do nothing;

create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create policy "Admins can manage manga"
  on public.manga for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can manage manga genres"
  on public.manga_genres for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can manage chapters"
  on public.chapters for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can manage chapter pages"
  on public.chapter_pages for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

grant insert, update, delete on public.manga, public.manga_genres,
  public.chapters, public.chapter_pages to authenticated;
