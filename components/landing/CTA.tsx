import { ArrowRight, Crown } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="bg-gradient-to-br from-brand-surface to-brand-background rounded-3xl border border-white/5 p-12 shadow-halo relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 left-0 w-full h-full bg-mesh opacity-20 -z-10" />
          
          <div className="flex items-center gap-6">
            <div className="size-16 rounded-2xl bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center">
              <Crown className="size-8 text-brand-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-display text-white mb-2">Você está pronto para ser preparado?</h2>
              <p className="text-brand-muted">Mergulhe em uma jornada de transformação e capacitação ministerial.</p>
            </div>
          </div>
          
          <Link href="/register" className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-10 py-5 rounded-full font-semibold transition-all shadow-glow whitespace-nowrap">
            Começar agora <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
