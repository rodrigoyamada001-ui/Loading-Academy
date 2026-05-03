import { redirect } from "next/navigation";
import { hasSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import type { Profile, ProfileRole } from "@/lib/types";

export async function getCurrentUser() {
  if (!hasSupabaseEnv()) return null;
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return data as Profile | null;
}

export async function requireUser() {
  if (!hasSupabaseEnv()) redirect("/login?message=Configure o Supabase para acessar o sistema.");
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  return profile;
}

export async function requireApprovedUser() {
  const profile = await requireUser();
  if (profile.status !== "approved") redirect("/dashboard");
  return profile;
}

export async function requireAdminRole(roles: ProfileRole[] = ["admin"]) {
  const profile = await requireUser();
  if (!roles.includes(profile.role)) redirect("/dashboard");
  return profile;
}
