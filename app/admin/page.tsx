import { BookOpen, Megaphone, Users } from "lucide-react";
import { AdminNav } from "@/components/admin-nav";
import { AppShell } from "@/components/shell";
import { requireAdminRole } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const profile = await requireAdminRole();
  const supabase = await createClient();
  const [{ count: users }, { count: courses }, { count: announcements }] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("courses").select("*", { count: "exact", head: true }),
    supabase.from("announcements").select("*", { count: "exact", head: true })
  ]);

  return (
    <AppShell profile={profile}>
      <AdminNav />
      <div className="mb-8">
        <p className="text-sm text-slate-300">Painel Administrativo</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Gestao da Loading Academy</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Metric icon={<Users className="size-6" />} label="Usuários" value={users ?? 0} />
        <Metric icon={<BookOpen className="size-6" />} label="Cursos" value={courses ?? 0} />
        <Metric icon={<Megaphone className="size-6" />} label="Avisos" value={announcements ?? 0} />
      </div>
    </AppShell>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-premium-line/70 bg-gradient-to-b from-premium-base/60 to-premium-surface/55 p-5">
      <div className="mb-4 text-premium-cyan">{icon}</div>
      <p className="text-sm text-slate-300">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}
