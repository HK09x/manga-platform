create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.genres (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null unique
);

create table public.manga (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  cover_key text,
  author_name text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.manga_genres (
  manga_id uuid not null references public.manga (id) on delete cascade,
  genre_id uuid not null references public.genres (id) on delete restrict,
  primary key (manga_id, genre_id)
);

create index manga_genres_genre_id_idx on public.manga_genres (genre_id, manga_id);
create index manga_public_updated_at_idx on public.manga (updated_at desc) where status = 'published';

create table public.chapters (
  id uuid primary key default gen_random_uuid(),
  manga_id uuid not null references public.manga (id) on delete cascade,
  slug text not null,
  chapter_number text not null,
  title text not null,
  sort_order integer not null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  unique (manga_id, slug),
  unique (manga_id, sort_order)
);

create table public.chapter_pages (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references public.chapters (id) on delete cascade,
  page_number integer not null check (page_number > 0),
  object_key text not null,
  width integer not null check (width > 0),
  height integer not null check (height > 0),
  unique (chapter_id, page_number)
);

alter table public.profiles enable row level security;
alter table public.genres enable row level security;
alter table public.manga enable row level security;
alter table public.manga_genres enable row level security;
alter table public.chapters enable row level security;
alter table public.chapter_pages enable row level security;

create policy "Members can read their own profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

create policy "Members can update their own profile"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "Anyone can read genres"
  on public.genres for select to anon, authenticated
  using (true);

create policy "Anyone can read published manga"
  on public.manga for select to anon, authenticated
  using (status = 'published');

create policy "Anyone can read genres for published manga"
  on public.manga_genres for select to anon, authenticated
  using (
    exists (
      select 1 from public.manga
      where manga.id = manga_id and manga.status = 'published'
    )
  );

create policy "Anyone can read published chapters"
  on public.chapters for select to anon, authenticated
  using (
    status = 'published'
    and exists (
      select 1 from public.manga
      where manga.id = manga_id and manga.status = 'published'
    )
  );

create policy "Anyone can read pages of published chapters"
  on public.chapter_pages for select to anon, authenticated
  using (
    exists (
      select 1
      from public.chapters
      join public.manga on manga.id = chapters.manga_id
      where chapters.id = chapter_id
        and chapters.status = 'published'
        and manga.status = 'published'
    )
  );

grant select on public.genres, public.manga, public.manga_genres, public.chapters, public.chapter_pages
  to anon, authenticated;
grant select, update on public.profiles to authenticated;
revoke update on public.profiles from authenticated;
grant update (username, avatar_url) on public.profiles to authenticated;
