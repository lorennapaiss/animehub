import { Navbar } from "@/components/Navbar";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-zinc-900">
      <Navbar />

      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="h-4 w-24 rounded bg-zinc-200/70 animate-pulse" />

        <div className="mt-6 grid gap-6 md:grid-cols-[260px_1fr]">
          {/* poster */}
          <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
            <div className="aspect-[3/4] bg-zinc-200/70 animate-pulse" />
          </div>

          {/* text */}
          <div>
            <div className="h-8 w-3/4 rounded bg-zinc-200/70 animate-pulse" />
            <div className="mt-3 h-5 w-1/2 rounded bg-zinc-200/60 animate-pulse" />

            <div className="mt-5 flex flex-wrap gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-28 rounded-full bg-zinc-200/60 animate-pulse"
                />
              ))}
              <div className="h-10 w-36 rounded-2xl bg-violet-200/70 animate-pulse" />
            </div>

            <div className="mt-6 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-full rounded bg-zinc-200/60 animate-pulse"
                />
              ))}
              <div className="h-4 w-4/5 rounded bg-zinc-200/60 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
