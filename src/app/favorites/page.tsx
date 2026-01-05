"use client";

import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import {
  FavoriteAnime,
  favoritesEventName,
  readFavorites,
  toggleFavorite,
} from "@/lib/favorites";

function FavoriteCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
      <div className="aspect-[3/4] bg-zinc-200/70 animate-pulse" />
      <div className="p-3">
        <div className="h-4 w-4/5 rounded bg-zinc-200/70 animate-pulse" />
        <div className="mt-2 h-4 w-3/5 rounded bg-zinc-200/60 animate-pulse" />
        <div className="mt-3 flex items-center justify-between">
          <div className="h-5 w-16 rounded-full bg-violet-100 animate-pulse" />
          <div className="h-4 w-12 rounded bg-zinc-200/60 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function FavoritesPage() {
  const eventName = useMemo(() => favoritesEventName(), []);
  const [items, setItems] = useState<FavoriteAnime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sync = () => {
      setItems(readFavorites());
      setLoading(false);
    };

    // pequena “janela” pra deixar o skeleton visível (UX). Pode remover se quiser.
    const t = window.setTimeout(sync, 200);

    window.addEventListener(eventName, sync);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener(eventName, sync);
    };
  }, [eventName]);

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-zinc-900">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Seus Favoritos <span className="text-violet-700">★</span>
            </h1>
            <p className="mt-2 text-zinc-700">
              Salvo no seu navegador (localStorage).
            </p>
          </div>

          <a
            href="/"
            className="rounded-2xl border border-black/10 bg-white px-4 py-2 font-semibold hover:bg-violet-50 hover:border-violet-200 transition"
          >
            Voltar
          </a>
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <FavoriteCardSkeleton key={i} />
            ))}
          </section>
        ) : items.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-black/10 bg-white p-8 text-zinc-700">
            Você ainda não favoritou nenhum anime. Vai lá na Home e clica na ★ 😄
          </div>
        ) : (
          <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {items.map((a) => (
              <div
                key={a.mal_id}
                className="relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition hover:shadow-md hover:border-violet-200"
              >
                <button
                  onClick={() => toggleFavorite(a)}
                  className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-2xl bg-violet-600 text-white border border-violet-600 shadow-[0_10px_30px_rgba(124,58,237,0.25)] hover:bg-violet-700 transition"
                  title="Remover dos favoritos"
                >
                  ★
                </button>

                <a href={`/anime/${a.mal_id}`} className="block">
                  <div className="aspect-[3/4] overflow-hidden bg-zinc-100">
                    <img
                      src={a.image_url}
                      alt={a.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-3">
                    <h3 className="font-semibold leading-snug line-clamp-2">
                      {a.title}
                    </h3>
                    <div className="mt-2 flex items-center justify-between text-sm text-zinc-600">
                      <span className="rounded-full bg-violet-50 text-violet-700 px-2 py-0.5 border border-violet-100">
                        {a.year ?? "—"}
                      </span>
                      <span className="font-semibold text-violet-700">
                        ⭐ {a.score ?? "—"}
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
