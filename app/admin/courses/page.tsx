import { Pencil, Plus } from "lucide-react";
import { AdminNav } from "@/components/admin-nav";
import { AppShell } from "@/components/shell";
import { LinkButton } from "@/components/ui/button";
import { requireAdminRole } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { statusLabel } from "@/lib/utils";
import type { Course } from "@/lib/types";

export default async function AdminCoursesPage() {
  const profile = await requireAdminRole();
  const supabase = await createClient();
  const { data: courses } = await supabase.from("courses").select("*").order("updated_at", { ascending: false });

  return (
    <AppShell profile={profile}>
      <AdminNav />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-4xl font-semibold">Cursos</h1>
        <LinkButton href="/admin/courses/new" variant="accent">
          <Plus className="size-4" />
          Novo curso
        </LinkButton>
      </div>
      {(courses as Course[] | null)?.length ? (
        <div className="grid gap-3">
          {(courses as Course[]).map((course) => (
            <article key={course.id} className="flex flex-col gap-4 rounded-2xl border border-premium-line/70 bg-gradient-to-b from-premium-base/60 to-premium-surface/55 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-300">{statusLabel(course.status)} • {statusLabel(course.level)}</p>
                <h2 className="mt-1 text-xl font-semibold">{course.title}</h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-300">{course.description}</p>
              </div>
              <LinkButton href={`/admin/courses/${course.id}/edit`} variant="secondary">
                <Pencil className="size-4" />
                Editar
              </LinkButton>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-premium-line/70 bg-premium-base/45 p-10 text-center">
          <p className="text-lg font-semibold">Nenhum curso cadastrado.</p>
          <p className="mt-2 text-slate-400">Crie o primeiro curso quando a liderança estiver pronta.</p>
        </div>
      )}
    </AppShell>
  );
}
