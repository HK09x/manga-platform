# Admin access

Admin access uses Supabase Auth email and password. There is no public Admin registration. Every Admin page and Server Action must call `requireAdmin()` or perform an equivalent server-side role check. RLS provides the database authorization boundary for content writes.

## First Admin setup

1. Configure the Supabase URL and publishable key from `.env.example` in the local environment.
2. Apply the project migrations, including `20261023020000_admin_access.sql` and `20261025010000_manga_rights_review.sql`.
3. Create the first user from the trusted Supabase Dashboard under Authentication. Keep public signups disabled.
4. In the trusted SQL editor, promote that exact Auth user by replacing the placeholder with the account email:

```sql
update public.profiles as profile
set role = 'admin'
from auth.users as auth_user
where profile.id = auth_user.id
  and auth_user.email = 'admin@example.com';
```

5. Sign in at `/admin/login` and confirm the account can open `/admin`.

The `role` column defaults to `member`. The existing profile update grant only permits `username` and `avatar_url`, so users cannot promote themselves through the public profile API. Keep the promotion step restricted to a trusted database operator.

## Authorization requirements

- Use the server Supabase client and `auth.getUser()` for protected requests.
- Check `profiles.role` on the server for every Admin page and Server Action.
- Keep content table writes behind the `is_admin()` RLS policies.
- Manga can be published only after an Admin confirms publication rights and at least one published chapter has page records.
- Never expose a Supabase service role key to the browser.
