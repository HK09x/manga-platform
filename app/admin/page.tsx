import Link from "next/link";
import { AdminHeader } from "@/components/admin-header";
import { requireAdmin } from "@/lib/supabase/admin";

export const metadata = { title: "แดชบอร์ด Admin" };

export default async function AdminDashboardPage() {
  const { user } = await requireAdmin();

  return (
    <>
      <AdminHeader email={user.email} />
      <main className="admin-shell">
        <span className="eyebrow">CONTENT WORKSPACE</span>
        <h1>จัดการเนื้อหา</h1>
        <p className="admin-dashboard-intro">
          พื้นที่สำหรับดูแลรายการมังงะและเตรียมเนื้อหาก่อนเผยแพร่
        </p>
        <section aria-label="เครื่องมือจัดการ" className="admin-dashboard-grid">
          <Link className="admin-dashboard-card" href="/admin/manga">
            <span aria-hidden="true" className="admin-card-icon">▤</span>
            <span className="admin-card-title">รายการมังงะ</span>
            <span className="admin-card-description">ตรวจสอบรายการและสถานะเนื้อหา</span>
          </Link>
        </section>
      </main>
    </>
  );
}
