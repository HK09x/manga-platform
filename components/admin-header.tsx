import Link from "next/link";
import { signOutAdmin } from "@/app/admin/actions";

export function AdminHeader({ email }: { email: string | undefined }) {
  return (
    <header className="admin-header">
      <Link aria-label="Komi Admin" className="brand" href="/admin">
        <span aria-hidden="true" className="brand-mark">K</span>
        <span>Komi <span className="admin-brand-label">Admin</span></span>
      </Link>
      <span className="admin-account">{email}</span>
      <form action={signOutAdmin}>
        <button className="admin-signout" type="submit">ออกจากระบบ</button>
      </form>
    </header>
  );
}
