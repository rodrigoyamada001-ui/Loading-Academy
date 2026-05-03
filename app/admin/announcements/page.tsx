import { AdminNav } from "@/components/admin-nav";
import { AppShell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Field, TextArea } from "@/components/ui/field";
import { createAnnouncement } from "@/lib/actions/admin";
import { requireAdminRole } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { Announcement } from "@/lib/types";

export default async function AnnouncementsPage() {
  const profile = await requireAdminRole();
  const supabase = await createClient();
  const { data: announcements } = await supabase.from("announcements").select("*").order("created_at", { ascending: false });

  return (
    <AppShell profile={profile}>
      <AdminNav />
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-2xl border border-premium-line/70 bg-gradient-to-b from-premium-base/60 to-premium-surface/55 p-6">
          <h1 className="font-display text-4xl font-semibold">Novo aviso</h1>
          <form action={createAnnouncement} className="mt-6 grid gap-4">
            <Field label="Título" name="title" required />
            <TextArea label="Mensagem" name="body" required />
              <label className="flex items-center gap-2 text-sm text-slate-200">
                <input name="is_active" type="checkbox" defaultChecked />
                Publicar agora
              </label>
            <Button type="submit" variant="accent">Publicar aviso</Button>
          </form>
        </section>
        <section className="rounded-2xl border border-premium-line/70 bg-premium-base/45 p-6">
          <h2 className="text-xl font-semibold">Avisos publicados</h2>
          <div className="mt-5 grid gap-3">
            {(announcements as Announcement[] | null)?.length ? (announcements as Announcement[]).map((item) => (
              <article key={item.id} className="rounded-xl border border-premium-line/70 bg-premium-base/45 p-4">
                <p className="text-xs text-slate-500">{item.is_active ? "Ativo" : "Inativo"}</p>
                <h3 className="mt-1 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.body}</p>
              </article>
            )) : <p className="text-sm text-slate-400">Nenhum aviso cadastrado.</p>}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
