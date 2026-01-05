"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FavoriteAnime,
  favoritesEventName,
  isFavorite,
  toggleFavorite,
} from "@/lib/favorites";

export function FavoriteStar({ anime }: { anime: FavoriteAnime }) {
  const eventName = useMemo(() => favoritesEventName(), []);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const sync = () => setFav(isFavorite(anime.mal_id));
    sync();

    window.addEventListener(eventName, sync);
    return () => window.removeEventListener(eventName, sync);
  }, [anime.mal_id, eventName]);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault(); // não navegar quando clicar no card
        e.stopPropagation();
        toggleFavorite(anime);
        setFav((v) => !v);
      }}
      aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      className={[
        "absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-2xl border backdrop-blur transition",
        fav
          ? "bg-violet-600 text-white border-violet-600 shadow-[0_10px_30px_rgba(124,58,237,0.25)]"
          : "bg-white/90 text-zinc-800 border-black/10 hover:bg-violet-50 hover:border-violet-200",
      ].join(" ")}
      title={fav ? "Favoritado" : "Favoritar"}
    >
      <span className="text-lg leading-none">{fav ? "★" : "☆"}</span>
    </button>
  );
}
