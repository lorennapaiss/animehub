const key = (animeId: string) => `anime:${animeId}:watched`;

export function getWatched(animeId: string): number[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(key(animeId)) || "[]");
  } catch {
    return [];
  }
}

export function toggleWatched(animeId: string, ep: number) {
  const current = new Set(getWatched(animeId));
  current.has(ep) ? current.delete(ep) : current.add(ep);
  localStorage.setItem(key(animeId), JSON.stringify([...current]));
}

export function isWatched(animeId: string, ep: number) {
  return getWatched(animeId).includes(ep);
}
