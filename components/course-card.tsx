import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Course } from "@/lib/types";
import { LinkButton } from "@/components/ui/button";
import { formatPercent, statusLabel } from "@/lib/utils";

export function CourseCard({ course, progress = 0, href }: { course: Course; progress?: number; href: string }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-premium-line/70 bg-gradient-to-b from-premium-base/60 to-premium-surface/55 shadow-halo">
      <div className="relative aspect-[16/9] bg-gradient-to-br from-premium-base via-slate-900 to-premium-surface">
        {course.cover_url ? (
          <Image alt="" src={course.cover_url} fill className="object-cover" />
        ) : (
          <div className="grid h-full place-items-center text-slate-200">
            <BookOpen className="size-10" />
          </div>
        )}
      </div>
      <div className="grid gap-4 p-5">
        <div>
          <div className="mb-2 flex flex-wrap gap-2 text-xs">
            <span className="rounded-md border border-premium-line/80 bg-premium-base/55 px-2 py-1 text-slate-200">{statusLabel(course.level)}</span>
            <span className="rounded-md border border-premium-line/80 bg-premium-base/55 px-2 py-1 text-slate-200">{statusLabel(course.status)}</span>
          </div>
          <h3 className="text-lg font-semibold">{course.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-300">{course.description}</p>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-premium-cyan to-premium-gold" style={{ width: formatPercent(progress) }} />
        </div>
        <LinkButton href={href} variant="secondary" className="w-full">
          Acessar curso
          <ArrowRight className="size-4" />
        </LinkButton>
      </div>
    </article>
  );
}
