import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { findManga, mangaLibrary } from "@/lib/catalog";

type MangaPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return mangaLibrary.map((manga) => ({ slug: manga.slug }));
}

export async function generateMetadata({ params }: MangaPageProps) {
  const { slug } = await params;
  const manga = findManga(slug);
  return manga
    ? {
        title: manga.title,
        description: manga.description,
      }
    : {};
}

async function MangaDetailContent({ params }: MangaPageProps) {
  const { slug } = await params;
  const manga = findManga(slug);

  if (!manga) notFound();

  return (
    <>
      <main className="page-shell">
        <nav aria-label="เส้นทางนำทาง" className="detail-breadcrumb">
          <Link href="/">หน้าแรก</Link>
          <span aria-hidden="true">/</span>
          <span>{manga.title}</span>
        </nav>

        <article>
          <div className="detail-layout">
            <div className="detail-cover">
              <Image
                alt={manga.coverAlt}
                fill
                preload
                sizes="(max-width: 680px) 112px, 300px"
                src={manga.cover}
              />
            </div>
            <div className="detail-copy">
              <span className="eyebrow">{manga.statusLabel}</span>
              <h1>{manga.title}</h1>
              <p className="detail-subtitle">{manga.originalTitle}</p>
              <div className="detail-meta">
                <span>
                  ผู้เขียน <strong>{manga.author}</strong>
                </span>
                <span>{manga.updatedAt}</span>
              </div>
              <div aria-label="ประเภท" className="genre-inline">
                {manga.genres.map((genre) => (
                  <span key={genre}>{genre}</span>
                ))}
              </div>
              <p className="detail-description">{manga.description}</p>
              <Link
                className="button-primary"
                href={`/read/${manga.chapters[0].id}`}
              >
                อ่านตอนล่าสุด <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <section aria-labelledby="chapter-heading" className="chapter-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">อ่านต่อได้เลย</span>
                <h2 id="chapter-heading">รายการตอน</h2>
              </div>
              <span className="text-link">{manga.chapters.length} ตอน</span>
            </div>
            <div className="chapter-list">
              {manga.chapters.map((chapter) => (
                <Link className="chapter-row" href={`/read/${chapter.id}`} key={chapter.id}>
                  <span>
                    <span className="chapter-title">{chapter.title}</span>
                    <span className="chapter-date">เผยแพร่ {chapter.publishedAt}</span>
                  </span>
                  <span aria-hidden="true" className="chapter-arrow">
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
    </>
  );
}

export default function MangaDetailPage({ params }: MangaPageProps) {
  return (
    <>
      <SiteHeader />
      <Suspense
        fallback={
          <main className="page-shell">
            <div aria-busy="true" className="catalog-fallback">
              กำลังโหลดรายละเอียดเรื่อง…
            </div>
          </main>
        }
      >
        <MangaDetailContent params={params} />
      </Suspense>
      <SiteFooter />
    </>
  );
}
