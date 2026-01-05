"use client";

import { useEffect, useState } from "react";
import type { Episode } from "@/types/episode";

/* ===============================
   helpers de localStorage
================================ */

function storageKey(animeId: string) {
  return `anime:${animeId}:watched`;
}

function readWatched(animeId: string): number[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(storageKey(animeId)) || "[]");
  } catch {
    return [];
  }
}

function writeWatched(animeId: string, eps: number[]) {
  localStorage.setItem(storageKey(animeId), JSON.stringify(eps));
}

/* ===============================
   COMPONENT
================================ */

type Props = {
  animeId: string;
  episodes: Episode[];
};

export function EpisodesClient({ animeId, episodes }: Props) {
  const [watched, setWatched] = useState<number[]>([]);

  // carrega progresso ao montar
  useEffect(() => {
    setWatched(readWatched(animeId));
  }, [animeId]);

  function toggle(epNumber: number) {
    const set = new Set(watched);
    set.has(epNumber) ? set.delete(epNumber) : set.add(epNumber);

    const next = Array.from(set).sort((a, b) => a - b);
    setWatched(next);
    writeWatched(animeId, next);
  }

  const total = episodes.length;
  const done = watched.length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  return (
    <div>
      {/* PROGRESSO */}
      <div className="flex items-center justify-between gap-4 border-b border-black/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">Progresso</span>

          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
            {done} / {total}
          </span>
        </div>

        {/* barra visual */}
        <div className="h-2 w-32 overflow-hidden rounded-full bg-zinc-200">
          <div
            className="h-full bg-violet-600 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* LISTA DE EPISÓDIOS */}
      <ul className="divide-y divide-black/5">
        {episodes.map((ep) => {
          const checked = watched.includes(ep.mal_id);

          return (
            <li
              key={ep.mal_id}
              className="flex items-start gap-4 px-4 py-3"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(ep.mal_id)}
                className="mt-1 h-5 w-5 accent-violet-600 cursor-pointer"
              />

              <div className="min-w-0 flex-1">
                <div
                  className={[
                    "font-semibold transition",
                    checked
                      ? "line-through text-zinc-400"
                      : "text-zinc-900",
                  ].join(" ")}
                >
                  Ep {ep.mal_id}: {ep.title}
                </div>

                <div className="mt-1 text-xs text-zinc-600">
                  {ep.aired
                    ? new Date(ep.aired).toLocaleDateString("pt-BR")
                    : "—"}
                  {ep.filler ? " • filler" : ""}
                  {ep.recap ? " • recap" : ""}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
