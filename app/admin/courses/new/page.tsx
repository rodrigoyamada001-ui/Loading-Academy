import { AdminNav } from "@/components/admin-nav";
import { AppShell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Field, Select, TextArea } from "@/components/ui/field";
import { createCourse } from "@/lib/actions/admin";
import { requireAdminRole } from "@/lib/auth";

export default async function NewCoursePage() {
  const profile = await requireAdminRole();

  return (
    <AppShell profile={profile}>
      <AdminNav />
      <div className="mx-auto max-w-3xl rounded-2xl border border-premium-line/70 bg-gradient-to-b from-premium-base/60 to-premium-surface/55 p-6">
        <h1 className="font-display text-4xl font-semibold">Novo curso</h1>
        <form action={createCourse} className="mt-6 grid gap-4">
          <Field label="Título" name="title" required />
          <TextArea label="Descrição" name="description" required />
          <div className="grid gap-4 sm:grid-cols-3">
            <Select label="Status" name="status" defaultValue="draft">
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="inactive">Inativo</option>
            </Select>
            <Select label="Nível" name="level" defaultValue="basic">
              <option value="basic">Básico</option>
              <option value="intermediate">Intermediário</option>
              <option value="leadership">Liderança</option>
            </Select>
            <Select label="Acesso" name="access_mode" defaultValue="all">
              <option value="all">Todos aprovados</option>
              <option value="specific">Usuários específicos</option>
            </Select>
          </div>
          <Field label="Imagem de capa" name="cover" type="file" />
          <div className="flex gap-2">
            <Button type="submit" variant="secondary" name="status" value="draft">Salvar rascunho</Button>
            <Button type="submit">Publicar</Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
