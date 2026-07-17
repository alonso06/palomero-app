import type { Movie } from "../interfaces/movie.interface";

export type CacheEntry = { data: Movie[]; timestamp: number };
export type Cache = Record<string, CacheEntry>;

export const loadCache = (key: string): Cache => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const saveCache = (key: string, cache: Cache): void => {
  localStorage.setItem(key, JSON.stringify(cache));
};

export const isEntryValid = (
  entry: CacheEntry | undefined,
  ttl: number,
): entry is CacheEntry => !!entry && Date.now() - entry.timestamp < ttl;

export const pruneOldest = (cache: Cache, maxEntries: number): void => {
  const entries = Object.entries(cache);
  if (entries.length > maxEntries) {
    const oldest = entries.sort((a, b) => a[1].timestamp - b[1].timestamp)[0];
    console.log("oldest ", oldest);
    delete cache[oldest[0]];
  }
};
