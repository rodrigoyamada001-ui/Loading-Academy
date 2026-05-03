import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPercent(value: number) {
  return `${Math.max(0, Math.min(100, Math.round(value)))}%`;
}

export function roleLabel(role: string) {
  return role === "admin" ? "Admin" : role === "leader" ? "Lider" : "Membro";
}

export function statusLabel(status: string) {
  const labels: Record<string, string> = {
    pending: "Pendente",
    approved: "Aprovado",
    rejected: "Rejeitado",
    draft: "Rascunho",
    published: "Publicado",
    inactive: "Inativo"
  };
  return labels[status] ?? status;
}
