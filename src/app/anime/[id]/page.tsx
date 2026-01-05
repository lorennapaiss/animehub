import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { FavoriteButton } from "@/components/FavoriteButton";
import { EpisodesPanel } from "@/components/EpisodesPanel";
import { getAnimeById } from "@/lib/jikan";

export default async function AnimeDetails({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ epPage?: string }>;
}) {
  const { id } = await params;
  const sp = (await searchParams) ?? {};
  const epPage = Math.max(1, Number(sp.epPage ?? "1") || 1);

  let anime;
  try {
    anime = await getAnimeById(id);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-zinc-900">
      <Navbar />

      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* voltar */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-violet-700 transition"
        >
          ← Voltar
        </a>

        {/* topo */}
        <div className="mt-6 grid gap-6 md:grid-cols-[260px_1fr]">
          {/* POSTER — ESTÁVEL, SEM ESTICAR */}
          <div className="self-start overflow-hidden rounded-3xl bg-zinc-900 shadow-sm">
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              className="w-full h-[380px] object-cover scale-[1.03]"
            />
          </div>


          {/* info */}
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">
                  {anime.title}
                </h1>

                {anime.title_english && (
                  <p className="mt-1 text-zinc-600">
                    {anime.title_english}
                  </p>
                )}
              </div>

              <FavoriteButton
                anime={{
                  mal_id: anime.mal_id,
                  title: anime.title,
                  image_url: anime.images.jpg.image_url,
                  score: anime.score,
                  year: anime.year,
                }}
              />
            </div>

            {/* meta */}
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-black/10 bg-white px-3 py-1">
                ⭐{" "}
                <span className="font-semibold text-violet-700">
                  {anime.score ?? "—"}
                </span>
              </span>

              <span className="rounded-full border border-black/10 bg-white px-3 py-1">
                Ano: {anime.year ?? "—"}
              </span>

              <span className="rounded-full border border-black/10 bg-white px-3 py-1">
                Episódios: {anime.episodes ?? "—"}
              </span>

              <span className="rounded-full border border-black/10 bg-white px-3 py-1">
                Status: {anime.status ?? "—"}
              </span>
            </div>

            {/* sinopse */}
            <p className="mt-6 leading-relaxed text-zinc-800">
              {anime.synopsis ?? "Sem sinopse disponível."}
            </p>
          </div>
        </div>

        {/* EPISÓDIOS */}
        <EpisodesPanel animeId={id} page={epPage} />
      </div>
    </main>
  );
}
