"use server";

import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function signInAdmin(formData: FormData) {
  const rawEmail = formData.get("email");
  const password = formData.get("password");

  if (
    !isSupabaseConfigured() ||
    typeof rawEmail !== "string" ||
    typeof password !== "string" ||
    rawEmail.trim().length === 0 ||
    rawEmail.trim().length > 254 ||
    password.length === 0 ||
    password.length > 256
  ) {
    redirect("/admin/login?error=signin");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: rawEmail.trim(),
    password,
  });

  if (error || !data.user) redirect("/admin/login?error=signin");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .maybeSingle();

  if (profileError || profile?.role !== "admin") {
    await supabase.auth.signOut();
    redirect("/admin/login?error=signin");
  }

  redirect("/admin");
}
