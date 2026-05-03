import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { AppShell } from "@/components/shell";
import { requireApprovedUser } from "@/lib/auth";
import { canUserAccessCourse } from "@/lib/courses";
import { createClient } from "@/lib/supabase/server";
import type { Course, Lesson, Module } from "@/lib/types";

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const profile = await requireApprovedUser();
  const { id } = await params;
  const supabase = await createClient();
  const hasAccess = await canUserAccessCourse(profile.id, id);

  if (!hasAccess) {
    return (
      <AppShell profile={profile}>
        <p>Você não possui acesso a este curso.</p>
      </AppShell>
    );
  }

  const { data: course } = await supabase.from("courses").select("*").eq("id", id).eq("status", "published").single();
  const { data: modules } = await supabase.from("modules").select("*").eq("course_id", id).order("position");
  const moduleIds = (modules ?? []).map((item) => item.id);
  const { data: lessons } = moduleIds.length
    ? await supabase.from("lessons").select("*").in("module_id", moduleIds).order("position")
    : { data: [] };
  const { data: progress } = lessons?.length
    ? await supabase.from("lesson_progress").select("lesson_id").eq("user_id", profile.id).in("lesson_id", lessons.map((lesson) => lesson.id))
    : { data: [] };

  const done = new Set((progress ?? []).map((item) => item.lesson_id));
  const total = lessons?.length ?? 0;
  const completed = done.size;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  if (!course) {
    return (
      <AppShell profile={profile}>
        <p>Curso não encontrado.</p>
      </AppShell>
    );
  }

  return (
    <AppShell profile={profile}>
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-premium-line/70 bg-gradient-to-b from-premium-base/60 to-premium-surface/55 p-6 shadow-halo">
          <p className="text-sm text-slate-300">Curso</p>
          <h1 className="mt-2 text-3xl font-semibold">{(course as Course).title}</h1>
          <p className="mt-4 leading-7 text-slate-200">{(course as Course).description}</p>
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm text-slate-300">
              <span>Progresso</span>
              <span>{percent}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-premium-cyan to-premium-gold" style={{ width: `${percent}%` }} />
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {(modules as Module[] | null)?.length ? (
            (modules as Module[]).map((module) => {
              const moduleLessons = (lessons as Lesson[] | null)?.filter((lesson) => lesson.module_id === module.id) ?? [];
              return (
                <section key={module.id} className="rounded-xl border border-premium-line/70 bg-premium-base/45 p-5">
                  <h2 className="text-xl font-semibold">{module.title}</h2>
                  {module.description ? <p className="mt-1 text-sm text-slate-300">{module.description}</p> : null}
                  <div className="mt-4 grid gap-2">
                    {moduleLessons.map((lesson) => (
                      <Link
                        href={`/courses/${id}/lessons/${lesson.id}`}
                        key={lesson.id}
                        className="flex items-center justify-between rounded-md border border-premium-line/70 bg-premium-surface/35 p-4 transition hover:bg-premium-surface/55"
                      >
                        <span className="flex items-center gap-3">
                          {done.has(lesson.id) ? <CheckCircle2 className="size-5 text-premium-cyan" /> : <Circle className="size-5 text-slate-500" />}
                          {lesson.title}
                        </span>
                        <ArrowRight className="size-4 text-slate-500" />
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })
          ) : (
            <div className="rounded-lg border border-white/10 bg-white/6 p-8 text-center text-slate-300">
              Este curso ainda não possui aulas cadastradas.
            </div>
          )}
        </div>
      </section>
    </AppShell>
  );
}
