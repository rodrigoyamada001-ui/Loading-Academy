export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-brand-background px-6">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
        <div className="mt-6 h-10 w-4/5 animate-pulse rounded bg-white/10" />
        <div className="mt-3 h-10 w-3/5 animate-pulse rounded bg-white/10" />
        <div className="mt-8 h-5 w-full animate-pulse rounded bg-white/10" />
        <div className="mt-3 h-5 w-11/12 animate-pulse rounded bg-white/10" />
        <div className="mt-10 flex gap-3">
          <div className="h-11 w-28 animate-pulse rounded-full bg-white/10" />
          <div className="h-11 w-36 animate-pulse rounded-full bg-white/10" />
        </div>
      </div>
    </main>
  );
}
