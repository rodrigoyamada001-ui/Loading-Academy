"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hasSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

function appUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}${path}`;
}

function withMessage(path: string, message: string) {
  return `${path}?message=${encodeURIComponent(message)}`;
}

export async function signInAction(formData: FormData) {
  if (!hasSupabaseEnv()) redirect(withMessage("/login", "Configure o Supabase no .env.local para entrar."));
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    const message = error.message.toLowerCase().includes("email not confirmed")
      ? "Confirme seu e-mail antes de entrar ou desative a confirmação de e-mail no Supabase."
      : `Não foi possível entrar: ${error.message}`;
    redirect(withMessage("/login", message));
  }
  redirect("/dashboard");
}

export async function signUpAction(formData: FormData) {
  if (!hasSupabaseEnv()) redirect(withMessage("/register", "Configure o Supabase no .env.local antes de criar contas."));
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "");

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: appUrl("/dashboard"),
      data: { full_name: fullName }
    }
  });

  if (error) redirect(withMessage("/register", `Não foi possível criar sua conta: ${error.message}`));
  redirect(withMessage("/login", "Conta criada. Aguarde a aprovação da liderança."));
}

export async function resetPasswordAction(formData: FormData) {
  if (!hasSupabaseEnv()) redirect(withMessage("/login", "Configure o Supabase no .env.local para recuperar senha."));
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "");

  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: appUrl("/login")
  });

  redirect(withMessage("/login", "Enviamos as instruções de recuperação para seu e-mail."));
}

export async function signOutAction() {
  if (!hasSupabaseEnv()) redirect("/");
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function touchLastLesson(courseId: string, lessonId: string) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("course_access").update({
    last_lesson_id: lessonId
  }).eq("user_id", user.id).eq("course_id", courseId);

  await supabase.from("course_access").insert({
    user_id: user.id,
    course_id: courseId,
    last_lesson_id: lessonId
  });
  revalidatePath(`/courses/${courseId}`);
}
