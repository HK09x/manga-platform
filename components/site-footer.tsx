import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link className="brand" href="/">
          <span aria-hidden="true" className="brand-mark">
            K
          </span>
          <span>Komi</span>
        </Link>
        <span>อ่านเรื่องที่ใช่ ได้ทุกหน้าจอ</span>
        <span>Demo edition · เนื้อหาตัวอย่างสร้างขึ้นสำหรับโปรเจกต์นี้</span>
      </div>
    </footer>
  );
}
