# Project Blueprint: Manga Reader Platform & Creator Marketplace

เอกสารวางแผนพัฒนาซอฟต์แวร์สำหรับขาย Source Code

**เป้าหมาย:** สร้างระบบเว็บอ่านมังงะแบบ Vertical Scroll ที่นำไปติดตั้งใช้งานได้จริง และต่อยอดเป็นแพลตฟอร์มให้ผู้เขียนลงผลงานและสร้างรายได้ได้ในอนาคต

## 1. ภาพรวมผลิตภัณฑ์

โปรเจกต์แบ่งเป็น 2 Edition

### Edition A — Manga Reader

เว็บไซต์อ่านมังงะสำหรับเจ้าของเว็บที่ต้องการจัดการเนื้อหาเอง

ฟีเจอร์หลัก:
- หน้าแรกและรายการมังงะ
- หน้ารายละเอียดมังงะและรายการตอน
- Reader แบบเลื่อนลงต่อเนื่อง
- Admin สำหรับจัดการมังงะและตอน
- ระบบค้นหาและหมวดหมู่
- Guest อ่านได้โดยไม่ต้องล็อกอิน
- ระบบสมาชิก Bookmark และประวัติการอ่าน
- ระบบจัดการสิทธิ์ผู้ใช้
- ระบบจัดเก็บและให้บริการภาพ
- ระบบติดตั้งและคู่มือสำหรับลูกค้าที่ซื้อ Source Code

**กลุ่มลูกค้าเป้าหมาย:** ผู้ที่ต้องการเว็บไซต์อ่านมังงะส่วนตัว สำนักพิมพ์ขนาดเล็ก หรือเจ้าของเว็บไซต์ที่มีเนื้อหาและสิทธิ์เผยแพร่ของตนเอง

### Edition B — Creator Marketplace

แพลตฟอร์มอ่านมังงะที่เปิดให้ผู้สร้างผลงานหลายคนเข้ามาลงผลงานและหารายได้

มีฟีเจอร์ทั้งหมดของ Edition A พร้อมความสามารถเพิ่มเติม:
- สมัครและอนุมัติ Creator
- Creator Profile
- Creator Studio สำหรับจัดการผลงาน
- ระบบส่งผลงานให้ตรวจสอบ
- ระบบกำหนดราคาตอน
- ระบบสั่งซื้อและชำระเงิน
- ระบบปลดล็อกตอน
- Dashboard ยอดขายและรายได้
- บัญชีรายได้ของ Creator
- ระบบถอนเงินและจ่ายเงิน
- ระบบรายงานการละเมิดและจัดการข้อร้องเรียน
- ระบบบันทึกประวัติธุรกรรม

**กลุ่มลูกค้าเป้าหมาย:** ผู้ที่ต้องการเปิดแพลตฟอร์มให้ผู้สร้างผลงานหลายคนเผยแพร่และขายมังงะของตัวเอง

หลักการสำคัญคือ Creator Marketplace เป็นผลิตภัณฑ์ที่ต่อยอดจาก Core ไม่ใช่โปรเจกต์ที่ต้องเขียน Reader และ Catalog ใหม่ทั้งหมด

---

# 2. เทคโนโลยีหลัก

เลือกใช้ Stack ที่ดูแลได้ง่ายและพัฒนาต่อเป็น Production ได้

| ส่วนงาน | เทคโนโลยี |
|---|---|
| ภาษา | TypeScript |
| Frontend | React + Next.js App Router |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui ตามความเหมาะสม |
| Database | PostgreSQL |
| Authentication | Supabase Auth |
| Database Client | Supabase SDK และ SQL Migrations |
| Database Access Control | PostgreSQL Row Level Security |
| Object Storage | Cloudflare R2 หรือ Supabase Storage |
| Image Processing | Sharp |
| Validation | Zod |
| Unit / Integration Tests | Vitest |
| End-to-End Tests | Playwright |
| Version Control | Git + GitHub |
| Deployment | Vercel หรือแพลตฟอร์มที่รองรับ Next.js |
| Monitoring | Error Tracking และ Logs |

