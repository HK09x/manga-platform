import Link from "next/link";
import { Suspense } from "react";

type SearchParams = Promise<{ q?: string | string[] }>;

function searchValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function SearchForm({ query = "" }: { query?: string }) {
  return (
      <form action="/manga" className="header-search" role="search">
      <label className="sr-only" htmlFor="catalog-search">
        ค้นหามังงะ
      </label>
      <input
        autoComplete="off"
        defaultValue={query}
        id="catalog-search"
        name="q"
        placeholder="ค้นหาชื่อเรื่อง..."
        type="search"
      />
      <button aria-label="ค้นหา" className="search-submit" type="submit">
        <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
          <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" />
          <path d="m16 16 4.2 4.2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        </svg>
      </button>
    </form>
  );
}

async function SearchFormFromUrl({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  return <SearchForm query={searchValue(params.q) ?? ""} />;
}

export function SiteHeader({ searchParams }: { searchParams?: SearchParams }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link aria-label="Komi — หน้าแรก" className="brand" href="/">
          <span aria-hidden="true" className="brand-mark">
            K
          </span>
          <span>Komi</span>
        </Link>

        <nav aria-label="เมนูหลัก" className="main-nav">
          <Link href="/manga">สำรวจมังงะ</Link>
          <Link href="/#latest">อัปเดตล่าสุด</Link>
        </nav>

        {searchParams ? (
          <Suspense fallback={<SearchForm />}>
            <SearchFormFromUrl searchParams={searchParams} />
          </Suspense>
        ) : (
          <SearchForm />
        )}

        <Link className="header-action" href="/manga">
          เริ่มอ่าน
        </Link>
      </div>
    </header>
  );
}
