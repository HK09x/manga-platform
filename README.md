# Manga Platform

เว็บอ่านมังงะที่ออกแบบให้ใช้งานได้บนมือถือ แท็บเล็ต และคอมพิวเตอร์ พัฒนา Edition A ก่อน แล้วค่อยเพิ่มระบบสมาชิกและ Creator Marketplace ในระยะถัดไป

## เริ่มต้นใช้งาน

ต้องมี Node.js 20.9 ขึ้นไป

```bash
npm install
npm run dev
```

เปิด `http://localhost:3000`

## สถานะ

ต้นแบบ Catalog, หน้ารายละเอียด และ Reader ทำแล้ว เพิ่ม Supabase SSR clients, local config และ Core migration/seed ตาม Phase 0 แล้ว การตรวจ migration และเชื่อมฐานข้อมูลจริงยังรอให้มี Docker ใช้งานได้

## เอกสาร

- [`docs/capability-map.md`](docs/capability-map.md) — ขอบเขตโมดูลและลำดับการพัฒนา
- [`docs/product-blueprint.md`](docs/product-blueprint.md) — เอกสารข้อกำหนดหลักของผลิตภัณฑ์และระบบ
- [`tasks/plan.md`](tasks/plan.md) — แผนแบ่งส่งมอบ
- [`tasks/todo.md`](tasks/todo.md) — งานที่ค้างและเกณฑ์รับงาน

## Supabase ในเครื่อง

1. คัดลอก `.env.example` เป็น `.env.local`
2. ติดตั้งและเปิด Docker Desktop หรือ container runtime ที่รองรับ Docker API
3. รัน `npx supabase start` แล้วใส่ URL และ publishable key ที่ CLI แสดงลงใน `.env.local`
4. รัน `npx supabase db reset` เพื่อสร้าง schema จาก migrations และ seed

อย่าใส่ service-role key ในตัวแปร `NEXT_PUBLIC_*` หรือส่งขึ้น Git

## เทคโนโลยี

Next.js App Router, React, TypeScript, Supabase Auth/PostgreSQL/RLS และ Supabase Storage ตาม Blueprint; Tailwind/PostCSS พร้อมสำหรับ UI ที่พัฒนาต่อ ส่วนต้นแบบปัจจุบันยังใช้ CSS ปกติ