เริ่มจาก Next.js แบบ Full-stack ก่อน ไม่จำเป็นต้องแยก Backend เป็น NestJS หรือ Microservices ตั้งแต่ต้น ใช้ Route Handlers และ Server Actions ตามลักษณะงาน และตรวจสอบสิทธิ์ทุกครั้งที่ทำการเปลี่ยนแปลงข้อมูล

อ้างอิง:
- Next.js: https://nextjs.org/docs/app
- Next.js Production Checklist: https://nextjs.org/docs/app/guides/production-checklist
- Supabase RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- Cloudflare R2 Presigned URLs: https://developers.cloudflare.com/r2/api/s3/presigned-urls/

---

# 3. สถาปัตยกรรมระบบ

```text
Manga Platform
│
├── Core
│   ├── Catalog
│   ├── Vertical Reader
│   ├── Content Management
│   ├── Authentication
│   ├── Permissions
│   ├── Library
│   ├── Reading Progress
│   ├── Storage
│   └── Platform Settings
│
├── Edition A: Manga Reader
│   ├── Public Website
│   ├── Admin Dashboard
│   └── Reader Features
│
└── Edition B: Creator Marketplace
    ├── Creator Profiles
    ├── Creator Studio
    ├── Content Review
    ├── Pricing
    ├── Orders & Payments
    ├── Entitlements
    ├── Revenue Ledger
    └── Payout Management
```

หลักการออกแบบ:
1. Core ต้องไม่พึ่งพา Creator Marketplace
2. Edition B เพิ่มโมดูลใหม่ผ่าน Service และ Module Interfaces
3. Database Migrations แยกเป็น Core และ Optional Modules
4. แต่ละโมดูลมีขอบเขตข้อมูลและสิทธิ์ที่ชัดเจน
5. ห้ามใช้การซ่อนเมนูใน Frontend เป็นวิธีควบคุมสิทธิ์เพียงอย่างเดียว

ในช่วง MVP ใช้ Monorepo หรือ Repository เดียวได้ การแยก Package จริงค่อยทำเมื่อมีเหตุผลด้านการบำรุงรักษา

---

# 4. Edition A — Manga Reader Specification

## 4.1 Public Website

### หน้าแรก `/`

แสดง:
- มังงะแนะนำ
- อัปเดตล่าสุด
- มังงะยอดนิยม ถ้ามีข้อมูลที่เหมาะสม
- หมวดหมู่และ Genre
- ช่องค้นหา
- ลิงก์เข้าสู่ระบบและคลังส่วนตัว

### หน้ารายการ `/manga`

แสดง:
- รายการมังงะ
- ค้นหาจากชื่อ
- กรองตาม Genre และสถานะ
- เรียงตามชื่อหรือวันที่อัปเดต
- Pagination หรือ Cursor Pagination

### หน้ารายละเอียด `/manga/[slug]`

แสดง:
- ปก
- ชื่อเรื่อง
- เรื่องย่อ
- ผู้สร้างหรือผู้ถือลิขสิทธิ์ตามข้อมูลที่กำหนด
- Genre
- สถานะเรื่อง
- รายการตอน
- ปุ่มเริ่มอ่านหรืออ่านต่อ
- วันที่อัปเดตตอนล่าสุด

### หน้า Reader `/read/[chapterId]`

เป็น Vertical Scroll Reader โดยเฉพาะ

ความสามารถ:
- แสดงภาพตามลำดับ `page_number`
- Lazy Loading
- กำหนดความกว้างภาพตามหน้าจอ
- ป้องกัน Layout Shift ด้วย Width และ Height
- แสดงชื่อเรื่องและชื่อตอน
- แสดงตอนก่อนหน้าและตอนถัดไป
- กลับไปยังรายละเอียดเรื่อง
- บันทึกตำแหน่งอ่าน
- รองรับภาพโหลดไม่สำเร็จและ Retry
- แสดงข้อความเมื่อไม่พบตอนหรือไม่มีสิทธิ์อ่าน

เป้าหมายคือให้ผู้อ่านสามารถเริ่มอ่านได้ทันทีโดยไม่ต้องสมัครสมาชิก

### หน้า Guest และ Member

