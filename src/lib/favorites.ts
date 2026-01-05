export type FavoriteAnime = {
  mal_id: number;
  title: string;
  image_url: string;
  score?: number | null;
  year?: number | null;
};

const KEY = "animehub:favorites";
const EVENT = "animehub:favorites:changed";

function safeParse<T>(value: string | null, fallback: T): T {
  try {
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function readFavorites(): FavoriteAnime[] {
  if (typeof window === "undefined") return [];
  return safeParse<FavoriteAnime[]>(localStorage.getItem(KEY), []);
}

export function writeFavorites(next: FavoriteAnime[]) {
  localStorage.setItem(KEY, JSON.stringify(next));
  // avisa o app todo que mudou
  window.dispatchEvent(new Event(EVENT));
}

export function isFavorite(id: number): boolean {
  return readFavorites().some((a) => a.mal_id === id);
}

export function toggleFavorite(anime: FavoriteAnime): FavoriteAnime[] {
  const current = readFavorites();
  const exists = current.some((a) => a.mal_id === anime.mal_id);
  const next = exists
    ? current.filter((a) => a.mal_id !== anime.mal_id)
    : [anime, ...current];

  writeFavorites(next);
  return next;
}

export function favoritesEventName() {
  return EVENT;
}
