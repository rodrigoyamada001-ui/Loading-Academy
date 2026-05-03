"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function completeLesson(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return;

  const courseId = String(formData.get("course_id"));
  const lessonId = String(formData.get("lesson_id"));

  await supabase.from("lesson_progress").upsert({
    user_id: user.id,
    lesson_id: lessonId,
    completed_at: new Date().toISOString()
  });

  revalidatePath(`/courses/${courseId}`);
  revalidatePath(`/courses/${courseId}/lessons/${lessonId}`);
}
