import { getCurrentProfile } from "@/lib/auth";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";

export default async function HomePage() {
  const profile = await getCurrentProfile();

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-background selection:bg-brand-primary/30 selection:text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[620px] w-[920px] -translate-x-1/2 rounded-full bg-brand-primary/10 blur-[140px]" />
        <div className="absolute -left-24 top-72 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="absolute -right-20 bottom-40 h-[520px] w-[520px] rounded-full bg-brand-secondary/10 blur-[130px]" />
      </div>
      <Navbar profile={profile} />
      
      <div className="flex flex-col gap-0">
        <Hero />
      </div>
    </main>
  );
}