Guest:
- อ่านตอนที่เผยแพร่เป็นสาธารณะ
- ค้นหามังงะ
- จำตำแหน่งอ่านใน Browser ผ่าน Local Storage ได้
- ไม่มีบัญชีและไม่มีข้อมูลส่วนตัวบน Server

Member:
- Bookmark
- Reading History
- ซิงก์ตำแหน่งอ่านข้ามอุปกรณ์
- จัดการโปรไฟล์
- ลบบัญชีตามกระบวนการที่กำหนด

---

## 4.2 Admin Content Management

Routes ที่แนะนำ:

```text
/admin
/admin/manga
/admin/manga/new
/admin/manga/[id]/edit
/admin/manga/[id]/chapters
/admin/chapters/[id]/edit
/admin/users
/admin/settings
```

ความสามารถ:
- สร้างและแก้ไขมังงะ
- จัดการปกและ Genre
- เพิ่มตอน
- อัปโหลดภาพหลายไฟล์
- จัดลำดับภาพ
- ตรวจสอบขนาดและประเภทไฟล์
- Preview ตอนก่อนเผยแพร่
- Publish และ Unpublish
- ดูรายการที่ยังเป็น Draft
- ตรวจสอบ Log ของการเปลี่ยนแปลงที่สำคัญ

### Upload Pipeline

```text
เลือกไฟล์
   ↓
Validate จำนวน ขนาด และชนิดไฟล์
   ↓
สร้าง Upload URL ฝั่ง Server
   ↓
อัปโหลดตรงไปยัง Object Storage
   ↓
ตรวจสอบผลการอัปโหลด
   ↓
บันทึก Metadata ลง Database
   ↓
Preview และ Publish
```

สำหรับตอนที่มีภาพจำนวนมาก ควรทำ Upload Status และจัดการกรณีอัปโหลดไม่ครบให้ได้ ไม่ควรถือว่าตอนพร้อมเผยแพร่เพียงเพราะ Browser ส่งคำขอ Upload สำเร็จบางส่วน

---

# 5. Edition B — Creator Marketplace Specification

Edition B ใช้ Catalog และ Reader ชุดเดียวกับ Edition A แต่เพิ่มระบบสำหรับเจ้าของผลงานและการทำธุรกรรม

## 5.1 Creator Application

Routes:

```text
/creator/apply
/creator/dashboard
/creator/profile
/creator/works
/creator/works/new
/creator/works/[id]/edit
/creator/works/[id]/chapters
/creator/analytics
/creator/earnings
/creator/payouts
```

ความสามารถ:
- สมัครเป็น Creator
- กรอกข้อมูลโปรไฟล์
- ยอมรับข้อตกลง Creator
- ส่งข้อมูลประกอบการตรวจสอบตามนโยบายแพลตฟอร์ม
- แสดงสถานะ Pending, Approved, Rejected หรือ Suspended
- แสดงเหตุผลเมื่อถูกปฏิเสธ
- แสดงสถานะบัญชีและสิทธิ์ที่ได้รับ

การสมัคร Creator ต้องไม่ทำให้ผู้ใช้ได้รับสิทธิ์ Creator โดยอัตโนมัติจนกว่าจะผ่านการอนุมัติ

## 5.2 Creator Studio

Creator สามารถ:
- สร้างผลงาน
- แก้ไขเรื่องย่อและข้อมูลผลงาน
- อัปโหลดปก
- สร้างตอน
- อัปโหลดภาพเรียงลำดับ
- บันทึก Draft
- ส่งผลงานให้ Editor ตรวจสอบ
- ดูสถานะการตรวจสอบ
- ดูเหตุผลที่ต้องแก้ไข
- ดูรายการผลงานที่ได้รับอนุมัติแล้ว

ขอบเขตสำคัญ:
- Creator แก้ไขเฉพาะผลงานที่ตัวเองมีสิทธิ์ดูแล
- Creator ห้ามแก้ยอดขายหรือประวัติธุรกรรม
- Creator ไม่สามารถอนุมัติผลงานของตัวเองได้
- การแก้ไขเนื้อหาหลังเผยแพร่อาจต้องเข้าสู่ขั้นตอนตรวจสอบใหม่ตามนโยบาย

