import Link from "next/link";
import { signUpAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const { message } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-premium-line/70 bg-gradient-to-b from-premium-base/75 to-premium-surface/65 p-7 shadow-halo">
        <Link href="/" className="mb-8 block text-sm font-semibold text-slate-200">Loading Academy</Link>
        <h1 className="font-display text-4xl font-semibold">Criar conta</h1>
        <p className="mt-2 text-sm text-slate-300">Seu acesso ficara pendente ate aprovacao da lideranca.</p>
        {message ? <p className="my-5 rounded-md border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100">{message}</p> : <div className="h-6" />}
        <form action={signUpAction} className="grid gap-4">
          <Field label="Nome completo" name="full_name" required />
          <Field label="E-mail" name="email" type="email" required />
          <Field label="Senha" name="password" type="password" required />
          <Button type="submit">Criar conta</Button>
        </form>
        <p className="mt-6 text-sm text-slate-300">
          Ja tem conta? <Link className="text-premium-cyan underline" href="/login">Entrar</Link>
        </p>
      </div>
    </main>
  );
}
