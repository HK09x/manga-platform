import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function requireAdmin() {
  if (!isSupabaseConfigured()) redirect("/admin/login?error=unavailable");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect("/admin/login");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .maybeSingle();

  if (profileError || profile?.role !== "admin") {
    redirect("/admin/login?error=unauthorized");
  }

  return { supabase, user: data.user };
}
