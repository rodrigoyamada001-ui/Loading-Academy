import { Megaphone, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/shell";
import { CourseCard } from "@/components/course-card";
import { LinkButton } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";
import { getAccessiblePublishedCourses } from "@/lib/courses";
import { createClient } from "@/lib/supabase/server";
import type { Announcement } from "@/lib/types";

export default async function DashboardPage() {
  const profile = await requireUser();
  const supabase = await createClient();
  const approved = profile.status === "approved";

  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(3);

  const courses = approved ? (await getAccessiblePublishedCourses(profile.id)).slice(0, 3) : [];

  return (
    <AppShell profile={profile}>
      <section className="grid gap-6">
        <div className="rounded-2xl border border-premium-line/70 bg-gradient-to-br from-premium-base/70 to-premium-surface/60 p-6 shadow-halo">
          <p className="text-sm text-slate-300">Area do membro</p>
          <h1 className="mt-2 font-display text-4xl font-semibold">Ola, {profile.full_name ?? "membro"}.</h1>
          {approved ? (
            <p className="mt-3 max-w-2xl text-slate-200">Continue sua jornada de formacao e acompanhe os cursos liberados pela lideranca.</p>
          ) : (
            <p className="mt-3 max-w-2xl rounded-md border border-premium-gold/40 bg-premium-gold/15 p-4 text-amber-100">
              Seu cadastro esta aguardando aprovacao da lideranca.
            </p>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Cursos liberados</h2>
              <LinkButton href="/courses" variant="secondary">Ver todos</LinkButton>
            </div>
            {approved && courses.length ? (
              <div className="grid gap-4 md:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} href={`/courses/${course.id}`} />
                ))}
              </div>
            ) : approved ? (
              <EmptyCourses />
            ) : null}
          </section>

          <section className="rounded-2xl border border-premium-line/70 bg-premium-base/50 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Megaphone className="size-5 text-premium-cyan" />
              <h2 className="text-xl font-semibold">Avisos da igreja</h2>
            </div>
            {announcements?.length ? (
              <div className="grid gap-3">
                {(announcements as Announcement[]).map((item) => (
                  <article key={item.id} className="rounded-xl border border-premium-line/70 bg-premium-base/45 p-4">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.body}</p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-6 text-slate-400">Nenhum aviso publicado no momento.</p>
            )}
          </section>
        </div>

        {(profile.role === "leader" || profile.role === "admin") ? (
          <div className="flex items-center justify-between rounded-2xl border border-premium-cyan/35 bg-premium-base/55 p-5">
            <div>
              <h2 className="font-semibold">Acesso de lideranca</h2>
              <p className="mt-1 text-sm text-slate-200">Gerencie membros, cursos, modulos, aulas e avisos.</p>
            </div>
            <LinkButton href="/admin" variant="accent">
              <ShieldCheck className="size-4" />
              Painel Administrativo
            </LinkButton>
          </div>
        ) : null}
      </section>
    </AppShell>
  );
}

function EmptyCourses() {
  return (
    <div className="rounded-lg border border-white/10 bg-white/6 p-8 text-center">
      <p className="text-lg font-semibold">Nenhum curso disponível no momento.</p>
      <p className="mt-2 text-slate-400">Novos conteúdos serão liberados em breve.</p>
    </div>
  );
}
