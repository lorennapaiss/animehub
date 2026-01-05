import { Navbar } from "@/components/Navbar";

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
      <div className="aspect-[3/4] bg-zinc-200/70 animate-pulse" />
      <div className="p-3">
        <div className="h-4 w-4/5 rounded bg-zinc-200/70 animate-pulse" />
        <div className="mt-2 h-4 w-3/5 rounded bg-zinc-200/60 animate-pulse" />
        <div className="mt-3 flex items-center justify-between">
          <div className="h-5 w-16 rounded-full bg-violet-100 animate-pulse" />
          <div className="h-4 w-10 rounded bg-zinc-200/60 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-zinc-900">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Hero skeleton */}
        <div className="relative overflow-hidden rounded-[2.25rem] border border-black/10 bg-white p-8 shadow-sm">
          <div className="h-6 w-44 rounded bg-zinc-200/70 animate-pulse" />
          <div className="mt-4 h-12 w-2/3 rounded bg-zinc-200/70 animate-pulse" />
          <div className="mt-4 h-5 w-1/2 rounded bg-zinc-200/60 animate-pulse" />

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <div className="h-12 flex-1 rounded-2xl bg-zinc-200/60 animate-pulse" />
            <div className="h-12 w-32 rounded-2xl bg-violet-200/70 animate-pulse" />
            <div className="h-12 w-32 rounded-2xl bg-zinc-200/60 animate-pulse" />
          </div>
        </div>

        {/* Grid skeleton */}
        <section className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 15 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </section>
      </div>
    </main>
  );
}
