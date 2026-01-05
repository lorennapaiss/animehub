import Link from "next/link";
import { getAnimeEpisodes } from "@/lib/jikan";
import { EpisodesClient } from "@/components/EpisodesClient";

type Props = {
  animeId: string;
  page?: number;
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
      {children}
    </span>
  );
}

export async function EpisodesPanel({ animeId, page = 1 }: Props) {
  // Segurança
  const currentPage = Number.isFinite(page) ? Math.max(1, page) : 1;

  let episodesData: Awaited<ReturnType<typeof getAnimeEpisodes>> | null = null;

  try {
    episodesData = await getAnimeEpisodes(animeId, currentPage);
  } catch {
    return (
      <section className="mt-8 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-black/5 p-4">
          <h2 className="text-lg font-extrabold tracking-tight">Episódios</h2>
          <Pill>Indisponível</Pill>
        </div>

        <div className="p-4">
          <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4 text-zinc-800">
            A lista de episódios não está disponível para este anime no MyAnimeList/Jikan
            (ou a API falhou agora). Tente novamente mais tarde.
          </div>
        </div>
      </section>
    );
  }

  const episodes = episodesData?.data ?? [];
  const hasNext = Boolean(episodesData?.pagination?.has_next_page);
  const lastPage = episodesData?.pagination?.last_visible_page ?? currentPage;

  if (!episodes.length) {
    return (
      <section className="mt-8 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-black/5 p-4">
          <h2 className="text-lg font-extrabold tracking-tight">Episódios</h2>
          <Pill>0 encontrados</Pill>
        </div>

        <div className="p-4">
          <p className="text-zinc-700">
            Nenhum episódio listado para este anime no MyAnimeList/Jikan.
          </p>
        </div>
      </section>
    );
  }

  // links de paginação (rota de detalhes + query)
  const makeUrl = (p: number) => `/anime/${animeId}?epPage=${p}`;

  return (
    <section className="mt-8 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
      {/* HEADER + PAGINAÇÃO */}
      <div className="flex flex-col gap-3 border-b border-black/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-extrabold tracking-tight">Episódios</h2>
          <Pill>
            Página {currentPage} / {lastPage}
          </Pill>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={makeUrl(Math.max(1, currentPage - 1))}
            aria-disabled={currentPage <= 1}
            className={[
              "inline-flex items-center justify-center rounded-2xl border px-3 py-2 text-sm font-semibold transition",
              currentPage <= 1
                ? "pointer-events-none opacity-50 border-black/10 bg-white"
                : "border-black/10 bg-white hover:bg-violet-50 hover:border-violet-200",
            ].join(" ")}
          >
            ← Anterior
          </Link>

          <Link
            href={makeUrl(currentPage + 1)}
            aria-disabled={!hasNext}
            className={[
              "inline-flex items-center justify-center rounded-2xl border px-3 py-2 text-sm font-semibold transition",
              !hasNext
                ? "pointer-events-none opacity-50 border-black/10 bg-white"
                : "border-black/10 bg-white hover:bg-violet-50 hover:border-violet-200",
            ].join(" ")}
          >
            Próximo →
          </Link>
        </div>
      </div>

      {/* ✅ PROGRESSO + CHECKBOXES (CLIENT) */}
      <EpisodesClient animeId={animeId} episodes={episodes} />

      {/* FOOTER */}
      <div className="border-t border-black/5 p-4 text-xs text-zinc-600">
        Fonte: MyAnimeList via Jikan. Alguns títulos podem não ter episódios cadastrados.
      </div>
    </section>
  );
}
