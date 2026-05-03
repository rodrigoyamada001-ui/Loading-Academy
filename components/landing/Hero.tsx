import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-mesh -z-10" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand-primary/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-secondary/10 blur-[100px] rounded-full -z-10" />

      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-brand-secondary font-bold mb-6">
            <span className="size-1.5 rounded-full bg-brand-secondary animate-pulse" />
            Escola digital para formação cristã
          </div>
          
          <h1 className="text-6xl sm:text-7xl font-display leading-[0.9] text-white mb-6">
            Líderes preparados com <br />
            <span className="text-brand-primary">profundidade e excelência</span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl font-medium text-white/90 mb-6">
            Formação ministerial completa em um ambiente premium.
          </h2>
          
          <p className="text-lg text-brand-muted leading-relaxed mb-10 max-w-lg">
            Um ambiente completo para trilhas de formação, conteúdo em vídeo e PDF, acompanhamento de progresso e governo pastoral.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/register" className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-glow">
              Começar jornada <ArrowRight className="size-4" />
            </Link>
            <Link href="/login" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full font-semibold transition-all">
              Acessar plataforma
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[500px] aspect-square">
            {/* Abstract Premium Visual */}
            <div className="absolute inset-0 bg-brand-card rounded-3xl border border-white/5 shadow-halo overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-mesh opacity-20" />
              <div className="text-center p-8 relative z-10">
                <div className="size-20 rounded-2xl bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-brand-primary">LA</span>
                </div>
                <h3 className="text-2xl font-display text-white mb-2">Plataforma Exclusiva</h3>
                <p className="text-sm text-brand-muted">Acesse seus conteúdos ministerial com segurança e organização.</p>
              </div>
            </div>
            
            {/* Floating element */}
            <div className="absolute -bottom-6 -left-6 bg-brand-surface/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-glow hidden sm:block">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full bg-brand-primary/20 flex items-center justify-center">
                  <span className="text-brand-primary font-bold">✓</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Pronto para começar</p>
                  <p className="text-[10px] text-brand-muted">Sua conta está ativa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
