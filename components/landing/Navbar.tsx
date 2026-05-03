import Link from "next/link";
import { LASquare } from "./Logo";
import type { Profile } from "@/lib/types";

export function Navbar({ profile }: { profile: Profile | null }) {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-brand-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 shrink-0 hover:opacity-80 transition-opacity">
          <LASquare />
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-none text-white">Loading Academy</p>
            <p className="text-[10px] text-brand-muted">Formação ministerial digital</p>
          </div>
        </Link>
        
        <div className="flex items-center gap-3">
          {profile ? (
            <Link href="/dashboard" className="rounded-full bg-brand-primary px-6 py-2 text-sm font-semibold text-white hover:bg-brand-primary/90 transition-all shadow-glow">
              Painel
            </Link>
          ) : (
            <>
              <Link href="/login" className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white hover:border-brand-primary/60 hover:text-brand-primary transition-colors">
                Entrar
              </Link>
              <Link href="/register" className="rounded-full bg-brand-primary px-5 py-2 text-sm font-semibold text-white hover:bg-brand-primary/90 transition-all shadow-glow">
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
