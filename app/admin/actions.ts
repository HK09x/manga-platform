"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/admin";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { validateMangaInput } from "@/lib/admin/manga-input";
import { validateChapterInput } from "@/lib/admin/chapter-input";

export async function signOutAdmin() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}

export async function createManga(formData: FormData) {
  const { supabase, user } = await requireAdmin();
  const input = mangaInputFromFormData(formData);
  if (!input) redirect("/admin/manga/new?error=invalid");

  const { error } = await supabase.from("manga").insert({
    title: input.title,
    slug: input.slug,
    description: input.description,
    author_name: input.authorName || null,
    created_by: user.id,
  });

  if (error) {
    redirect(error.code === "23505" ? "/admin/manga/new?error=duplicate" : "/admin/manga/new?error=save");
  }

  revalidatePath("/admin/manga");
  redirect("/admin/manga");
}

export async function updateManga(id: string, formData: FormData) {
  const { supabase } = await requireAdmin();
  if (!isUuid(id)) redirect("/admin/manga?error=invalid");

  const input = mangaInputFromFormData(formData);
  if (!input) redirect(`/admin/manga/${id}/edit?error=invalid`);

  const status = formData.get("status");
  const rightsConfirmed = formData.get("rightsConfirmed") === "on";
  if (status !== "draft" && status !== "published" && status !== "archived") {
    redirect(`/admin/manga/${id}/edit?error=invalid`);
  }
  if (status === "published" && !rightsConfirmed) {
    redirect(`/admin/manga/${id}/edit?error=rights`);
  }

  if (status === "published") {
    const { data: chapters, error: chapterError } = await supabase
      .from("chapters")
      .select("id, chapter_pages(id)")
      .eq("manga_id", id)
      .eq("status", "published");
    if (chapterError || !chapters?.some((chapter) => chapter.chapter_pages.length > 0)) {
      redirect(`/admin/manga/${id}/edit?error=incomplete`);
    }
  }

  const { data: updated, error } = await supabase
    .from("manga")
    .update({
      title: input.title,
      slug: input.slug,
      description: input.description,
      author_name: input.authorName || null,
      status,
      rights_confirmed: rightsConfirmed,
    })
    .eq("id", id)
    .select("slug")
    .maybeSingle();

  if (error || !updated) {
    redirect(error?.code === "23505" ? `/admin/manga/${id}/edit?error=duplicate` : `/admin/manga/${id}/edit?error=save`);
  }

  revalidatePath("/admin/manga");
  revalidatePath("/");
  revalidatePath("/manga");
  revalidatePath(`/manga/${updated.slug}`);
  revalidatePath(`/manga/${input.slug}`);
  redirect("/admin/manga");
}

export async function createChapter(mangaId: string, formData: FormData) {
  const { supabase } = await requireAdmin();
  if (!isUuid(mangaId)) redirect("/admin/manga?error=invalid");

  const slug = formData.get("slug");
  const chapterNumber = formData.get("chapterNumber");
  const title = formData.get("title");
  const sortOrder = formData.get("sortOrder");
  if (typeof slug !== "string" || typeof chapterNumber !== "string" || typeof title !== "string" || typeof sortOrder !== "string") redirect(`/admin/manga/${mangaId}/chapters?error=invalid`);
  const input = validateChapterInput({ slug, chapterNumber, title, sortOrder });
  if (!input) redirect(`/admin/manga/${mangaId}/chapters?error=invalid`);
  const { error } = await supabase.from("chapters").insert({ manga_id: mangaId, slug: input.slug, chapter_number: input.chapterNumber, title: input.title, sort_order: input.sortOrder });
  if (error) redirect(error.code === "23505" ? `/admin/manga/${mangaId}/chapters?error=duplicate` : `/admin/manga/${mangaId}/chapters?error=save`);
  revalidatePath(`/admin/manga/${mangaId}/chapters`);
  redirect(`/admin/manga/${mangaId}/chapters`);
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(value);
}

function mangaInputFromFormData(formData: FormData) {
  const title = formData.get("title");
  const slug = formData.get("slug");
  const description = formData.get("description");
  const authorName = formData.get("authorName");

  if (
    typeof title !== "string" ||
    typeof slug !== "string" ||
    typeof description !== "string" ||
    typeof authorName !== "string"
  ) {
    return undefined;
  }

  return validateMangaInput({
    title,
    slug,
    description,
    authorName,
  });

}
