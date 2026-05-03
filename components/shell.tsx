"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  BookOpen, 
  Route, 
  BarChart2, 
  Heart, 
  Shield, 
  LogOut,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { signOutAction } from "@/lib/actions/auth";
import type { Profile } from "@/lib/types";
import { useState } from "react";
import { LASquare } from "./landing/Logo";

export function AppShell({ children, profile }: { children: React.ReactNode; profile: Profile }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const canAdmin = profile.role === "leader" || profile.role === "admin";

  const navItems = [
    { label: "Início", icon: Home, href: "/dashboard" },
    { label: "Meus cursos", icon: BookOpen, href: "/courses" },
    { label: "Trilhas", icon: Route, href: "/trilhas" },
    { label: "Meu progresso", icon: BarChart2, href: "/progresso" },
    { label: "Favoritos", icon: Heart, href: "/favoritos" },
  ];

  return (
    <div className="min-h-screen bg-brand-background text-white flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-white/5 bg-brand-background/50 backdrop-blur-xl sticky top-0 h-screen">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <LASquare />
            <div>
              <p className="text-sm font-bold leading-none">Loading Academy</p>
              <p className="text-[10px] text-brand-secondary font-bold uppercase tracking-widest mt-1">Área de formação</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-brand-primary/10 text-white border border-brand-primary/20" 
                    : "text-brand-muted hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className={`size-5 ${isActive ? "text-brand-primary" : ""}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {canAdmin && (
          <div className="p-4 mb-4">
            <Link 
              href="/admin" 
              className="group flex items-center justify-between p-4 rounded-xl border border-brand-primary/20 bg-brand-primary/5 hover:bg-brand-primary/10 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-brand-primary/20 flex items-center justify-center">
                  <Shield className="size-4 text-brand-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white uppercase tracking-wider">Acesso administrativo</p>
                  <p className="text-[8px] text-brand-muted">Área restrita para líderes</p>
                </div>
              </div>
              <ChevronRight className="size-4 text-brand-muted group-hover:text-brand-primary transition-all" />
            </Link>
          </div>
        )}

        <div className="p-4 border-t border-white/5">
          <form action={signOutAction}>
            <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-brand-muted hover:bg-red-500/10 hover:text-red-400 transition-all">
              <LogOut className="size-5" />
              <span className="text-sm font-medium">Sair da conta</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Mobile & Desktop Top Bar */}
        <header className="lg:hidden sticky top-0 z-40 border-b border-white/5 bg-brand-background/80 backdrop-blur-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LASquare className="size-8" />
            <p className="text-sm font-bold">Loading Academy</p>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-brand-muted">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Desktop Top Bar (Matches Image) */}
        <header className="hidden lg:flex sticky top-0 z-30 px-8 py-4 items-center justify-end gap-4 bg-brand-background/50 backdrop-blur-md">
          <Link href="/dashboard" className="px-6 py-2 rounded-lg bg-brand-primary text-sm font-bold shadow-glow flex items-center gap-2">
            <Home className="size-4" /> Entrar
          </Link>
          {canAdmin && (
            <Link href="/admin" className="flex items-center gap-2 text-brand-muted hover:text-white transition-colors text-sm font-medium">
              <Shield className="size-4" /> Acesso administrativo
            </Link>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-brand-background/95 p-6 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <LASquare />
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2"><X /></button>
          </div>
          <nav className="space-y-4">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 text-xl font-bold">
                <item.icon className="size-6 text-brand-primary" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-6 border-t border-white/10">
            <form action={signOutAction}>
              <button className="flex items-center gap-4 text-xl font-bold text-red-400">
                <LogOut className="size-6" /> Sair
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
