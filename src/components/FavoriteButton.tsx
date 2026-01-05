"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FavoriteAnime,
  favoritesEventName,
  isFavorite,
  toggleFavorite,
} from "@/lib/favorites";

export function FavoriteButton({ anime }: { anime: FavoriteAnime }) {
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
      onClick={() => {
        toggleFavorite(anime);
        setFav((v) => !v);
      }}
      className={[
        "rounded-2xl px-4 py-2 font-semibold transition border",
        fav
          ? "bg-violet-600 text-white border-violet-600 hover:bg-violet-700"
          : "bg-white border-black/10 hover:bg-violet-50 hover:border-violet-200",
      ].join(" ")}
    >
      {fav ? "★ Favoritado" : "☆ Favoritar"}
    </button>
  );
}
