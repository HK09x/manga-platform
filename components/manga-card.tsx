import Image from "next/image";
import Link from "next/link";
import type { Manga } from "@/lib/catalog";

export function MangaCard({ manga }: { manga: Manga }) {
  return (
    <article className="manga-card">
      <Link
        aria-label={`ดูรายละเอียดเรื่อง ${manga.title}`}
        className="cover-frame"
        href={`/manga/${manga.slug}`}
      >
        <Image
          alt={`ปกมังงะเรื่อง ${manga.title}`}
          fill
          sizes="(max-width: 680px) 46vw, (max-width: 900px) 30vw, 22vw"
          src={manga.cover}
        />
        <span className="status-tag">{manga.statusLabel}</span>
      </Link>
      <h3>
        <Link href={`/manga/${manga.slug}`}>{manga.title}</Link>
      </h3>
      <div className="card-detail">{manga.genres.join(" · ")}</div>
      <div className="card-chapter">ตอนล่าสุด · {manga.latestChapterLabel}</div>
    </article>
  );
}
