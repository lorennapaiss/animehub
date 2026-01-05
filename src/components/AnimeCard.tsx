import Link from "next/link";
import type { Anime } from "@/types/anime";
import { FavoriteStar } from "@/components/FavoriteStar";

export function AnimeCard({ anime }: { anime: Anime }) {
  return (
    <Link
      href={`/anime/${anime.mal_id}`}
      className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition hover:shadow-md hover:border-violet-200"
    >
      <FavoriteStar
        anime={{
          mal_id: anime.mal_id,
          title: anime.title,
          image_url: anime.images.jpg.image_url,
          score: anime.score,
          year: anime.year,
        }}
      />

      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-90" />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-violet-700 border border-black/10 backdrop-blur">
          ⭐ {anime.score ?? "—"}
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-semibold leading-snug line-clamp-2">{anime.title}</h3>

        <div className="mt-2 flex items-center justify-between text-sm text-zinc-600">
          <span className="rounded-full bg-violet-50 text-violet-700 px-2 py-0.5 border border-violet-100">
            {anime.year ?? "—"}
          </span>
          <span className="opacity-80 group-hover:opacity-100 transition">Ver →</span>
        </div>
      </div>

      <div className="pointer-events-none absolute -inset-x-10 -top-10 h-24 rotate-12 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 blur-md transition group-hover:opacity-100" />
    </Link>
  );
}
