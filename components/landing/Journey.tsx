import { BookOpen, Leaf, Crown, Heart, Users } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Fundamentos",
    description: "Base sólida",
    icon: BookOpen,
  },
  {
    number: "02",
    title: "Crescimento",
    description: "Desenvolvimento",
    icon: Leaf,
  },
  {
    number: "03",
    title: "Liderança",
    description: "Capacitação",
    icon: Crown,
  },
  {
    number: "04",
    title: "Serviço",
    description: "Colocar em prática",
    icon: Heart,
  },
  {
    number: "05",
    title: "Multiplicação",
    description: "Impacto e legado",
    icon: Users,
  },
];

export function Journey() {
  return (
    <section className="py-20 bg-brand-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display text-white">Sua jornada de formação</h2>
        </div>
        
        <div className="relative flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Connector line */}
          <div className="absolute top-10 left-0 w-full h-px bg-white/5 hidden md:block" />
          
          {steps.map((step, idx) => (
            <div key={step.number} className="relative z-10 flex flex-col items-center text-center w-full">
              <div className="size-20 rounded-full bg-brand-card border border-white/10 flex items-center justify-center mb-6 shadow-card-glow group hover:border-brand-primary/50 transition-all cursor-default">
                <step.icon className="size-8 text-brand-muted group-hover:text-brand-primary transition-colors" />
              </div>
              <p className="text-sm font-bold text-brand-primary mb-1">{step.number}</p>
              <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
              <p className="text-xs text-brand-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
