import { Suspense } from "react";
import { signInAdmin } from "@/app/admin/login/actions";
import { isSupabaseConfigured } from "@/lib/supabase/server";

type SearchParams = Promise<{ error?: string | string[] }>;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export const metadata = { title: "เข้าสู่ระบบ Admin" };

async function LoginContent({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const unavailable = !isSupabaseConfigured();
  const hasError = firstValue(params.error) === "signin" || firstValue(params.error) === "unauthorized";

  return (
    <main className="admin-auth-shell">
      <section aria-labelledby="admin-login-title" className="admin-auth-card">
        <span className="eyebrow">KOMI · ADMIN</span>
        <h1 id="admin-login-title">เข้าสู่ระบบผู้ดูแล</h1>
        <p>ใช้บัญชีผู้ดูแลที่ได้รับอนุญาตเพื่อจัดการเนื้อหา</p>
        {unavailable ? (
          <p className="admin-notice" role="status">
            ยังไม่ได้ตั้งค่า Supabase กรุณากำหนดค่าการเชื่อมต่อก่อนเข้าสู่ระบบ
          </p>
        ) : (
          <>
            {hasError && (
              <p className="admin-error" role="alert">
                เข้าสู่ระบบไม่สำเร็จ ตรวจสอบบัญชีและสิทธิ์ผู้ดูแลแล้วลองอีกครั้ง
              </p>
            )}
            <form action={signInAdmin} className="admin-login-form">
              <label htmlFor="admin-email">อีเมล</label>
              <input
                autoComplete="username"
                id="admin-email"
                maxLength={254}
                name="email"
                required
                type="email"
              />
              <label htmlFor="admin-password">รหัสผ่าน</label>
              <input
                autoComplete="current-password"
                id="admin-password"
                maxLength={256}
                name="password"
                required
                type="password"
              />
              <button className="button-primary" type="submit">
                เข้าสู่ระบบ
              </button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <Suspense fallback={<main className="admin-auth-shell">กำลังโหลด…</main>}>
      <LoginContent searchParams={searchParams} />
    </Suspense>
  );
}
