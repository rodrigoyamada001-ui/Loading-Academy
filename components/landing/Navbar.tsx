import Link from "next/link";
import { LASquare } from "./Logo";

export function Navbar({ profile }: { profile: any }) {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-brand-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <LASquare />
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-none text-white">Loading Academy</p>
            <p className="text-[10px] text-brand-muted">Formação ministerial digital</p>
          </div>
        </div>
        
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm text-brand-muted hover:text-white transition-colors">Início</Link>
          <Link href="/courses" className="text-sm text-brand-muted hover:text-white transition-colors">Cursos</Link>
        </div>

        <div className="flex items-center gap-4">
          {profile ? (
            <Link href="/dashboard" className="rounded-full bg-brand-primary px-6 py-2 text-sm font-medium text-white hover:bg-brand-primary/90 transition-all">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-white hover:text-brand-primary transition-colors">
                Entrar
              </Link>
              <Link href="/register" className="rounded-full bg-brand-primary px-6 py-2 text-sm font-medium text-white hover:bg-brand-primary/90 transition-all shadow-glow">
                Criar conta
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