## 5.3 Content Review & Moderation

Routes:

```text
/admin/review
/admin/review/[submissionId]
/admin/reports
/admin/rights
```

สถานะของผลงาน:

```text
Draft
  ↓
Submitted
  ↓
In Review
  ├── Changes Requested
  ├── Rejected
  └── Approved
         ↓
      Published
```

ระบบควรมี:
- รายละเอียดผู้ส่งผลงาน
- รายการไฟล์และตอนที่จะเผยแพร่
- หลักฐานสิทธิ์ในเนื้อหา
- ประวัติการตรวจสอบ
- หมายเหตุของ Editor
- การอนุมัติหรือปฏิเสธ
- ช่องทางแจ้งละเมิด
- กระบวนการ Unpublish หรือระงับเนื้อหา

ต้องแยกการตรวจสอบคุณภาพเนื้อหาออกจากการตรวจสอบสิทธิ์เผยแพร่ การมีปุ่มให้ผู้ใช้อัปโหลดผลงานไม่ได้ยืนยันว่าผู้ใช้นั้นมีสิทธิ์ในผลงานจริง

## 5.4 ระบบขายรายตอน

Routes:

```text
/checkout/[chapterId]
/orders
/orders/[orderId]
/admin/orders
/admin/refunds
```

Flow การซื้อ:

```text
ผู้อ่านเลือกตอน
   ↓
ตรวจสอบราคาและสถานะการขาย
   ↓
สร้าง Order
   ↓
สร้าง Payment Session
   ↓
ผู้ใช้ชำระผ่าน Payment Gateway
   ↓
ตรวจสอบ Webhook จาก Provider
   ↓
ยืนยัน Payment สำเร็จ
   ↓
บันทึก Order Item และ Entitlement
   ↓
อนุญาตให้อ่านตอน
```

ข้อกำหนด:
- ราคาต้องบันทึก ณ เวลาที่ซื้อ
- ห้ามเชื่อถือราคาและสถานะการจ่ายจาก Browser
- Webhook ต้องตรวจสอบลายเซ็นตามข้อกำหนดของ Provider
- การประมวลผลต้อง Idempotent เพื่อป้องกันการปลดล็อกหรือบันทึกธุรกรรมซ้ำ
- ต้องจัดการ Payment Failed, Cancelled, Refunded และ Disputed
- การคืนเงินต้องมี Audit Log
- อย่าเก็บเลขบัตรหรือข้อมูลบัตรที่ไม่จำเป็นไว้ในระบบเอง

## 5.5 Revenue Ledger และ Payout

ควรแยก 3 ส่วนออกจากกัน:

1. **Orders:** ประวัติการซื้อของลูกค้า
2. **Revenue Ledger:** รายการเพิ่มหรือลดรายได้ของ Creator
3. **Payouts:** รายการจ่ายเงินออกจริง

ตัวอย่างรายการ Ledger:
- ยอดขายที่ชำระเงินสำเร็จ
- ส่วนแบ่งแพลตฟอร์ม
- ค่าธรรมเนียมที่เกี่ยวข้อง
- การคืนเงิน
- การปรับยอด
- ยอดรอจ่าย
- การจ่ายเงินจริง

ห้ามแก้ประวัติธุรกรรมเก่าโดยตรงเพื่อปรับยอด ควรสร้างรายการปรับยอดที่ตรวจสอบย้อนหลังได้แทน

สำหรับ MVP ของ Creator Edition สามารถทำรายงานรายได้ก่อนและให้ Admin คำนวณจ่ายนอกระบบตามข้อตกลงได้ แต่หากจะเปิดใช้ Payout อัตโนมัติ ต้องเพิ่มการตรวจสอบผู้รับเงิน สถานะธุรกรรม การกระทบยอด และการจัดการการจ่ายล้มเหลว

---

# 6. สิทธิ์ผู้ใช้

