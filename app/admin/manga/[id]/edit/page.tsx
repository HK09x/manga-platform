import Link from "next/link";
import { updateManga } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin-header";
import { requireAdmin } from "@/lib/supabase/admin";

export const metadata = { title: "แก้ไขมังงะ" };

type EditMangaPageProps = { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> };

export default async function EditMangaPage({ params, searchParams }: EditMangaPageProps) {
  const [{ id }, { error }, { supabase, user }] = await Promise.all([params, searchParams, requireAdmin()]);
  const { data: manga } = await supabase.from("manga").select("id, title, slug, description, author_name, status, rights_confirmed").eq("id", id).maybeSingle();
  if (!manga) return <main className="admin-shell"><p className="admin-notice">ไม่พบรายการนี้</p></main>;

  const messages: Record<string, string> = {
    duplicate: "Slug นี้ถูกใช้แล้ว",
    rights: "ก่อนเผยแพร่ กรุณายืนยันว่ามีสิทธิ์เผยแพร่เนื้อหานี้",
    incomplete: "เผยแพร่ได้เมื่อมีอย่างน้อยหนึ่งตอนที่เผยแพร่และมีภาพพร้อมแล้ว",
    invalid: "กรุณาตรวจสอบข้อมูลที่กรอก",
    save: "บันทึกไม่สำเร็จ กรุณาตรวจการเชื่อมต่อฐานข้อมูลแล้วลองอีกครั้ง",
  };
  const message = error ? messages[error] ?? messages.save : undefined;
  return <><AdminHeader email={user.email} /><main className="admin-shell"><Link className="admin-back-link" href="/admin/manga">← รายการมังงะ</Link><span className="eyebrow">CATALOG</span><h1>แก้ไขมังงะ</h1><Link className="admin-table-link" href={`/admin/manga/${manga.id}/chapters`}>จัดการตอน →</Link>{message && <p className="admin-error" role="alert">{message}</p>}<form action={updateManga.bind(null, manga.id)} className="admin-form"><label htmlFor="title">ชื่อเรื่อง</label><input defaultValue={manga.title} id="title" maxLength={160} name="title" required /><label htmlFor="slug">Slug</label><input defaultValue={manga.slug} id="slug" maxLength={120} name="slug" pattern="[a-z0-9]+(-[a-z0-9]+)*" required /><label htmlFor="authorName">ผู้สร้างหรือผู้ถือลิขสิทธิ์</label><input defaultValue={manga.author_name ?? ""} id="authorName" maxLength={160} name="authorName" /><label htmlFor="description">เรื่องย่อ</label><textarea defaultValue={manga.description} id="description" maxLength={5000} name="description" rows={6} /><label htmlFor="status">สถานะ</label><select defaultValue={manga.status} id="status" name="status"><option value="draft">ฉบับร่าง</option><option value="published">เผยแพร่</option><option value="archived">เก็บถาวร</option></select><label className="admin-checkbox-label" htmlFor="rightsConfirmed"><input defaultChecked={manga.rights_confirmed} id="rightsConfirmed" name="rightsConfirmed" type="checkbox" /> ยืนยันว่ามีสิทธิ์เผยแพร่เนื้อหา ภาพ และปกของเรื่องนี้</label><p className="admin-field-help">การเผยแพร่ต้องมีสิทธิ์ที่ตรวจสอบแล้ว และมีตอนเผยแพร่พร้อมภาพอย่างน้อยหนึ่งตอน</p><button className="button-primary" type="submit">บันทึกการแก้ไข</button></form></main></>;
}
