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
      <p className="mt-6 text-sm text-brand-muted">
        Ainda não tem conta? <Link className="text-brand-primary font-bold hover:underline" href="/register">Criar conta</Link>
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
    <main className="grid min-h-screen place-items-center px-4 py-10 bg-brand-background bg-mesh">
      <div className="w-full max-w-md rounded-3xl border border-white/5 bg-brand-card/40 p-8 shadow-halo backdrop-blur-xl">
        <Link href="/" className="mb-8 block">
           <div className="flex items-center gap-3">
              <div className="grid size-8 place-items-center rounded-lg border border-white/20 bg-brand-surface font-bold text-white text-xs">LA</div>
              <span className="text-sm font-bold text-white tracking-tight">Loading Academy</span>
           </div>
        </Link>
        <h1 className="font-display text-4xl font-bold text-white">{title}</h1>
        <p className="mt-2 text-sm text-brand-muted">Formação ministerial digital</p>
        {message ? <p className="my-5 rounded-xl border border-brand-primary/40 bg-brand-primary/10 p-4 text-sm text-white">{message}</p> : <div className="h-6" />}
        {children}
      </div>
    </main>
  );
}
