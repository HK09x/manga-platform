export type MangaInput = {
  title: string;
  slug: string;
  description: string;
  authorName: string;
};

export function validateMangaInput(input: MangaInput): MangaInput | undefined {
  const title = input.title.trim();
  const slug = input.slug.trim().toLowerCase();
  const description = input.description.trim();
  const authorName = input.authorName.trim();

  if (
    title.length === 0 ||
    title.length > 160 ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
    slug.length > 120 ||
    description.length > 5000 ||
    authorName.length > 160
  ) {
    return undefined;
  }

  return { title, slug, description, authorName };
}