| ความสามารถ | Guest | Member | Creator | Editor | Admin / Owner |
|---|---|---|---|---|---|
| อ่านตอนสาธารณะ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Bookmark | — | ✓ | ✓ | ✓ | ✓ |
| บันทึกประวัติอ่านบน Server | — | ✓ | ✓ | ✓ | ✓ |
| สร้างผลงาน | — | — | ✓ | ตามสิทธิ์ | ✓ |
| แก้ไขผลงานของตน | — | — | ✓ | ตามที่ได้รับมอบหมาย | ✓ |
| ตรวจผลงาน | — | — | — | ✓ | ✓ |
| อนุมัติผลงานตัวเอง | — | — | — | — | ไม่ควรอนุญาตโดยปริยาย |
| ดูรายได้ตัวเอง | — | — | ✓ | ตามสิทธิ์ | ตามสิทธิ์ |
| แก้ไขธุรกรรมหรือยอดเงิน | — | — | — | — | จำกัดเฉพาะบทบาทที่ได้รับมอบหมาย |
| จัดการบทบาทผู้ใช้ | — | — | — | — | ✓ |

ไม่ควรพึ่ง Role เพียงอย่างเดียว เพราะสิทธิ์ของ Creator ต้องจำกัดตามผลงานที่ดูแลด้วย

สำหรับระยะแรกใช้ Role เดียวต่อผู้ใช้ได้ แล้วค่อยเพิ่ม `resource-level permissions` เมื่อเริ่มมีหลาย Creator และบรรณาธิการหลายคน

---

# 7. โครงสร้าง Database

## 7.1 Core Tables

### `profiles`
- `id`
- `username`
- `avatar_url`
- `status`
- `created_at`

เชื่อมกับ Supabase Auth โดยใช้ ID จากระบบ Authentication

### `manga`
- `id`
- `slug`
- `title`
- `description`
- `cover_key`
- `status`
- `created_by`
- `created_at`
- `updated_at`

### `chapters`
- `id`
- `manga_id`
- `chapter_number`
- `title`
- `slug`
- `status`
- `published_at`

### `chapter_pages`
- `id`
- `chapter_id`
- `page_number`
- `object_key`
- `width`
- `height`

กำหนด Unique Constraint สำหรับ `(manga_id, chapter_number)` และ `(chapter_id, page_number)` ตามกฎของระบบ

### `genres` และ `manga_genres`
ใช้จัดการ Genre แบบ Many-to-Many

### `library_entries`
- `user_id`
- `manga_id`
- `created_at`

### `reading_progress`
- `user_id`
- `chapter_id`
- `page_number`
- `scroll_offset` หรือ `offset_ratio`
- `updated_at`

ตำแหน่งอ่านของ Guest สามารถเก็บใน Local Storage ส่วน Member บันทึกบน Server

### `content_licenses`
- `id`
- `manga_id`
- `rights_holder`
- `rights_status`
- `translation_allowed`
- `digital_publishing`
- `commercial_use`
- `allowed_territories`
- `valid_from`
- `valid_until`
- `agreement_reference`
- `reviewed_by`
- `reviewed_at`

ตารางนี้ใช้ติดตามข้อมูลสิทธิ์ ไม่ได้ทำให้การเผยแพร่ถูกกฎหมายโดยอัตโนมัติ

## 7.2 Creator Tables

### `creator_profiles`
โปรไฟล์และสถานะของ Creator

### `creator_applications`
ประวัติการสมัคร ผลการตรวจสอบ และผู้อนุมัติ

### `creator_manga`
ความสัมพันธ์ระหว่าง Creator กับผลงานที่ดูแล

### `content_submissions`
ประวัติการส่งผลงานให้ตรวจสอบ

### `content_reviews`
ผลการตรวจสอบและหมายเหตุของ Editor

### `chapter_prices`
ราคาและสถานะการขายของตอน

## 7.3 Commerce Tables

### `orders`
คำสั่งซื้อ ผู้ซื้อ สกุลเงิน ยอดรวม และสถานะ

### `order_items`
รายการสินค้าที่ซื้อ ราคา ณ เวลาซื้อ และข้อมูลที่จำเป็นต่อการแบ่งรายได้

### `payments`
Provider, Reference, Status, Amount และเวลาชำระเงิน

### `payment_events`
บันทึกเหตุการณ์จาก Payment Provider เพื่อป้องกันการประมวลผลซ้ำและตรวจสอบย้อนหลัง

