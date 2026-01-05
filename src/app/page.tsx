import { getTopAnime, searchAnime } from "../lib/jikan";
import { AnimeCard } from "@/components/AnimeCard";
import { Navbar } from "@/components/Navbar";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const q = sp.q?.trim();

  const animes = q ? await searchAnime(q) : await getTopAnime();

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-zinc-900">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[2.25rem] border border-black/10 bg-white p-8 shadow-sm">
          {/* blobs */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-28 -left-28 h-80 w-80 rounded-full bg-violet-300/60 blur-3xl" />
            <div className="absolute -bottom-32 -right-28 h-96 w-96 rounded-full bg-violet-600/40 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.08),transparent_55%)]" />
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold text-zinc-700">
              <span className="inline-block h-2 w-2 rounded-full bg-violet-600" />
              Catálogo • Busca • Favoritos
            </div>

            <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold tracking-tight">
              AnimeHub{" "}
              <span className="bg-gradient-to-r from-violet-700 to-fuchsia-600 bg-clip-text text-transparent">

              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-zinc-700 text-base sm:text-lg leading-relaxed">
              Descubra animes, salve seus favoritos e explore detalhes.
            </p>

            {/* SEARCH */}
            <form action="/" method="GET" className="mt-7">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                    ⌕
                  </span>
                  <input
                    name="q"
                    defaultValue={q}
                    placeholder="Buscar anime… (ex: Naruto, One Piece, Bleach)"
                    className="w-full rounded-2xl border border-black/10 bg-[#FFFCFA] pl-11 pr-4 py-3 outline-none focus:border-violet-400"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-2xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 transition shadow-[0_10px_30px_rgba(124,58,237,0.25)]"
                >
                  Buscar
                </button>

                <a
                  href="/"
                  className="rounded-2xl border border-black/10 bg-white px-6 py-3 font-semibold hover:bg-violet-50 hover:border-violet-200 transition text-center"
                >
                  Top animes
                </a>
              </div>
            </form>
          </div>
        </section>

        {/* SECTION HEADER */}
        <div className="mt-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {q ? (
                <>
                  Resultados para <span className="text-violet-700">“{q}”</span>
                </>
              ) : (
                <>
                  Top animes <span className="text-violet-700">★</span>
                </>
              )}
            </h2>
            <p className="mt-1 text-zinc-600">
              Clique em um card pra ver detalhes e favoritar.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-600">
            <span className="h-2 w-2 rounded-full bg-violet-600" />
          </div>
        </div>

        {/* GRID */}
        <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {animes.map((a) => (
            <AnimeCard key={a.mal_id} anime={a} />
          ))}
        </section>
      </div>
    </main>
  );
}
