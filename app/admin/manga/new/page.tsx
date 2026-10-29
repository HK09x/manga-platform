import Link from "next/link";
import { AdminHeader } from "@/components/admin-header";
import { createManga } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/supabase/admin";

export const metadata = { title: "เพิ่มมังงะ" };

type NewMangaPageProps = {
  searchParams: Promise<{ error?: string | string[] }>;
};

function errorMessage(error: string | string[] | undefined) {
  const value = Array.isArray(error) ? error[0] : error;
  if (value === "duplicate") return "Slug นี้ถูกใช้แล้ว กรุณาเลือกชื่อ URL อื่น";
  if (value === "save") return "บันทึกไม่สำเร็จ กรุณาตรวจการเชื่อมต่อฐานข้อมูลแล้วลองอีกครั้ง";
  if (value === "invalid") return "กรุณากรอกชื่อเรื่องและ Slug ให้ถูกต้อง";
}

export default async function NewMangaPage({ searchParams }: NewMangaPageProps) {
  const [{ user }, params] = await Promise.all([requireAdmin(), searchParams]);
  const error = errorMessage(params.error);

  return (
    <>
      <AdminHeader email={user.email} />
      <main className="admin-shell">
        <Link className="admin-back-link" href="/admin/manga">← รายการมังงะ</Link>
        <div className="admin-page-heading">
          <div>
            <span className="eyebrow">CATALOG</span>
            <h1>เพิ่มมังงะ</h1>
            <p className="admin-dashboard-intro">สร้างฉบับร่างก่อนเพิ่มตอนและเผยแพร่</p>
          </div>
        </div>
        {error && <p className="admin-error" role="alert">{error}</p>}
        <form action={createManga} className="admin-form">
          <label htmlFor="title">ชื่อเรื่อง</label>
          <input autoFocus id="title" maxLength={160} name="title" required />

          <label htmlFor="slug">Slug</label>
          <input
            aria-describedby="slug-help"
            id="slug"
            maxLength={120}
            name="slug"
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            required
          />
          <span className="admin-field-help" id="slug-help">ใช้ตัวอักษรอังกฤษพิมพ์เล็ก ตัวเลข และขีดกลาง เช่น `my-manga`</span>

          <label htmlFor="authorName">ผู้สร้างหรือผู้ถือลิขสิทธิ์ <span className="admin-optional">(ไม่บังคับ)</span></label>
          <input id="authorName" maxLength={160} name="authorName" />

          <label htmlFor="description">เรื่องย่อ <span className="admin-optional">(ไม่บังคับ)</span></label>
          <textarea id="description" maxLength={5000} name="description" rows={6} />

          <button className="button-primary" type="submit">บันทึกเป็นฉบับร่าง</button>
        </form>
      </main>
    </>
  );
}
