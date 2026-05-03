import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/lib/types";

export async function getAccessiblePublishedCourses(userId: string): Promise<Course[]> {
  const supabase = await createClient();

  const [{ data: allCourses }, { data: accessRows }] = await Promise.all([
    supabase
      .from("courses")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false }),
    supabase.from("course_access").select("course_id").eq("user_id", userId)
  ]);

  const allowedCourseIds = new Set((accessRows ?? []).map((row) => row.course_id));

  return ((allCourses ?? []) as Course[]).filter(
    (course) => course.access_mode === "all" || allowedCourseIds.has(course.id)
  );
}

export async function canUserAccessCourse(userId: string, courseId: string) {
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("id, access_mode")
    .eq("id", courseId)
    .eq("status", "published")
    .single();

  if (!course) return false;
  if (course.access_mode === "all") return true;

  const { data: access } = await supabase
    .from("course_access")
    .select("course_id")
    .eq("course_id", courseId)
    .eq("user_id", userId)
    .maybeSingle();

  return Boolean(access);
}
