import Link from "next/link";
import { Suspense } from "react";
import { MangaCard } from "@/components/manga-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { genres, mangaLibrary } from "@/lib/catalog";

type SearchParams = Promise<{
  genre?: string | string[];
  page?: string | string[];
  q?: string | string[];
  status?: string | string[];
}>;

const statuses = ["ทั้งหมด", "กำลังเขียน", "จบแล้ว"];
const pageSize = 12;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function queryHref(values: Record<string, string | undefined>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    if (value) query.set(key, value);
  }
  const search = query.toString();
  return search ? `/manga?${search}` : "/manga";
}

export const metadata = {
  title: "สำรวจมังงะ",
  description: "ค้นหาและเลือกอ่านมังงะหลากหลายแนวบน Komi",
};

async function MangaListingContent({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const query = firstValue(params.q)?.trim() ?? "";
  const genre = genres.includes(firstValue(params.genre) ?? "")
    ? firstValue(params.genre)!
    : "ทั้งหมด";
  const status = statuses.includes(firstValue(params.status) ?? "")
    ? firstValue(params.status)!
    : "ทั้งหมด";
  const search = query.toLocaleLowerCase("th-TH");

  const filteredManga = mangaLibrary.filter((manga) => {
    const matchesQuery =
      !search ||
      `${manga.title} ${manga.originalTitle} ${manga.author}`
        .toLocaleLowerCase("th-TH")
        .includes(search);
    return (
      matchesQuery &&
      (genre === "ทั้งหมด" || manga.genres.includes(genre)) &&
      (status === "ทั้งหมด" || manga.statusLabel === status)
    );
  });

  const pageCount = Math.max(1, Math.ceil(filteredManga.length / pageSize));
  const requestedPage = Number.parseInt(firstValue(params.page) ?? "1", 10);
  const page = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), pageCount)
    : 1;
  const visibleManga = filteredManga.slice((page - 1) * pageSize, page * pageSize);
  const commonFilters = {
    q: query || undefined,
    genre: genre === "ทั้งหมด" ? undefined : genre,
    status: status === "ทั้งหมด" ? undefined : status,
  };

  return (
    <main className="page-shell manga-listing">
      <div className="listing-intro">
        <span className="eyebrow">KOMI LIBRARY</span>
        <h1>สำรวจมังงะ</h1>
        <p>ค้นหาเรื่องที่ใช่ แล้วอ่านต่อได้ทุกอุปกรณ์</p>
      </div>

      <section aria-label="ตัวกรองมังงะ" className="listing-filters">
        <div className="filter-group">
          <h2>สถานะ</h2>
          <nav aria-label="กรองตามสถานะ" className="filter-options">
            {statuses.map((option) => (
              <Link
                aria-current={status === option ? "page" : undefined}
                className="genre-chip"
                href={queryHref({
                  ...commonFilters,
                  status: option === "ทั้งหมด" ? undefined : option,
                })}
                key={option}
              >
                {option}
              </Link>
            ))}
          </nav>
        </div>

        <div className="filter-group">
          <h2>ประเภท</h2>
          <nav aria-label="กรองตามประเภท" className="filter-options">
            {genres.map((option) => (
              <Link
                aria-current={genre === option ? "page" : undefined}
                className="genre-chip"
                href={queryHref({
                  ...commonFilters,
                  genre: option === "ทั้งหมด" ? undefined : option,
                })}
                key={option}
              >
                {option}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section aria-labelledby="listing-title" className="listing-results">
        <div className="section-heading">
          <div>
            <span className="eyebrow">เลือกอ่านได้ตามใจ</span>
            <h2 id="listing-title">
              {query ? `ผลการค้นหา “${query}”` : "เรื่องทั้งหมด"}
            </h2>
          </div>
          <span aria-live="polite" className="text-link">
            {filteredManga.length} เรื่อง
          </span>
        </div>

        <div className="manga-grid">
          {visibleManga.length ? (
            visibleManga.map((manga) => <MangaCard key={manga.slug} manga={manga} />)
          ) : (
            <p className="empty-state">
              ไม่พบเรื่องที่ตรงกับตัวกรอง ลองเปลี่ยนคำค้นหรือเลือกตัวกรองอื่น
            </p>
          )}
        </div>

        {pageCount > 1 && (
          <nav aria-label="เปลี่ยนหน้ารายการมังงะ" className="pagination">
            {page > 1 && (
              <Link href={queryHref({ ...commonFilters, page: String(page - 1) })}>
                ← ก่อนหน้า
              </Link>
            )}
            <span aria-current="page">
              หน้า {page} จาก {pageCount}
            </span>
            {page < pageCount && (
              <Link href={queryHref({ ...commonFilters, page: String(page + 1) })}>
                หน้าถัดไป →
              </Link>
            )}
          </nav>
        )}
      </section>
    </main>
  );
}

export default function MangaListingPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <SiteHeader searchParams={searchParams} />
      <Suspense
        fallback={
          <main className="page-shell">
            <div className="catalog-fallback">กำลังโหลดรายการมังงะ…</div>
          </main>
        }
      >
        <MangaListingContent searchParams={searchParams} />
      </Suspense>
      <SiteFooter />
    </>
  );
}
