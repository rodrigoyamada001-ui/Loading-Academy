import { BookOpen, Megaphone, Plus, Users } from "lucide-react";
import { LinkButton } from "@/components/ui/button";

export function AdminNav() {
  return (
    <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-white/5 bg-brand-card/40 p-3 backdrop-blur-md">
      <LinkButton href="/admin/users" variant="secondary" className="rounded-xl">
        <Users className="size-4" />
        Usuários
      </LinkButton>
      <LinkButton href="/admin/courses" variant="secondary" className="rounded-xl">
        <BookOpen className="size-4" />
        Cursos
      </LinkButton>
      <LinkButton href="/admin/courses/new" variant="primary" className="rounded-xl shadow-glow">
        <Plus className="size-4" />
        Novo curso
      </LinkButton>
      <LinkButton href="/admin/announcements" variant="secondary" className="rounded-xl">
        <Megaphone className="size-4" />
        Avisos
      </LinkButton>
    </div>
  );
}
