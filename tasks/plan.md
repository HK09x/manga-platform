# แผนพัฒนาตาม Project Blueprint

`docs/product-blueprint.md` เป็นข้อกำหนดหลัก รายการนี้จัดลำดับงานเพื่อส่งมอบทีละส่วน โดยยึด Edition A ให้พร้อมใช้งานก่อนขยายไป Creator, Commerce และ Payout

## แนวทางที่ยึดตาม Blueprint

- เว็บ Next.js App Router + TypeScript แบบ responsive สำหรับมือถือ แท็บเล็ต และเดสก์ท็อป
- ระบบแบบ modular monolith ใน repository เดียว แบ่งขอบเขตตามโมดูลโดยยังไม่แตก workspace packages
- ใช้ Supabase Auth และ PostgreSQL พร้อม RLS; เก็บ schema changes เป็น migrations
- ใช้ Supabase Storage เป็นค่าเริ่มต้นของ Edition A เพื่อลดจำนวนบริการที่ต้องติดตั้ง; เปลี่ยนเป็น R2 ได้เมื่อมีข้อกำหนดด้านต้นทุนหรือการติดตั้งรองรับ
- Core migration เก็บ `chapter_number` เป็นข้อความแสดงผล และใช้ `sort_order` เรียงตอนเพื่อรองรับตอนพิเศษ; กฎเลขตอนและ uniqueness ทางธุรกิจยังต้องสรุปก่อนขยายระบบจัดการตอน
- Guest อ่านตอนสาธารณะได้; ความคืบหน้าของ Guest อยู่ใน browser ส่วนการ bookmark และ sync ข้ามอุปกรณ์ต้องมีบัญชี
- Creator Marketplace, payment, ledger และ payout เป็นโมดูลต่อยอด ไม่อยู่ในรุ่น Edition A
- ใช้ Tailwind ตาม Blueprint สำหรับ UI ที่พัฒนาต่อ; ไม่ย้ายหน้า prototype ที่ทำเสร็จแล้วจนกว่าจะมีงานแก้ UI ซึ่งได้ประโยชน์จากการย้าย

## สถานะปัจจุบัน

- มี prototype ของ Home/Catalog, Manga Detail และ Vertical Reader ด้วยข้อมูลตัวอย่าง
- ยังไม่มี Supabase project credentials; มี core migrations, Admin login/role gate และหน้าอ่านรายการมังงะแล้ว แต่ยังไม่ได้ตรวจ migration ด้วย local database และยังไม่มี upload หรือ reading sync
- Phase 1 มีหน้าหลัก, lazy/error recovery และ Guest reading progress ใน browser แล้ว; catalog ยังใช้ข้อมูลตัวอย่างจนกว่าจะเชื่อมฐานข้อมูลตามลำดับงานด้านล่าง

## Roadmap และเกณฑ์เสร็จ

### Phase 0 — Product Foundation

1. ยืนยันขอบเขต Edition A/B และใช้ Blueprint เป็น source of truth — เสร็จ
2. ตั้งค่า Next.js, TypeScript, Git — เสร็จ
3. ตั้งค่า Tailwind, Supabase local tooling, SSR clients และ environment template — เสร็จ
4. สร้าง Core migration พร้อม RLS และ repeatable seed — เขียนแล้ว; ต้องตรวจด้วย local database
5. เพิ่ม CI สำหรับ lint, typecheck, build และชุดทดสอบตาม Blueprint

**Checkpoint:** โปรเจกต์ติดตั้งซ้ำได้, schema สร้างจาก migration ได้, ไม่มี secret ใน Git (ยังไม่ผ่านจนกว่า local DB validation และ CI พร้อม)

### Phase 1 — Catalog & Reader

1. ทำ Home, manga listing, search, genre/status filters และ pagination
2. ทำ Manga Detail และรายการตอน
3. ทำ Vertical Reader, lazy loading, page order, error recovery และ chapter navigation
4. รองรับ responsive layout และ SEO metadata

**Checkpoint:** Guest อ่านตอนสาธารณะได้ทั้งมือถือและ desktop; ภาพเรียงถูกและโหลดผิดพลาดได้ recovery

### Phase 2 — Admin & Content Pipeline

1. เพิ่ม Supabase Auth สำหรับ Admin, ตรวจ role ฝั่ง server และ RLS — เขียนแล้ว; รอตรวจ migration ด้วย local database
2. จัดการมังงะ: สร้าง/ดู/แก้ไข/เก็บถาวร พร้อมสถานะและเงื่อนไขสิทธิ์เผยแพร่ — เขียนแล้ว; รอตรวจ migration ด้วย local database
3. Chapter CRUD และจัดลำดับตอน (มีหน้าสร้างตอนฉบับร่างเบื้องต้นแล้ว)
4. Upload หลายภาพไป Storage, validate ชนิด/ขนาด/จำนวน และบันทึก metadata
5. Preview และตรวจสิทธิ์เผยแพร่ก่อน Publish; บล็อกการเผยแพร่ตอนที่ยังไม่มีภาพ

**Checkpoint:** อัปโหลดไม่ครบหรือ Draft ไม่ถูกเปิดให้ Guest; มี log สำหรับการกระทำสำคัญ

### Phase 3 — Authentication & Library

Login/Register, profiles, bookmark, history และ reading progress sync พร้อม RLS/authorization checks

**Checkpoint:** Guest ยังอ่านได้; สมาชิกซิงก์ข้ามอุปกรณ์ได้; แก้ข้อมูลของสมาชิกอื่นหรือยกระดับ role ผ่าน client ไม่ได้

### Phase 4 — Creator Foundation

Creator application/profile, Creator Studio, submission, review, moderation และตรวจสิทธิ์เนื้อหา

### Phase 5 — Commerce

Pricing, orders, payment provider, verified/idempotent webhooks, entitlements, refunds และ revenue ledger

### Phase 6 — Payout & Production Release

Payout requests, reconciliation, audit logs, backup/restore, monitoring, security/load review และคู่มือส่งมอบ Source Code

## ความเสี่ยงและการตัดสินใจที่ค้าง

- เลือก deployment target ที่ลูกค้าซื้อ Source Code จะติดตั้งได้; ยังไม่ล็อกเป็น Vercel
- Supabase Storage เป็นค่าเริ่มต้น แต่ต้องทวนข้อจำกัด/ต้นทุนก่อน production
- ต้องกำหนดกฎเลขตอน รวมตอนพิเศษ ก่อน migration constraint
- ต้องมี license สำหรับภาพตัวอย่าง; เผยแพร่ได้เฉพาะงานต้นฉบับหรือมีสิทธิ์ใช้
- การ sync ต้องบอกชัดว่าต้องมีบัญชี; Guest ไม่มีข้อมูลความคืบหน้าบน Server
- Local Supabase reset ยังติดข้อจำกัด Docker ของสภาพแวดล้อมนี้; ต้องรัน `npx supabase db reset` บนเครื่องที่มี Docker ก่อนเชื่อมข้อมูลจริง
- npm audit รายงาน high 5 รายการจาก `eslint-config-next` → `fast-glob` → `micromatch` → `braces`; เป็น dependency สำหรับ lint และ advisory ยังไม่มีเวอร์ชัน braces ที่ patched