### `chapter_entitlements`
สิทธิ์อ่านตอนที่ผู้ใช้ได้รับ

### `refunds`
ข้อมูลการคืนเงินและสถานะการดำเนินการ

### `creator_ledger`
รายการเครดิต เดบิต ค่าธรรมเนียม และการปรับยอดของ Creator

### `payout_requests`
คำขอถอนเงินและสถานะการตรวจสอบ

### `payout_transactions`
ประวัติการจ่ายเงินจริงจากแพลตฟอร์มไปยัง Creator

### `audit_logs`
บันทึกการกระทำสำคัญ เช่น การอนุมัติผลงาน การเปลี่ยนสิทธิ์ การคืนเงิน และการปรับยอด

---

# 8. API และ Service Boundaries

ตัวอย่าง Endpoint สำหรับ Core:

```text
GET    /api/manga
GET    /api/manga/[slug]
GET    /api/manga/[slug]/chapters
GET    /api/chapters/[chapterId]
GET    /api/chapters/[chapterId]/pages

GET    /api/me/library
POST   /api/me/library
DELETE /api/me/library/[mangaId]

GET    /api/me/progress/[chapterId]
PUT    /api/me/progress/[chapterId]

POST   /api/admin/manga
PATCH  /api/admin/manga/[id]
POST   /api/admin/chapters/[id]/publish
```

ตัวอย่าง Endpoint สำหรับ Creator Marketplace:

```text
POST   /api/creator/applications
GET    /api/creator/dashboard
POST   /api/creator/works
PATCH  /api/creator/works/[id]
POST   /api/creator/submissions

POST   /api/checkout
GET    /api/orders/[orderId]
POST   /api/webhooks/payment

GET    /api/creator/earnings
POST   /api/creator/payout-requests
GET    /api/creator/payouts
```

Endpoint เป็นตัวอย่างการออกแบบ ไม่จำเป็นต้องสร้างครบทั้งหมดตั้งแต่วันแรก หากใช้ Server Actions สำหรับฟอร์มภายในก็สามารถใช้ได้ แต่ควรรวม Business Logic ไว้ใน Service Layer ที่ทดสอบและเรียกใช้ซ้ำได้

---

# 9. โครงสร้าง Repository

```text
manga-platform/
├── apps/
│   └── web/
│       └── src/
│           ├── app/
│           ├── components/
│           └── modules/
│               ├── catalog/
│               ├── reader/
│               ├── library/
│               ├── admin/
│               ├── creators/
│               ├── reviews/
│               ├── commerce/
│               └── payouts/
├── packages/
│   ├── database/
│   ├── auth/
│   ├── permissions/
│   ├── storage/
│   ├── validation/
│   └── ui/
├── supabase/
│   └── migrations/
│       ├── core/
│       └── modules/
│           ├── creators/
│           ├── commerce/
│           └── payouts/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
├── public/
│   └── demo-assets/
├── .env.example
└── package.json
```

ในช่วงแรกสามารถใช้ Repository เดียวและยังไม่ต้องแตกทุกส่วนเป็น Package จริง จุดสำคัญคือการแบ่งขอบเขตโค้ดให้ชัดเจน

---

# 10. Development Roadmap

## Phase 0 — Product Foundation

งาน:
- สรุป Scope ของสอง Edition
- ออกแบบ Wireframes
- สร้าง Git Repository
- ตั้งค่า Next.js, TypeScript, Tailwind
- ตั้งค่า Supabase
- ทำ Database Migrations
- ตั้งค่า Environment และ CI

เกณฑ์เสร็จ:
- รันโปรเจกต์บนเครื่องได้
- เชื่อม Database ได้
- มี Migration และ Seed Data
- มี Development Environment ที่ตั้งซ้ำได้

## Phase 1 — Catalog & Reader

งาน:
- หน้า Home
- Manga Detail
- รายการตอน
- Vertical Scroll Reader
- Lazy Loading
- Navigation
- Responsive Layout
- SEO Metadata

เกณฑ์เสร็จ:
- Guest เปิดอ่านตอนสาธารณะได้
- ภาพเรียงถูกต้อง
- ภาพผิดพลาดมี Recovery UI
- อ่านได้บนมือถือและ Desktop
- หน้าไม่กระโดดมากเกินไปเมื่อภาพโหลดเสร็จ

