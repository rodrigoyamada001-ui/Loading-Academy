import { AppShell } from "@/components/shell";
import { CourseCard } from "@/components/course-card";
import { requireApprovedUser } from "@/lib/auth";
import { getAccessiblePublishedCourses } from "@/lib/courses";

export default async function CoursesPage() {
  const profile = await requireApprovedUser();
  const courses = await getAccessiblePublishedCourses(profile.id);

  return (
    <AppShell profile={profile}>
      <div className="mb-8">
        <p className="text-sm text-slate-300">Area do membro</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Cursos liberados</h1>
      </div>
      {courses.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} href={`/courses/${course.id}`} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-premium-line/70 bg-premium-base/45 p-10 text-center">
          <p className="text-xl font-semibold">Nenhum curso disponível no momento.</p>
          <p className="mt-2 text-slate-300">Novos conteudos serao liberados em breve.</p>
        </div>
      )}
    </AppShell>
  );
}
