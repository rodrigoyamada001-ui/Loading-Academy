import Image from "next/image";
import { CheckCircle2, FileText, Video } from "lucide-react";
import { AppShell } from "@/components/shell";
import { Button, LinkButton } from "@/components/ui/button";
import { completeLesson } from "@/lib/actions/progress";
import { requireApprovedUser } from "@/lib/auth";
import { canUserAccessCourse } from "@/lib/courses";
import { createClient } from "@/lib/supabase/server";
import type { Lesson } from "@/lib/types";

export default async function LessonPage({ params }: { params: Promise<{ id: string; lessonId: string }> }) {
  const profile = await requireApprovedUser();
  const { id, lessonId } = await params;
  const supabase = await createClient();
  const hasAccess = await canUserAccessCourse(profile.id, id);

  if (!hasAccess) {
    return (
      <AppShell profile={profile}>
        <p>Você não possui acesso a este curso.</p>
      </AppShell>
    );
  }

  const { data: lesson } = await supabase.from("lessons").select("*").eq("id", lessonId).single();
  const { data: lessonModule } = await supabase.from("modules").select("course_id").eq("id", lesson?.module_id ?? "").single();

  if (!lesson || lessonModule?.course_id !== id) {
    return (
      <AppShell profile={profile}>
        <p>Aula não encontrada.</p>
      </AppShell>
    );
  }

  const item = lesson as Lesson;

  return (
    <AppShell profile={profile}>
      <article className="mx-auto max-w-4xl">
        <LinkButton href={`/courses/${id}`} variant="secondary">Voltar ao curso</LinkButton>
        <div className="mt-6 rounded-2xl border border-premium-line/70 bg-gradient-to-b from-premium-base/60 to-premium-surface/55 p-6 sm:p-8">
          <h1 className="text-3xl font-semibold">{item.title}</h1>
          {item.video_url ? (
            <a className="mt-6 flex items-center gap-3 rounded-md border border-premium-cyan/35 bg-premium-cyan/15 p-4 text-cyan-100" href={item.video_url} target="_blank">
              <Video className="size-5" />
              Abrir vídeo externo
            </a>
          ) : null}
          {item.video_file_url ? (
            <video className="mt-6 w-full rounded-lg border border-white/10" src={item.video_file_url} controls />
          ) : null}
          {item.image_url ? (
            <div className="relative mt-6 aspect-video overflow-hidden rounded-lg border border-white/10">
              <Image src={item.image_url} alt="" fill className="object-cover" />
            </div>
          ) : null}
          {item.pdf_url ? (
            <a className="mt-6 flex items-center gap-3 rounded-md border border-premium-line/70 bg-premium-base/45 p-4 text-slate-100" href={item.pdf_url} target="_blank">
              <FileText className="size-5 text-premium-gold" />
              Abrir PDF da aula
            </a>
          ) : null}
          <div className="prose prose-invert mt-8 max-w-none whitespace-pre-wrap leading-8 text-slate-200">
            {item.content || "Esta aula ainda não possui conteúdo em texto."}
          </div>
          <form action={completeLesson} className="mt-8">
            <input type="hidden" name="course_id" value={id} />
            <input type="hidden" name="lesson_id" value={lessonId} />
            <Button type="submit" variant="accent">
              <CheckCircle2 className="size-4" />
              Marcar como concluída
            </Button>
          </form>
        </div>
      </article>
    </AppShell>
  );
}
