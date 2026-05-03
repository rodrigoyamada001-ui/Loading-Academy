import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 bg-brand-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="">
            <div className="flex items-center gap-3 mb-6">
              <div className="grid size-10 place-items-center rounded-lg border border-white/20 bg-brand-surface font-bold text-white">LA</div>
              <div>
                <p className="text-sm font-bold text-white">Loading Academy</p>
                <p className="text-[10px] text-brand-muted uppercase tracking-wider">Formação ministerial digital</p>
              </div>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed max-w-xs">
              Uma plataforma dedicada a capacitar líderes e membros para servirem ao Reino com excelência e profundidade.
            </p>
          </div>
          
          <div className="flex flex-col md:items-end">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Siga-nos</h4>
            <div className="flex gap-4">
              <Link href="https://instagram.com" target="_blank" rel="noreferrer" className="size-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-brand-primary/50 transition-all">
                <span className="text-xs text-brand-muted">IG</span>
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noreferrer" className="size-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-brand-primary/50 transition-all">
                <span className="text-xs text-brand-muted">YT</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-brand-muted border-t border-white/5 pt-8">
          <p>© 2025 Loading Academy. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="/register" className="hover:text-white">Termos</Link>
            <Link href="/register" className="hover:text-white">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
