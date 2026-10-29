# Capability Map

แผนที่นี้สรุปโมดูลจาก [Project Blueprint](product-blueprint.md); Blueprint ฉบับเต็มเป็นข้อกำหนดเมื่อมีความต่างกัน

| Module | หน้าที่ | พึ่งพา | ระยะ |
|---|---|---|---|
| `foundation` | Next.js app, config, deployment, Supabase connection และ migrations | — | Phase 0 |
| `catalog-reader` | รายการเรื่อง, รายละเอียด, ตอน, public vertical reader และ SEO | `foundation` | Phase 1 |
| `admin-content` | Admin, manga/chapter CRUD, upload, draft/publish และ rights checks | `foundation`, `catalog-reader` | Phase 2 |
| `member-library` | Auth, profiles, bookmarks, history และ progress sync | `foundation`, `catalog-reader` | Phase 3 |
| `creator-review` | Creator application/Studio, submissions, review และ moderation | `admin-content`, `member-library` | Phase 4 |
| `commerce` | orders, payments, entitlements, refunds และ revenue ledger | `creator-review` | Phase 5 |
| `payouts` | payout requests, reconciliation และ audit | `commerce` | Phase 6 |
| `source-delivery` | installation, deployment, upgrade, backup/restore และ edition packaging | `foundation` | Phase 6 |

**ลำดับ:** Foundation → Catalog & Reader → Admin & Content Pipeline → Authentication & Library → Creator → Commerce → Payout & Production Release

ใช้ modular monolith ใน repository เดียว; แบ่งขอบเขตโค้ดตามโมดูล แต่ยังไม่สร้าง workspace packages หรือ microservices ก่อนมีความจำเป็น
