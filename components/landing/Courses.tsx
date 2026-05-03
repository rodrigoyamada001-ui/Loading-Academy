import Link from "next/link";
import { ChevronRight, Book, Crown, Users, Heart } from "lucide-react";
import Image from "next/image";

const courses = [
  {
    id: 1,
    title: "Fundamentos da Fé",
    description: "Princípios essenciais para uma vida cristã sólida.",
    progress: 64,
    icon: Book,
    image: "https://images.unsplash.com/photo-1504052434139-a818ad367e22?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Liderança Ministerial",
    description: "Desenvolva habilidades e caráter para liderar.",
    progress: 42,
    icon: Crown,
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Discipulado",
    description: "Aprenda a fazer discípulos e gerar multiplicação.",
    progress: 28,
    icon: Users,
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Vida com Deus",
    description: "Fortaleça sua vida devocional e intimidade com Deus.",
    progress: 72,
    icon: Heart,
    image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=800&auto=format&fit=crop",
  },
];

export function Courses() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-display text-white">Cursos disponíveis</h2>
          <Link href="/courses" className="flex items-center gap-1 text-sm text-brand-muted hover:text-white transition-colors">
            Ver todos os cursos <ChevronRight className="size-4" />
          </Link>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="group relative bg-brand-card rounded-2xl border border-white/5 overflow-hidden hover:border-brand-primary/30 transition-all shadow-halo">
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/40 to-transparent" />
              </div>
              
              <div className="p-6 relative -mt-12">
                <div className="size-10 rounded-xl bg-brand-secondary/20 border border-brand-secondary/30 flex items-center justify-center mb-4 backdrop-blur-md">
                  <course.icon className="size-5 text-brand-secondary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                <p className="text-xs text-brand-muted leading-relaxed mb-6 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-brand-muted">{course.progress}% concluído</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-primary" 
                      style={{ width: `${course.progress}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
