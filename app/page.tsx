import { ArrowRight, LogIn, Sparkles } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { getCurrentProfile } from "@/lib/auth";

export default async function HomePage() {
  const profile = await getCurrentProfile();

  return (
    <main className="min-h-screen overflow-hidden">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-md border border-premium-cyan/40 bg-premium-base/60 font-bold text-premium-cyan">LA</div>
          <div>
            <p className="text-sm font-semibold">Loading Academy</p>
            <p className="text-xs text-slate-300">Formacao ministerial digital</p>
          </div>
        </div>
        <div className="flex gap-2">
          {profile ? (
            <LinkButton href="/dashboard" variant="primary">Dashboard</LinkButton>
          ) : (
            <>
              <LinkButton href="/login" variant="secondary">Entrar</LinkButton>
              <LinkButton href="/register" variant="primary">Criar conta</LinkButton>
            </>
          )}
        </div>
      </nav>

      <section className="mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl items-center px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-premium-cyan/35 bg-premium-base/55 px-4 py-2 text-sm text-premium-mist">
            <Sparkles className="size-4 text-premium-gold" />
            Escola digital para formacao crista
          </div>
          <h1 className="text-balance font-display text-6xl leading-[0.95] tracking-tight text-white sm:text-8xl">
            Lideres preparados com profundidade e excelencia
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-8 text-premium-mist">
            Preparing the next generation
          </p>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            Um ambiente completo para trilhas de formacao, conteudo em video e PDF, acompanhamento de progresso e governo pastoral com padrao premium.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/login" variant="primary">
              <LogIn className="size-4" />
              Entrar
            </LinkButton>
            <LinkButton href="/register" variant="secondary">
              Criar conta
              <ArrowRight className="size-4" />
            </LinkButton>
          </div>
        </div>

        <div className="mt-12 lg:mt-0">
          <div className="relative min-h-[440px] overflow-hidden rounded-2xl border border-premium-line/70 bg-[radial-gradient(circle_at_26%_20%,rgba(94,234,212,0.24),transparent_22rem),radial-gradient(circle_at_85%_34%,rgba(246,196,83,0.2),transparent_20rem),linear-gradient(145deg,#07111f,#102238_62%,#07111f)] p-6 shadow-halo">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(94,234,212,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(94,234,212,0.08)_1px,transparent_1px)] bg-[size:48px_48px] opacity-45" />
            <div className="relative grid h-full gap-4">
              <div className="rounded-xl border border-premium-cyan/25 bg-premium-base/40 p-5">
                <p className="text-sm text-slate-300">Painel executivo</p>
                <p className="mt-3 text-3xl font-semibold text-white">Formacao, disciplina e progresso</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["Aprovacao", "Progresso", "PDF", "Video"].map((item) => (
                  <div key={item} className="rounded-xl border border-premium-line/80 bg-premium-base/45 p-4">
                    <p className="text-sm text-slate-300">{item}</p>
                    <div className="mt-4 h-2 rounded-full bg-white/10">
                      <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-premium-cyan to-premium-gold" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-premium-gold/40 bg-premium-gold/15 p-5 text-premium-mist">
                <p className="text-sm font-semibold">Preparing the next generation</p>
                <p className="mt-2 text-sm text-slate-200">Formacao com excelencia, ordem e acompanhamento continuo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
