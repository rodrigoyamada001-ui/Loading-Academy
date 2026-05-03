import Link from "next/link";
import { signUpAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const { message } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10 bg-brand-background bg-mesh">
      <div className="w-full max-w-md rounded-3xl border border-white/5 bg-brand-card/40 p-8 shadow-halo backdrop-blur-xl">
        <Link href="/" className="mb-8 block">
           <div className="flex items-center gap-3">
              <div className="grid size-8 place-items-center rounded-lg border border-white/20 bg-brand-surface font-bold text-white text-xs">LA</div>
              <span className="text-sm font-bold text-white tracking-tight">Loading Academy</span>
           </div>
        </Link>
        <h1 className="font-display text-4xl font-bold text-white">Criar conta</h1>
        <p className="mt-2 text-sm text-brand-muted">Seu acesso ficará pendente até aprovação da liderança.</p>
        
        {message ? (
          <p className="my-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
            {message}
          </p>
        ) : (
          <div className="h-6" />
        )}

        <form action={signUpAction} className="grid gap-4">
          <Field label="Nome completo" name="full_name" required />
          <Field label="E-mail" name="email" type="email" required />
          <Field label="Senha" name="password" type="password" required />
          <Button type="submit" className="rounded-xl h-12 font-bold shadow-glow">Criar conta</Button>
        </form>

        <p className="mt-6 text-sm text-brand-muted">
          Já tem conta? <Link className="text-brand-primary font-bold hover:underline" href="/login">Entrar</Link>
        </p>
      </div>
    </main>
  );
}
