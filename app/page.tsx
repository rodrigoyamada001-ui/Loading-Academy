import { getCurrentProfile } from "@/lib/auth";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Footer } from "@/components/landing/Footer";

export default async function HomePage() {
  const profile = await getCurrentProfile();

  return (
    <main className="min-h-screen bg-brand-background selection:bg-brand-primary/30 selection:text-white">
      <Navbar profile={profile} />
      
      <div className="flex flex-col gap-0">
        <Hero />
        {/* Aqui você pode adicionar a listagem real de cursos se desejar */}
        <Footer />
      </div>
    </main>
  );
}
