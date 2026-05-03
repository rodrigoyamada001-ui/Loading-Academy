"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminRole } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { CourseLevel, CourseStatus, ProfileRole, ProfileStatus } from "@/lib/types";

async function uploadFile(bucket: string, file: File | null, folder: string) {
  if (!file || file.size === 0) return null;
  const supabase = await createClient();
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const path = `${folder}/${crypto.randomUUID()}-${safeName}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: false });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function updateUserStatus(formData: FormData) {
  await requireAdminRole(["admin"]);
  const supabase = await createClient();
  await supabase
    .from("profiles")
    .update({ status: String(formData.get("status")) as ProfileStatus })
    .eq("id", String(formData.get("id")));
  revalidatePath("/admin/users");
}

export async function updateUserRole(formData: FormData) {
  await requireAdminRole(["admin"]);
  const supabase = await createClient();
  await supabase
    .from("profiles")
    .update({ role: String(formData.get("role")) as ProfileRole })
    .eq("id", String(formData.get("id")));
  revalidatePath("/admin/users");
}

export async function createCourse(formData: FormData) {
  await requireAdminRole();
  const supabase = await createClient();
  const cover = await uploadFile("course-assets", formData.get("cover") as File | null, "covers");

  const { data, error } = await supabase
    .from("courses")
    .insert({
      title: String(formData.get("title")),
      description: String(formData.get("description") ?? ""),
      level: String(formData.get("level")) as CourseLevel,
      status: String(formData.get("status")) as CourseStatus,
      access_mode: String(formData.get("access_mode")),
      cover_url: cover
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  await supabase.from("modules").insert({
    course_id: data.id,
    title: "Aulas do curso",
    description: "Módulo principal para organizar as aulas deste curso.",
    position: 1
  });

  revalidatePath("/admin/courses");
  redirect(`/admin/courses/${data.id}/edit`);
}

export async function updateCourse(formData: FormData) {
  await requireAdminRole();
  const supabase = await createClient();
  const id = String(formData.get("id"));
  const cover = await uploadFile("course-assets", formData.get("cover") as File | null, "covers");

  const update: Record<string, string | null> = {
    title: String(formData.get("title")),
    description: String(formData.get("description") ?? ""),
    level: String(formData.get("level")),
    status: String(formData.get("status")),
    access_mode: String(formData.get("access_mode"))
  };
  if (cover) update.cover_url = cover;

  await supabase.from("courses").update(update).eq("id", id);
  revalidatePath(`/admin/courses/${id}/edit`);
  revalidatePath("/admin/courses");
}

export async function deleteCourse(formData: FormData) {
  await requireAdminRole(["admin"]);
  const supabase = await createClient();
  await supabase.from("courses").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/courses");
  redirect("/admin/courses");
}

export async function createModule(formData: FormData) {
  await requireAdminRole();
  const supabase = await createClient();
  const courseId = String(formData.get("course_id"));
  await supabase.from("modules").insert({
    course_id: courseId,
    title: String(formData.get("title")),
    description: String(formData.get("description") ?? ""),
    position: Number(formData.get("position") ?? 1)
  });
  revalidatePath(`/admin/courses/${courseId}/edit`);
}

export async function createLesson(formData: FormData) {
  await requireAdminRole();
  const supabase = await createClient();
  const courseId = String(formData.get("course_id"));
  const moduleId = String(formData.get("module_id"));
  const pdfUrl = await uploadFile("course-assets", formData.get("pdf") as File | null, "pdfs");
  const imageUrl = await uploadFile("course-assets", formData.get("image") as File | null, "images");
  const videoFileUrl = await uploadFile("course-videos", formData.get("video_file") as File | null, "videos");

  await supabase.from("lessons").insert({
    module_id: moduleId,
    title: String(formData.get("title")),
    content: String(formData.get("content") ?? ""),
    video_url: String(formData.get("video_url") ?? "") || null,
    pdf_url: pdfUrl,
    image_url: imageUrl,
    video_file_url: videoFileUrl,
    position: Number(formData.get("position") ?? 1)
  });
  revalidatePath(`/admin/courses/${courseId}/edit`);
}

export async function updateCourseAccess(formData: FormData) {
  await requireAdminRole();
  const supabase = await createClient();
  const courseId = String(formData.get("course_id"));
  const userId = String(formData.get("user_id"));
  const action = String(formData.get("access_action"));

  if (action === "grant") {
    await supabase.from("course_access").upsert({ course_id: courseId, user_id: userId });
  } else {
    await supabase.from("course_access").delete().eq("course_id", courseId).eq("user_id", userId);
  }
  revalidatePath(`/admin/courses/${courseId}/edit`);
}

export async function createAnnouncement(formData: FormData) {
  await requireAdminRole();
  const supabase = await createClient();
  await supabase.from("announcements").insert({
    title: String(formData.get("title")),
    body: String(formData.get("body")),
    is_active: formData.get("is_active") === "on"
  });
  revalidatePath("/admin/announcements");
}
