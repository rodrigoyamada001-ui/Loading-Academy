import { Trophy, Flame, Star } from "lucide-react";
import Link from "next/link";

export function Progress() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="bg-brand-card/50 rounded-3xl border border-white/5 p-12 shadow-halo relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[100px] rounded-full" />
          
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-3xl font-display text-white mb-8">Seu progresso</h2>
              <div className="relative size-40">
                <svg className="size-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" stroke="currentColor" 
                    strokeWidth="8" className="text-white/5" 
                  />
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" stroke="currentColor" 
                    strokeWidth="8" strokeDasharray="282.7" 
                    strokeDashoffset="90" 
                    strokeLinecap="round" 
                    className="text-brand-primary" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-white">68%</span>
                </div>
              </div>
              <div className="mt-6 text-center md:text-left">
                <p className="text-sm font-bold text-white">Progresso geral</p>
                <p className="text-xs text-brand-muted">Você está no caminho certo!</p>
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-muted font-bold mb-3">Último acesso</p>
                <h3 className="text-xl font-bold text-white mb-2">Lição 03</h3>
                <p className="text-sm text-brand-muted mb-4">Chamado e Propósito</p>
                <Link href="/courses" className="text-xs font-bold text-brand-primary hover:underline">Continuar lendo →</Link>
              </div>
              
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-muted font-bold mb-3">Próxima etapa</p>
                <h3 className="text-xl font-bold text-white mb-2">Lição 04</h3>
                <p className="text-sm text-brand-muted mb-4">Propósito e Destino</p>
                <Link href="/courses" className="text-xs font-bold text-brand-primary hover:underline">Continuar jornada →</Link>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-8">
              <p className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Conquistas</p>
              <div className="flex gap-4">
                {[Star, Flame, Trophy].map((Icon, i) => (
                  <div key={i} className="size-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group hover:border-brand-primary/50 transition-all">
                    <Icon className="size-6 text-brand-muted group-hover:text-brand-gold transition-colors" />
                  </div>
                ))}
              </div>
              <Link href="/dashboard" className="text-xs font-bold text-brand-muted hover:text-white transition-colors">Ver todas →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
