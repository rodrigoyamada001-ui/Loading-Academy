import Link from "next/link";
import { GraduationCap, LayoutDashboard, LogOut, Shield } from "lucide-react";
import { signOutAction } from "@/lib/actions/auth";
import type { Profile } from "@/lib/types";
import { Button, LinkButton } from "@/components/ui/button";

export function AppShell({ children, profile }: { children: React.ReactNode; profile: Profile }) {
  const canAdmin = profile.role === "leader" || profile.role === "admin";

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/68 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-md bg-white text-black">
              <GraduationCap className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-wide">Loading Academy</span>
              <span className="block text-xs text-slate-400">Preparing the next generation</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            <LinkButton href="/dashboard" variant="secondary">
              <LayoutDashboard className="size-4" />
              Dashboard
            </LinkButton>
            <LinkButton href="/courses" variant="secondary">
              <GraduationCap className="size-4" />
              Cursos
            </LinkButton>
            {canAdmin ? (
              <LinkButton href="/admin" variant="accent">
                <Shield className="size-4" />
                Painel Administrativo
              </LinkButton>
            ) : null}
            <form action={signOutAction}>
              <Button variant="secondary" type="submit">
                <LogOut className="size-4" />
                Sair
              </Button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/10 bg-black/86 p-2 backdrop-blur-xl md:hidden">
        <Link className="grid justify-items-center gap-1 rounded-md px-2 py-2 text-xs text-slate-200" href="/dashboard">
          <LayoutDashboard className="size-5" />
          Início
        </Link>
        <Link className="grid justify-items-center gap-1 rounded-md px-2 py-2 text-xs text-slate-200" href="/courses">
          <GraduationCap className="size-5" />
          Cursos
        </Link>
        <Link className="grid justify-items-center gap-1 rounded-md px-2 py-2 text-xs text-slate-200" href={canAdmin ? "/admin" : "/dashboard"}>
          <Shield className="size-5" />
          Admin
        </Link>
      </nav>
    </div>
  );
}
