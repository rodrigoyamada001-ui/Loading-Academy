import Link from "next/link";
import { signInAction, resetPasswordAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

export default function LoginPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  return (
    <AuthFrame title="Entrar" messagePromise={searchParams}>
      <form action={signInAction} className="grid gap-4">
        <Field label="E-mail" name="email" type="email" required />
        <Field label="Senha" name="password" type="password" required />
        <Button type="submit">Entrar</Button>
      </form>
      <form action={resetPasswordAction} className="mt-6 grid gap-3 border-t border-white/10 pt-6">
        <Field label="Recuperar senha por e-mail" name="email" type="email" required />
        <Button type="submit" variant="secondary">Enviar recuperação</Button>
      </form>
      <p className="mt-6 text-sm text-slate-300">
        Ainda nao tem conta? <Link className="text-premium-cyan underline" href="/register">Criar conta</Link>
      </p>
    </AuthFrame>
  );
}

async function AuthFrame({
  title,
  messagePromise,
  children
}: {
  title: string;
  messagePromise: Promise<{ message?: string }>;
  children: React.ReactNode;
}) {
  const { message } = await messagePromise;
  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-premium-line/70 bg-gradient-to-b from-premium-base/75 to-premium-surface/65 p-7 shadow-halo">
        <Link href="/" className="mb-8 block text-sm font-semibold text-slate-200">Loading Academy</Link>
        <h1 className="font-display text-4xl font-semibold">{title}</h1>
        <p className="mt-2 text-sm text-slate-300">Preparing the next generation</p>
        {message ? <p className="my-5 rounded-md border border-premium-cyan/40 bg-premium-cyan/15 p-3 text-sm text-cyan-100">{message}</p> : <div className="h-6" />}
        {children}
      </div>
    </main>
  );
}
