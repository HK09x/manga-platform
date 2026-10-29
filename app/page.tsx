import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { CatalogFallback, CatalogResults } from "@/components/catalog-results";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { mangaLibrary } from "@/lib/catalog";

type HomeProps = {
  searchParams: Promise<{ q?: string | string[]; genre?: string | string[] }>;
};

export default function Home({ searchParams }: HomeProps) {
  const featured = mangaLibrary.find((manga) => manga.featured) ?? mangaLibrary[0];

  return (
    <>
      <SiteHeader searchParams={searchParams} />
      <main className="page-shell">
        <section aria-labelledby="featured-title" className="hero">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">KOMI SELECT · เรื่องเด่นประจำสัปดาห์</span>
            <h1 id="featured-title">{featured.title}</h1>
            <p>{featured.description}</p>
            <div className="hero-meta">
              <span className="hero-author">
                <span className="hero-meta-label">ผู้เขียน</span>
                <strong>{featured.author}</strong>
              </span>
              <span className="hero-genres">{featured.genres.join(" · ")}</span>
            </div>
            <div className="hero-actions">
              <Link className="button-primary" href={`/read/${featured.chapters[0].id}`}>
                อ่านตอนล่าสุด <span aria-hidden="true">↗</span>
              </Link>
              <Link className="hero-secondary-link" href={`/manga/${featured.slug}`}>
                ดูรายละเอียดเรื่อง
              </Link>
            </div>
          </div>
          <div className="hero-art">
            <Image
              alt={featured.coverAlt}
              fill
              preload
              sizes="(max-width: 680px) 100vw, 50vw"
              src={featured.cover}
            />
            <span className="hero-art-label">เรื่องแนะนำ</span>
            <span className="hero-art-caption">{featured.originalTitle}</span>
          </div>
        </section>

        <Suspense fallback={<CatalogFallback />}>
          <CatalogResults searchParams={searchParams} />
        </Suspense>

        <section aria-labelledby="latest-title" className="section-block" id="latest">
          <div className="section-heading">
            <div>
              <span className="eyebrow">มีตอนใหม่ให้อ่าน</span>
              <h2 id="latest-title">อัปเดตล่าสุด</h2>
            </div>
            <Link className="text-link latest-all-link" href="/#catalog">
              เลือกอ่านเรื่องอื่น <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="chapter-list">
            {mangaLibrary.slice(0, 3).map((manga) => {
              const chapter = manga.chapters[0];
              return (
                <Link
                  className="chapter-row"
                  href={`/read/${chapter.id}`}
                  key={chapter.id}
                >
                  <Image
                    alt=""
                    className="latest-cover"
                    height={64}
                    src={manga.cover}
                    width={48}
                  />
                  <span>
                    <span className="chapter-title">
                      {manga.title} · {chapter.title}
                    </span>
                    <span className="chapter-date">{manga.updatedAt}</span>
                  </span>
                  <span aria-hidden="true" className="chapter-arrow">
                    ↗
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
