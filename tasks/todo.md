# งานตาม Project Blueprint

## Phase 0 — Product Foundation

- [x] เก็บ Blueprint ฉบับเต็มไว้ที่ `docs/product-blueprint.md` และยึดเป็นข้อกำหนดหลัก
- [x] ตั้งต้น repository, Next.js App Router และ TypeScript
- [x] ติดตั้ง Tailwind/PostCSS ตาม Blueprint; UI prototype เดิมยังใช้ CSS จนกว่าจะย้ายได้อย่างคุ้มค่า
- [x] ตั้งค่า Supabase CLI, local config, SSR clients และ `.env.example` โดยไม่มี secret จริงใน repository
- [x] เพิ่ม Core SQL migration พร้อม RLS สำหรับ profiles และ public published catalog
- [x] เพิ่ม seed data ที่ทำซ้ำได้
- [ ] ตรวจ reset/lint ของ migration ด้วย local Supabase; เครื่องมือนี้ยังไม่มี Docker ที่ใช้งานได้
- [ ] เพิ่ม CI สำหรับ lint, typecheck, build และชุดทดสอบตาม Blueprint

## Phase 1 — Catalog & Reader

- [x] ปรับหน้าแรกให้มีลำดับสายตาชัดเจน พร้อม featured story และรายการอัปเดตที่อ่านง่ายบนจอเล็กและจอใหญ่
- [x] Home, responsive navigation และ catalog จากข้อมูลตัวอย่าง
- [x] Search และ genre filtering
- [x] Manga detail และ chapter list
- [x] Vertical reader, sizing, chapter navigation, metadata และ not-found
- [x] เพิ่ม manga listing route, status filter และ pagination
- [x] เพิ่ม image load error recovery/retry และตรวจ lazy loading จากหน้าจอจริง
- [ ] เชื่อม catalog/reader กับข้อมูลที่เผยแพร่จากฐานข้อมูล หลัง Phase 0 และ Admin พร้อม
- [x] บันทึกตำแหน่ง Guest ใน Local Storage

## Checkpoint — Phase 1

- [ ] Guest เปิดอ่านตอนสาธารณะได้บนมือถือและ Desktop
- [ ] ภาพแสดงตามลำดับและมี recovery เมื่อโหลดไม่สำเร็จ
- [ ] ตรวจ `npm run lint`, `npm run build` และ flow ใน browser

## Phase 2 — Admin & Content Pipeline

- [x] เพิ่มหน้า Login Admin แบบไม่มี public signup, ตรวจ role ฝั่ง server และสร้าง profile เริ่มต้นให้บัญชีใหม่
- [ ] ตรวจ Admin role/RLS migration ด้วย local Supabase เมื่อ Docker ใช้งานได้
- [x] เพิ่ม Admin dashboard และหน้ารายการมังงะแบบอ่านข้อมูล
- [x] จัดการมังงะ: สร้าง/ดู/แก้ไข/เก็บถาวร และเปลี่ยนสถานะ Draft/Published/Archived โดยตรวจสิทธิ์เผยแพร่และความพร้อมของตอน
- [ ] Chapter CRUD และจัดลำดับหน้า
- [ ] Upload หลายภาพพร้อมตรวจจำนวน ขนาด ชนิดไฟล์ และสถานะ upload
- [ ] Preview, Draft, Publish/Unpublish และ rights review ก่อนเผยแพร่
- [ ] Audit log สำหรับการกระทำสำคัญ

## Phase 3–6 — Later editions

- [ ] Phase 3: Authentication, RLS, bookmark, history และ cross-device reading progress
- [ ] Phase 4: Creator application, Studio, submission และ moderation
- [ ] Phase 5: Orders, payments, webhooks, entitlements, refunds และ ledger
- [ ] Phase 6: Payout, reconciliation, backup/restore, monitoring, security review และเอกสารส่งมอบ
