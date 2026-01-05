import type { Anime } from "@/types/anime";
import type { Episode } from "@/types/episode";

const BASE = "https://api.jikan.moe/v4";

/**
 * Fetch base da Jikan com tratamento de erro
 */
async function jikan<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
    next: { revalidate: 60 }, // cache SSR
  });

  if (!res.ok) {
    let details = "";
    try {
      const text = await res.text();
      details = text ? ` | ${text.slice(0, 200)}` : "";
    } catch {}
    throw new Error(`Jikan error: ${res.status} ${res.statusText}${details}`);
  }

  return res.json() as Promise<T>;
}

/* ======================================================
   📺 LISTAGEM DE ANIMES
====================================================== */

/**
 * Top animes
 */
export async function getTopAnime(page = 1): Promise<Anime[]> {
  const data = await jikan<{ data: Anime[] }>(`/top/anime?page=${page}`);
  return data.data;
}

/**
 * Busca de animes
 */
export async function searchAnime(q: string, page = 1): Promise<Anime[]> {
  const params = new URLSearchParams({
    q,
    page: String(page),
    sfw: "true",
  });

  const data = await jikan<{ data: Anime[] }>(`/anime?${params.toString()}`);
  return data.data;
}

/* ======================================================
   📖 DETALHES DO ANIME
====================================================== */

/**
 * Detalhes do anime (com fallback)
 */
export async function getAnimeById(id: string): Promise<Anime> {
  // garante que o id é válido
  if (!/^\d+$/.test(id)) {
    throw new Error(`Invalid anime id: "${id}"`);
  }

  // tenta endpoint /full
  try {
    const data = await jikan<{ data: Anime }>(`/anime/${id}/full`);
    return data.data;
  } catch {
    // fallback padrão
    const data = await jikan<{ data: Anime }>(`/anime/${id}`);
    return data.data;
  }
}

/* ======================================================
   🎬 EPISÓDIOS
====================================================== */

/**
 * Lista de episódios (paginada)
 */
export async function getAnimeEpisodes(
  id: string,
  page = 1
): Promise<{
  data: Episode[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  };
}> {
  if (!/^\d+$/.test(id)) {
    throw new Error(`Invalid anime id: "${id}"`);
  }

  return jikan(`/anime/${id}/episodes?page=${page}`);
}
