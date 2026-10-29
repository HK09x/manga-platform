import Link from "next/link";
import { createChapter } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin-header";
import { requireAdmin } from "@/lib/supabase/admin";

export const metadata = { title: "จัดการตอน" };

export default async function ChaptersPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> }) {
  const [{ id }, { error }, { supabase, user }] = await Promise.all([params, searchParams, requireAdmin()]);
  const [{ data: manga }, { data: chapters }] = await Promise.all([supabase.from("manga").select("id, title").eq("id", id).maybeSingle(), supabase.from("chapters").select("id, chapter_number, title, sort_order").eq("manga_id", id).order("sort_order")]);
  if (!manga) return <><AdminHeader email={user.email} /><main className="admin-shell"><p className="admin-notice">ไม่พบรายการนี้</p></main></>;
  const message = error === "duplicate" ? "Slug หรือ sort order นี้ถูกใช้แล้ว" : error ? "บันทึกไม่สำเร็จ กรุณาตรวจข้อมูลแล้วลองอีกครั้ง" : undefined;
  return <><AdminHeader email={user.email} /><main className="admin-shell"><Link className="admin-back-link" href={`/admin/manga/${id}/edit`}>← แก้ไขเรื่อง</Link><span className="eyebrow">CHAPTERS</span><h1>{manga.title}</h1>{message && <p className="admin-error" role="alert">{message}</p>}<form action={createChapter.bind(null, id)} className="admin-form"><label htmlFor="chapterNumber">เลขตอน</label><input id="chapterNumber" maxLength={80} name="chapterNumber" required /><label htmlFor="title">ชื่อตอน</label><input id="title" maxLength={160} name="title" required /><label htmlFor="slug">Slug</label><input id="slug" maxLength={120} name="slug" pattern="[a-z0-9]+(-[a-z0-9]+)*" required /><label htmlFor="sortOrder">ลำดับการแสดง</label><input id="sortOrder" min="0" name="sortOrder" required type="number" step="1" /><button className="button-primary" type="submit">สร้างฉบับร่าง</button></form>{chapters?.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>ลำดับ</th><th>ตอน</th><th>ชื่อ</th></tr></thead><tbody>{chapters.map((chapter) => <tr key={chapter.id}><td>{chapter.sort_order}</td><td>{chapter.chapter_number}</td><th scope="row">{chapter.title}</th></tr>)}</tbody></table></div> : null}</main></>;
}