## Phase 2 — Admin & Content Pipeline

งาน:
- Manga CRUD
- Chapter CRUD
- Upload ภาพหลายไฟล์
- เรียงลำดับภาพ
- Draft / Publish / Unpublish
- Rights Management เบื้องต้น

เกณฑ์เสร็จ:
- Admin เพิ่มเรื่องและตอนเองได้
- อัปโหลดไม่ครบแล้วระบบไม่เผยแพร่ตอนผิดพลาด
- Guest ไม่เห็น Draft
- ตรวจสอบสิทธิ์เนื้อหาได้ก่อน Publish

## Phase 3 — Authentication & Library

งาน:
- Login / Register
- Profiles
- Bookmark
- Reading History
- Progress Sync
- RLS Policies
- Authorization Tests

เกณฑ์เสร็จ:
- Guest ยังอ่านได้โดยไม่ต้องล็อกอิน
- Member อ่านและบันทึกความคืบหน้าได้
- ผู้ใช้ไม่สามารถแก้ข้อมูลของสมาชิกคนอื่น
- Client ไม่สามารถแก้ Role ของตัวเอง

เมื่อจบ Phase 3 จะได้ Manga Reader Edition ที่พร้อมนำไปทดสอบกับผู้ใช้จริง

## Phase 4 — Creator Foundation

งาน:
- Creator Application
- Creator Profile
- Creator Studio
- การสร้างผลงานและตอน
- Submission Workflow
- Editor Review
- Rights Review
- Dashboard สถิติพื้นฐาน

เกณฑ์เสร็จ:
- สมาชิกสมัคร Creator ได้
- Editor อนุมัติหรือขอแก้ไขผลงานได้
- Creator แก้ไขได้เฉพาะผลงานตามสิทธิ์
- ผลงานที่ไม่ผ่าน Review ยังไม่เผยแพร่

เมื่อจบ Phase 4 จะได้ Creator Edition ที่จัดการผลงานหลายคนได้ แต่ยังไม่มีการชำระเงินและจ่ายเงินอัตโนมัติ

## Phase 5 — Commerce

งาน:
- Pricing
- Orders
- Payment Integration
- Payment Webhooks
- Entitlements
- Refund Workflow
- Revenue Ledger
- Admin Transaction Reports

เกณฑ์เสร็จ:
- Payment ที่ยังไม่สำเร็จไม่ปลดล็อกตอน
- Webhook ซ้ำไม่ทำให้เกิดธุรกรรมซ้ำ
- ยอดเงินต้องตรงกับสถานะธุรกรรม
- ผู้ใช้ไม่สามารถแก้ราคา Order หรือยืนยันการจ่ายเอง
- Refund เปลี่ยนสถานะธุรกรรมและสิทธิ์ตามนโยบายที่กำหนด

## Phase 6 — Payout & Production Release

งาน:
- Payout Requests
- การตรวจสอบผู้รับเงิน
- การกระทบยอดธุรกรรม
- Audit Logs
- Backup & Restore
- Monitoring
- Security Review
- Load Testing
- คู่มือติดตั้งและคู่มือ Admin

เกณฑ์เสร็จ:
- ตรวจสอบย้อนหลังได้ว่าเงินแต่ละรายการมาจากไหน
- จัดการการจ่ายเงินล้มเหลวได้
- กู้คืนระบบจาก Backup ได้จริง
- มีเอกสารติดตั้งและอัปเดตเวอร์ชัน
- ไม่มี Secret Key ใน Client Bundle หรือ Repository สาธารณะ

---

# 11. Test Plan

## Unit Tests
- การเรียงลำดับหน้า
- การคำนวณตำแหน่งอ่าน
- การตรวจสอบเลขตอน
- การคำนวณราคาและส่วนแบ่งรายได้

## Integration Tests
- Upload Metadata
- การเผยแพร่และยกเลิกเผยแพร่
- RLS Policies
- Order และ Entitlement
- Payment Webhook Idempotency
- Refund และ Revenue Ledger

