import { ArrowRight, BookOpen, Route, Clock, Shield, Lock } from "lucide-react";
import { AppShell } from "@/components/shell";
import { requireUser } from "@/lib/auth";
import { getAccessiblePublishedCourses } from "@/lib/courses";
import { LinkButton } from "@/components/ui/button";

export default async function DashboardPage() {
  const profile = await requireUser();
  const approved = profile.status === "approved";
  const courses = approved ? await getAccessiblePublishedCourses(profile.id) : [];

  return (
    <AppShell profile={profile}>
      <div className="space-y-8">
        {/* Hero Section Dashboard */}
        <section className="relative flex flex-col lg:flex-row items-center justify-between gap-12 py-10">
          <div className="max-w-xl text-center lg:text-left z-10">
            {!approved && (
              <div className="mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                <Shield className="size-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Aguardando aprovação</span>
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
              Bem-vindo(a) à <br />
              <span className="text-brand-primary">Loading Academy</span>
            </h1>
            <p className="text-brand-muted text-lg leading-relaxed mb-8">
              {approved 
                ? "Este é o seu ambiente de formação. Seus cursos e progresso aparecem aqui."
                : "Sua conta foi criada com sucesso! Assim que a liderança aprovar seu acesso, seus cursos aparecerão aqui."
              }
            </p>
          </div>

          {/* Pedestal with LA Logo */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
            {/* Pedestal Base */}
            <div className="absolute bottom-0 w-48 h-8 bg-gradient-to-t from-brand-surface to-brand-card rounded-[50%] border-b-4 border-black/50 shadow-halo" />
            <div className="absolute bottom-4 w-40 h-6 bg-gradient-to-t from-brand-surface to-brand-card rounded-[50%] border-b-4 border-black/50" />
            
            {/* Glow */}
            <div className="absolute bottom-10 size-32 bg-brand-primary/40 blur-[50px] rounded-full animate-pulse" />
            
            {/* 3D Logo Card */}
            <div className="relative size-32 sm:size-40 bg-brand-card border border-white/10 rounded-2xl flex items-center justify-center shadow-halo transform -rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand-primary/5 mix-blend-overlay" />
            </div>
          </div>
        </section>

        {/* Grid Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* My Courses Card */}
          <div className="bg-brand-card/40 border border-white/5 rounded-3xl p-8 shadow-halo group hover:border-brand-primary/30 transition-all">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="size-5 text-brand-secondary" />
              <h2 className="text-xl font-bold text-white">Meus cursos</h2>
            </div>
            
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="size-20 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center mb-6">
                <BookOpen className="size-8 text-brand-muted" />
              </div>
              <p className="text-sm font-bold text-white mb-1">Nenhum curso disponível no momento</p>
              <p className="text-xs text-brand-muted">A liderança adicionará novos conteúdos em breve.</p>
            </div>
          </div>

          {/* Training Tracks Card */}
          <div className="bg-brand-card/40 border border-white/5 rounded-3xl p-8 shadow-halo group hover:border-brand-primary/30 transition-all">
            <div className="flex items-center gap-3 mb-8">
              <Route className="size-5 text-brand-secondary" />
              <h2 className="text-xl font-bold text-white">Trilhas de formação</h2>
            </div>
            
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="size-20 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center mb-6">
                <Route className="size-8 text-brand-muted" />
              </div>
              <p className="text-sm font-bold text-white mb-1">Trilhas de formação serão organizadas aqui</p>
              <p className="text-xs text-brand-muted">Quando os módulos forem cadastrados, você poderá acompanhar sua jornada.</p>
            </div>
          </div>
        </div>

        {/* Continue Studying Section */}
        <div className="bg-brand-card/40 border border-white/5 rounded-3xl p-8 shadow-halo">
          <div className="flex items-center gap-3 mb-8">
            <Clock className="size-5 text-brand-secondary" />
            <h2 className="text-xl font-bold text-white">Continuar estudando</h2>
          </div>
          
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="size-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Clock className="size-6 text-brand-muted" />
            </div>
            <p className="text-sm font-bold text-white mb-1">Nenhum conteúdo iniciado ainda</p>
            <p className="text-xs text-brand-muted">Após acessar um curso, seu progresso aparecerá aqui.</p>
          </div>
        </div>

        {/* Exclusive Content Banner */}
        <div className="bg-gradient-to-r from-brand-surface to-brand-card border border-white/5 rounded-3xl p-8 flex items-center justify-between relative overflow-hidden group">
          <div className="flex items-center gap-6 relative z-10">
            <div className="size-14 rounded-2xl bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center">
              <Shield className="size-6 text-brand-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Conteúdo exclusivo para membros</h3>
              <p className="text-xs text-brand-muted">Todos os materiais são preparados com excelência para o seu crescimento espiritual e ministerial.</p>
            </div>
          </div>
          <Lock className="size-12 text-white/5 absolute right-8 group-hover:text-white/10 transition-colors" />
        </div>
      </div>
    </AppShell>
  );
}
