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
      <h1 className="mb-6 font-display text-4xl font-semibold">Usuarios</h1>
      <div className="overflow-hidden rounded-2xl border border-premium-line/70 bg-premium-base/35">
        <div className="hidden grid-cols-[1.4fr_0.8fr_0.8fr_1.4fr] gap-4 border-b border-premium-line/70 bg-premium-surface/45 p-4 text-sm text-slate-300 md:grid">
          <span>Membro</span>
          <span>Status</span>
          <span>Role</span>
          <span>Ações</span>
        </div>
        {(users as Profile[] | null)?.map((user) => (
            <div key={user.id} className="grid gap-4 border-b border-premium-line/70 p-4 last:border-b-0 md:grid-cols-[1.4fr_0.8fr_0.8fr_1.4fr] md:items-center">
              <div>
                <p className="font-semibold">{user.full_name ?? "Sem nome"}</p>
                <p className="text-sm text-slate-300">{user.email}</p>
              </div>
            <p className="text-sm">{statusLabel(user.status)}</p>
            <p className="text-sm">{roleLabel(user.role)}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              <form action={updateUserStatus} className="flex gap-2">
                <input type="hidden" name="id" value={user.id} />
                <Select label="Status" name="status" defaultValue={user.status}>
                  <option value="pending">Pendente</option>
                  <option value="approved">Aprovado</option>
                  <option value="rejected">Rejeitado</option>
                </Select>
                <Button className="self-end" type="submit" variant="secondary">Salvar</Button>
              </form>
              <form action={updateUserRole} className="flex gap-2">
                <input type="hidden" name="id" value={user.id} />
                <Select label="Role" name="role" defaultValue={user.role}>
                  <option value="member">Membro</option>
                  <option value="leader">Lider</option>
                  <option value="admin">Admin</option>
                </Select>
                <Button className="self-end" type="submit" variant="accent" disabled={profile.role !== "admin"}>Promover</Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
