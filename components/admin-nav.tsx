import { BookOpen, Megaphone, Plus, Users } from "lucide-react";
import { LinkButton } from "@/components/ui/button";

export function AdminNav() {
  return (
    <div className="mb-8 flex flex-wrap gap-2 rounded-xl border border-premium-line/60 bg-premium-base/40 p-3">
      <LinkButton href="/admin/users" variant="secondary">
        <Users className="size-4" />
        Usuários
      </LinkButton>
      <LinkButton href="/admin/courses" variant="secondary">
        <BookOpen className="size-4" />
        Cursos
      </LinkButton>
      <LinkButton href="/admin/courses/new" variant="accent">
        <Plus className="size-4" />
        Novo curso
      </LinkButton>
      <LinkButton href="/admin/announcements" variant="secondary">
        <Megaphone className="size-4" />
        Avisos
      </LinkButton>
    </div>
  );
}
