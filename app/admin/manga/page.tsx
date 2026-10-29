import Link from "next/link";
import { AdminHeader } from "@/components/admin-header";
import { requireAdmin } from "@/lib/supabase/admin";

export const metadata = { title: "รายการมังงะ" };

const statusLabels: Record<string, string> = {
  draft: "ฉบับร่าง",
  published: "เผยแพร่แล้ว",
  archived: "เก็บถาวร",
};

export default async function AdminMangaPage() {
  const { supabase, user } = await requireAdmin();
  const { data: manga, error } = await supabase
    .from("manga")
    .select("id, title, slug, status, updated_at")
    .order("updated_at", { ascending: false });

  return (
    <>
      <AdminHeader email={user.email} />
      <main className="admin-shell">
        <Link className="admin-back-link" href="/admin">← แดชบอร์ด</Link>
        <div className="admin-page-heading">
          <div>
            <span className="eyebrow">CATALOG</span>
            <h1>รายการมังงะ</h1>
            <p className="admin-dashboard-intro">จัดการสถานะและตรวจสอบเนื้อหาในระบบ</p>
          </div>
          <Link className="admin-create-link" href="/admin/manga/new">
            เพิ่มเรื่องใหม่
          </Link>
        </div>
        {error ? (
          <p className="admin-notice" role="status">
            โหลดรายการไม่สำเร็จ กรุณาตรวจ migration และการเชื่อมต่อฐานข้อมูล
          </p>
        ) : manga?.length ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th scope="col">ชื่อเรื่อง</th><th scope="col">Slug</th><th scope="col">สถานะ</th><th scope="col"><span className="sr-only">การทำงาน</span></th></tr></thead>
              <tbody>
                {manga.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.title}</th>
                    <td>{item.slug}</td>
                    <td><span className={`admin-status admin-status-${item.status}`}>{statusLabels[item.status] ?? item.status}</span></td>
                    <td><Link className="admin-table-link" href={`/admin/manga/${item.id}/edit`}>แก้ไข</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="admin-empty-state">
            <span aria-hidden="true" className="admin-card-icon">▤</span>
            <h2>ยังไม่มีรายการมังงะ</h2>
            <p>เมื่อเชื่อมฐานข้อมูลและเพิ่มเนื้อหาแล้ว รายการจะแสดงที่นี่</p>
          </div>
        )}
      </main>
    </>
  );
}
