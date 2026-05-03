import Link from "next/link";
import { LASquare } from "./Logo";
import type { Profile } from "@/lib/types";

export function Navbar({ profile }: { profile: Profile | null }) {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-brand-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="shrink-0">
            <LASquare />
          </Link>
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-none text-white">Loading Academy</p>
            <p className="text-[10px] text-brand-muted">Formação ministerial digital</p>
          </div>
        </div>
        
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm text-brand-muted hover:text-white transition-colors">Início</Link>
          <Link href="/courses" className="text-sm text-brand-muted hover:text-white transition-colors">Cursos</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white hover:border-brand-primary/60 hover:text-brand-primary transition-colors">
            Entrar
          </Link>
          <Link href="/register" className="rounded-full bg-brand-primary px-5 py-2 text-sm font-semibold text-white hover:bg-brand-primary/90 transition-all shadow-glow">
            Cadastrar
          </Link>
          {profile && (
            <Link href="/dashboard" className="hidden rounded-full border border-brand-primary/40 bg-brand-primary/10 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-primary/20 transition-all md:inline-flex">
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
