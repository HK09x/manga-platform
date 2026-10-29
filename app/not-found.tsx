import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell not-found">
        <span className="eyebrow">ไม่พบหน้าที่ต้องการ</span>
        <h1>เรื่องนี้อาจถูกย้ายไปแล้ว</h1>
        <p>ลองกลับไปที่หน้ารวมมังงะเพื่อเลือกเรื่องอื่น</p>
        <Link className="button-primary" href="/">
          กลับไปหน้าหลัก
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
