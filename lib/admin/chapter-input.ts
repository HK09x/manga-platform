export type ChapterInput = { slug: string; chapterNumber: string; title: string; sortOrder: string };

export function validateChapterInput(input: ChapterInput) {
  const slug = input.slug.trim().toLowerCase();
  const chapterNumber = input.chapterNumber.trim();
  const title = input.title.trim();
  const sortOrder = Number(input.sortOrder);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !chapterNumber || !title || !Number.isInteger(sortOrder) || sortOrder < 0) return undefined;
  return { slug, chapterNumber, title, sortOrder };
}
