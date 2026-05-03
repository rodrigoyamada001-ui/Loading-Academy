import { AdminNav } from "@/components/admin-nav";
import { AppShell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/field";
import { updateUserRole, updateUserStatus } from "@/lib/actions/admin";
import { requireAdminRole } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { roleLabel, statusLabel } from "@/lib/utils";
import type { Profile } from "@/lib/types";

export default async function AdminUsersPage() {
  const profile = await requireAdminRole();
  const supabase = await createClient();
  const { data: users } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });

  return (
    <AppShell profile={profile}>
      <AdminNav />
      <h1 className="mb-8 font-display text-4xl font-bold text-white">Usuários</h1>
      <div className="overflow-hidden rounded-3xl border border-white/5 bg-brand-card/40 backdrop-blur-md">
        <div className="hidden grid-cols-[1.5fr_0.7fr_0.7fr_2fr] gap-4 border-b border-white/5 bg-white/5 p-5 text-xs font-bold uppercase tracking-widest text-brand-muted md:grid">
          <span>Membro</span>
          <span>Status</span>
          <span>Role</span>
          <span className="text-right px-4">Ações</span>
        </div>
        {(users as Profile[] | null)?.map((user) => (
            <div key={user.id} className="grid gap-6 border-b border-white/5 p-6 last:border-b-0 md:grid-cols-[1.5fr_0.7fr_0.7fr_2fr] md:items-center hover:bg-white/[0.02] transition-colors">
              <div>
                <p className="font-bold text-white text-lg">{user.full_name ?? "Sem nome"}</p>
                <p className="text-xs text-brand-muted">{user.email}</p>
              </div>
            <div className="flex">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                user.status === 'approved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                user.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {statusLabel(user.status)}
              </span>
            </div>
            <div className="flex">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                {roleLabel(user.role)}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-end justify-end gap-3">
              <form action={updateUserStatus} className="flex items-center gap-2">
                <input type="hidden" name="id" value={user.id} />
                <select 
                  name="status" 
                  defaultValue={user.status}
                  className="h-10 rounded-xl border border-white/10 bg-brand-background px-3 text-xs text-white outline-none focus:border-brand-primary/50 transition-all"
                >
                  <option value="pending">Pendente</option>
                  <option value="approved">Aprovado</option>
                  <option value="rejected">Rejeitado</option>
                </select>
                <Button className="h-10 px-4 rounded-xl text-xs font-bold" type="submit" variant="secondary">Salvar</Button>
              </form>
              <form action={updateUserRole} className="flex items-center gap-2">
                <input type="hidden" name="id" value={user.id} />
                <select 
                  name="role" 
                  defaultValue={user.role}
                  className="h-10 rounded-xl border border-white/10 bg-brand-background px-3 text-xs text-white outline-none focus:border-brand-primary/50 transition-all"
                >
                  <option value="member">Membro</option>
                  <option value="admin">Admin</option>
                </select>
                <Button className="h-10 px-4 rounded-xl text-xs font-bold" type="submit" variant="primary" disabled={profile.role !== "admin"}>Promover</Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
