insert into public.genres (slug, name)
values
  ('fantasy', 'แฟนตาซี'),
  ('drama', 'ดราม่า'),
  ('adventure', 'ผจญภัย'),
  ('slice-of-life', 'ชีวิตประจำวัน')
on conflict (slug) do update set name = excluded.name;
