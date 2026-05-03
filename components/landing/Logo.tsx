import React from "react";

export function LoadingLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-2xl font-bold tracking-tighter text-white">L</span>
      <div className="relative size-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute size-1.5 rounded-full bg-brand-secondary"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${i * 45}deg) translate(8px) rotate(-${i * 45}deg)`,
              opacity: 1 - i * 0.1,
            }}
          />
        ))}
      </div>
      <span className="text-2xl font-bold tracking-tighter text-white">ADING</span>
    </div>
  );
}

export function LASquare({ className = "" }: { className?: string }) {
  return (
    <div className={`grid size-10 place-items-center rounded-lg border border-white/20 bg-brand-surface font-bold text-white ${className}`}>
      LA
    </div>
  );
}
