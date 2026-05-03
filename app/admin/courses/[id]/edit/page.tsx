import { BookOpen, Layers3, Plus, Trash2 } from "lucide-react";
import { AdminNav } from "@/components/admin-nav";
import { AppShell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Field, Select, TextArea } from "@/components/ui/field";
import {
  createLesson,
  createModule,
  deleteCourse,
  updateCourse,
  updateCourseAccess
} from "@/lib/actions/admin";
import { requireAdminRole } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { Course, Lesson, Module, Profile } from "@/lib/types";

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const profile = await requireAdminRole();
  const { id } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase.from("courses").select("*").eq("id", id).single();
  const { data: modules } = await supabase.from("modules").select("*").eq("course_id", id).order("position");
  const moduleIds = (modules ?? []).map((item) => item.id);
  const { data: lessons } = moduleIds.length
    ? await supabase.from("lessons").select("*").in("module_id", moduleIds).order("position")
    : { data: [] };
  const { data: users } = await supabase.from("profiles").select("*").eq("status", "approved").order("full_name");
  const { data: access } = await supabase.from("course_access").select("user_id").eq("course_id", id);

  if (!course) {
    return (
      <AppShell profile={profile}>
        <p>Curso não encontrado.</p>
      </AppShell>
    );
  }

  const current = course as Course;
  const allowedUsers = new Set((access ?? []).map((item) => item.user_id));

  return (
    <AppShell profile={profile}>
      <AdminNav />
      <div className="mb-6">
        <p className="text-sm text-slate-300">Editar curso</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">{current.title}</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.82fr]">
        <section className="rounded-2xl border border-premium-line/70 bg-gradient-to-b from-premium-base/60 to-premium-surface/55 p-6">
          <h2 className="text-xl font-semibold">Dados do curso</h2>
          <form action={updateCourse} className="mt-5 grid gap-4">
            <input type="hidden" name="id" value={current.id} />
            <Field label="Título" name="title" required defaultValue={current.title} />
            <TextArea label="Descrição" name="description" required defaultValue={current.description} />
            <div className="grid gap-4 sm:grid-cols-3">
              <Select label="Status" name="status" defaultValue={current.status}>
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
                <option value="inactive">Inativo</option>
              </Select>
              <Select label="Nível" name="level" defaultValue={current.level}>
                <option value="basic">Básico</option>
                <option value="intermediate">Intermediário</option>
                <option value="leadership">Liderança</option>
              </Select>
              <Select label="Acesso" name="access_mode" defaultValue={current.access_mode}>
                <option value="all">Todos aprovados</option>
                <option value="specific">Usuários específicos</option>
              </Select>
            </div>
            <Field label="Nova imagem de capa" name="cover" type="file" />
            <div className="flex flex-wrap gap-2">
              <Button type="submit" variant="secondary">Salvar rascunho</Button>
              <Button type="submit" variant="accent">Publicar / salvar</Button>
            </div>
          </form>
          {profile.role === "admin" ? (
            <form action={deleteCourse} className="mt-4">
              <input type="hidden" name="id" value={current.id} />
              <Button type="submit" variant="danger">
                <Trash2 className="size-4" />
                Excluir curso
              </Button>
            </form>
          ) : null}
        </section>

        <section className="rounded-2xl border border-premium-line/70 bg-premium-base/45 p-6">
          <h2 className="text-xl font-semibold">Liberar acesso</h2>
          <p className="mt-2 text-sm text-slate-300">Use para cursos com acesso especifico. Cursos no modo todos aprovados aparecem para todos os membros aprovados.</p>
          <div className="mt-5 grid gap-3">
            {(users as Profile[] | null)?.map((user) => {
              const hasAccess = allowedUsers.has(user.id);
              return (
                <form key={user.id} action={updateCourseAccess} className="flex items-center justify-between gap-3 rounded-md border border-premium-line/70 bg-premium-base/45 p-3">
                  <input type="hidden" name="course_id" value={current.id} />
                  <input type="hidden" name="user_id" value={user.id} />
                  <input type="hidden" name="access_action" value={hasAccess ? "revoke" : "grant"} />
                  <span>
                    <span className="block text-sm font-semibold">{user.full_name ?? user.email}</span>
                      <span className="block text-xs text-slate-400">{hasAccess ? "Liberado" : "Sem acesso especifico"}</span>
                  </span>
                  <Button type="submit" variant={hasAccess ? "danger" : "secondary"}>{hasAccess ? "Remover" : "Liberar"}</Button>
                </form>
              );
            })}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-premium-line/70 bg-premium-base/45 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm text-slate-300">Conteudo</p>
            <h2 className="mt-1 text-2xl font-semibold">Modulos e aulas do curso</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Organize assim: Curso de Lideranca, Modulo principal, Aula 1, Aula 2, Aula 3 e quantas aulas forem necessarias.
            </p>
          </div>
          <div className="rounded-md border border-premium-cyan/35 bg-premium-cyan/15 px-3 py-2 text-sm text-cyan-100">
            {(lessons as Lesson[] | null)?.length ?? 0} aulas cadastradas
          </div>
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
          <form action={createModule} className="grid gap-4 rounded-xl border border-premium-line/70 bg-premium-base/45 p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Layers3 className="size-4 text-premium-cyan" />
              Novo módulo
            </h3>
            <input type="hidden" name="course_id" value={current.id} />
            <Field label="Título do módulo" name="title" required placeholder="Ex: Fundamentos da liderança" />
            <TextArea label="Descrição" name="description" rows={3} />
            <Field label="Ordem" name="position" type="number" defaultValue={(modules?.length ?? 0) + 1} />
            <Button type="submit" variant="secondary">
              <Plus className="size-4" />
              Novo módulo
            </Button>
          </form>

          <form action={createLesson} className="grid gap-4 rounded-xl border border-premium-line/70 bg-premium-base/45 p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <BookOpen className="size-4 text-premium-gold" />
              Nova aula dentro do curso
            </h3>
            <input type="hidden" name="course_id" value={current.id} />
            <Select label="Módulo" name="module_id">
              {(modules as Module[] | null)?.map((module) => <option key={module.id} value={module.id}>{module.title}</option>)}
            </Select>
            <Field label="Título da aula" name="title" required placeholder="Ex: Aula 1 - Chamado e caráter" />
            <TextArea label="Conteúdo em texto" name="content" rows={8} />
              <Field label="Link de video externo" name="video_url" placeholder="YouTube, Vimeo ou Drive" />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="PDF" name="pdf" type="file" />
              <Field label="Imagem" name="image" type="file" />
              <Field label="Upload de video" name="video_file" type="file" />
            </div>
            <Field label="Ordem" name="position" type="number" defaultValue={1} />
            <Button type="submit" variant="accent">
              <Plus className="size-4" />
              Adicionar aula ao curso
            </Button>
          </form>
        </div>

        <div className="mt-6 grid gap-4">
          {(modules as Module[] | null)?.map((module) => {
            const moduleLessons = (lessons as Lesson[] | null)?.filter((lesson) => lesson.module_id === module.id) ?? [];
            return (
              <div key={module.id} className="rounded-xl border border-premium-line/70 bg-premium-base/45 p-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold">{module.position}. {module.title}</h3>
                  <span className="text-sm text-slate-400">{moduleLessons.length} aulas</span>
                </div>
                <div className="mt-3 grid gap-2">
                  {moduleLessons.length ? moduleLessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center gap-3 rounded-md border border-premium-line/70 bg-premium-surface/35 p-3 text-sm">
                      <span className="grid size-8 shrink-0 place-items-center rounded-md bg-white text-black font-semibold">
                        {lesson.position}
                      </span>
                      <span>
                        <span className="block font-semibold">{lesson.title}</span>
                        <span className="block text-xs text-slate-500">
                          {lesson.pdf_url ? "PDF " : ""}{lesson.image_url ? "Imagem " : ""}{lesson.video_url || lesson.video_file_url ? "Vídeo" : "Texto"}
                        </span>
                      </span>
                    </div>
                  )) : <p className="text-sm text-slate-500">Nenhuma aula cadastrada neste módulo.</p>}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