## End-to-End Tests
- Guest เปิดเว็บและอ่านมังงะ
- Member Bookmark และ Resume Reading
- Admin สร้างและเผยแพร่ตอน
- Creator ส่งผลงานให้ Editor
- Editor ตรวจและอนุมัติผลงาน
- Member ซื้อและเปิดอ่านตอนที่ซื้อ
- Admin ตรวจสอบยอดขายและการคืนเงิน

## Security Tests
- แก้ Role ผ่าน Client
- อ่าน Draft โดยไม่ใช่ Admin
- Creator แก้ผลงานของผู้อื่น
- อ่านตอนแบบชำระเงินโดยไม่มี Entitlement
- Replay Webhook
- เรียก API เพื่อแก้ Order หรือยอดเงินโดยตรง

---

# 12. สิ่งที่ยังไม่ต้องทำ

เลื่อนรายการเหล่านี้ออกไปจนกว่า Core จะเสถียร:

- Microservices
- ระบบ AI Recommendation
- Real-time Chat
- Social Feed
- Mobile App แยก
- ระบบเหรียญที่ซับซ้อน
- Multi-Gateway Payment
- ระบบรายได้หลายสกุลเงิน
- ระบบสมัครสมาชิกแบบหลายระดับ
- ระบบ Analytics ขนาดใหญ่

การไม่ทำสิ่งเหล่านี้ใน MVP ไม่ได้หมายความว่าสถาปัตยกรรมจะรองรับไม่ได้ แต่ช่วยลดความเสี่ยงและปริมาณงานที่ต้องดูแลในช่วงแรก

---

# 13. แนวทางบรรจุขาย Source Code

ควรเตรียมการส่งมอบแยกตาม Edition

## Manga Reader Edition
- Source Code
- Core Database Migrations
- ตัวอย่างข้อมูลและภาพที่มีสิทธิ์ใช้
- Environment Template
- Installation Guide
- Deployment Guide
- Admin Guide
- License Agreement

## Creator Marketplace Edition
รวมทั้งหมดของ Manga Reader Edition และเพิ่ม:
- Creator Module
- Review Workflow
- Commerce Migrations
- Payment Integration Guide
- Ledger & Payout Documentation
- Creator & Admin Guide
- Test Suite เพิ่มเติม

ควรแยก Credentials ของลูกค้าแต่ละรายออกจากกัน ลูกค้าแต่ละรายต้องใช้ Database, Storage, Payment Credentials และ Domain ของตัวเอง เว้นแต่จะเป็นบริการ SaaS ที่คุณเป็นผู้โฮสต์ ซึ่งต้องออกแบบ Multi-tenancy เพิ่มเติม

ควรระบุให้ชัดว่า License ของซอฟต์แวร์ให้สิทธิ์ใช้ตัวโปรแกรม ไม่ได้ให้สิทธิ์ในมังงะ โลโก้ ภาพตัวอย่าง หรือเนื้อหาของบุคคลที่สามที่ไม่มีสิทธิ์ใช้งาน

---

# 14. ลำดับการทำงานที่แนะนำ

ให้พัฒนาเป็นลำดับดังนี้:

1. Foundation
2. Catalog
3. Vertical Reader
4. Admin & Upload
5. Authentication & Library
6. สิทธิ์และความปลอดภัย
7. Creator Application & Studio
8. Review Workflow
9. Orders & Payment
10. Revenue Ledger & Payout
11. Testing, Documentation และ Production Release

**เป้าหมายแรก:** ทำให้ Edition A สมบูรณ์และติดตั้งใช้งานได้จริงก่อน

**เป้าหมายที่สอง:** เพิ่ม Creator Studio และ Review Workflow เพื่อให้ผู้สร้างลงผลงานได้

**เป้าหมายที่สาม:** เพิ่ม Commerce และ Payout เมื่อระบบเนื้อหา สิทธิ์ และธุรกรรมมีความพร้อม

แนวทางนี้ทำให้คุณมีผลิตภัณฑ์ที่ขายได้เป็นขั้น ๆ โดยไม่ต้องรอให้ระบบ Marketplace ที่ซับซ้อนทั้งหมดเสร็จพร้อมกัน