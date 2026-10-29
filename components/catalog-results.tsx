import { MangaCard } from "@/components/manga-card";
import Link from "next/link";
import { genres, mangaLibrary } from "@/lib/catalog";

type CatalogResultsProps = {
  searchParams: Promise<{ q?: string | string[]; genre?: string | string[] }>;
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function CatalogResults({ searchParams }: CatalogResultsProps) {
  const params = await searchParams;
  const query = firstValue(params.q)?.trim() ?? "";
  const selectedGenre = firstValue(params.genre) ?? "ทั้งหมด";
  const normalizedQuery = query.toLocaleLowerCase("th-TH");

  const visibleManga = mangaLibrary.filter((manga) => {
    const matchesQuery =
      !normalizedQuery ||
      `${manga.title} ${manga.originalTitle} ${manga.author}`
        .toLocaleLowerCase("th-TH")
        .includes(normalizedQuery);
    const matchesGenre =
      selectedGenre === "ทั้งหมด" || manga.genres.includes(selectedGenre);
    return matchesQuery && matchesGenre;
  });

  return (
    <section aria-labelledby="catalog-title" className="section-block" id="catalog">
      <div className="section-heading">
        <div>
          <span className="eyebrow">เลือกเรื่องที่ชอบ</span>
          <h2 id="catalog-title">
            {query ? `ผลการค้นหา “${query}”` : "มังงะน่าอ่าน"}
          </h2>
          <p>รวมเรื่องหลากหลายแนว เลือกอ่านได้ตามที่ชอบ</p>
        </div>
        <span aria-live="polite" className="text-link">
          {visibleManga.length} เรื่อง
        </span>
      </div>

      <nav aria-label="กรองตามประเภท" className="genre-list">
        {genres.map((genre) => {
          const search = new URLSearchParams();
          if (genre !== "ทั้งหมด") search.set("genre", genre);
          if (query) search.set("q", query);
          const href = search.size ? `/?${search.toString()}` : "/";

          return (
            <Link
              aria-current={genre === selectedGenre ? "page" : undefined}
              className="genre-chip"
              href={href}
              key={genre}
            >
              {genre}
            </Link>
          );
        })}
      </nav>

      <div className="manga-grid">
        {visibleManga.length > 0 ? (
          visibleManga.map((manga) => <MangaCard key={manga.slug} manga={manga} />)
        ) : (
          <p className="empty-state">
            ไม่พบเรื่องที่ตรงกับการค้นหา ลองเปลี่ยนคำค้นหรือเลือกประเภทอื่น
          </p>
        )}
      </div>
    </section>
  );
}

export function CatalogFallback() {
  return (
    <section aria-busy="true" aria-live="polite" className="section-block" id="catalog">
      <div className="catalog-fallback">กำลังโหลดรายการมังงะ…</div>
    </section>
  );
}
