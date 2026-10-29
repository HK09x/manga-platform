import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ReaderPageImage } from "@/components/reader-page-image";
import { ReadingProgress } from "@/components/reading-progress";
import { findChapter, mangaLibrary } from "@/lib/catalog";

type ReaderPageProps = {
  params: Promise<{ chapterId: string }>;
};

export function generateStaticParams() {
  return mangaLibrary.flatMap((manga) =>
    manga.chapters.map((chapter) => ({ chapterId: chapter.id })),
  );
}

export async function generateMetadata({ params }: ReaderPageProps) {
  const { chapterId } = await params;
  const result = findChapter(chapterId);
  return result
    ? {
        title: `${result.chapter.title} — ${result.manga.title}`,
        description: `อ่าน${result.chapter.title} จากเรื่อง ${result.manga.title}`,
      }
    : {};
}

async function ReaderContent({ params }: ReaderPageProps) {
  const { chapterId } = await params;
  const result = findChapter(chapterId);

  if (!result) notFound();

  const { chapter, manga, chapterIndex } = result;
  const previousChapter = manga.chapters[chapterIndex + 1];
  const nextChapter = manga.chapters[chapterIndex - 1];

  return (
    <main className="reader-page">
      <header className="reader-topbar">
        <Link className="reader-back" href={`/manga/${manga.slug}`}>
          ← <span className="desktop-reader-label">กลับหน้ารายละเอียด</span>
          <span className="mobile-reader-label">กลับ</span>
        </Link>
        <span className="reader-title">
          {manga.title} · {chapter.title}
        </span>
        <Link className="reader-chapter-link" href={`/manga/${manga.slug}#chapter-heading`}>
          รายการตอน
        </Link>
      </header>

      <ReadingProgress chapterId={chapter.id} mangaSlug={manga.slug} />
      <article aria-label={`${manga.title} ${chapter.title}`} className="reader-content">
        <div className="reader-intro">
          <span>
            <strong>{chapter.title}</strong>
            <br />
            {manga.title}
          </span>
          <span>{chapter.pages.length} หน้า</span>
        </div>
        {chapter.pages.map((page, index) => (
          <ReaderPageImage
            alt={`${manga.title} ${chapter.title} หน้า ${index + 1}`}
            key={page}
            preload={index === 0}
            src={page}
          />
        ))}
        <nav aria-label="เปลี่ยนตอน" className="reader-nav">
          {previousChapter ? (
            <Link href={`/read/${previousChapter.id}`}>← ตอนก่อนหน้า</Link>
          ) : (
            <span />
          )}
          {nextChapter ? (
            <Link href={`/read/${nextChapter.id}`}>ตอนถัดไป →</Link>
          ) : (
            <Link href={`/manga/${manga.slug}`}>กลับหน้ารวมตอน →</Link>
          )}
        </nav>
      </article>
    </main>
  );
}

export default function ReaderPage({ params }: ReaderPageProps) {
  return (
    <Suspense
      fallback={
        <main className="reader-page">
          <div className="reader-content">กำลังโหลดตอน…</div>
        </main>
      }
    >
      <ReaderContent params={params} />
    </Suspense>
  );
}
