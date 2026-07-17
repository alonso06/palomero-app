import { useState, useRef } from "react";
import { getSearchMovies } from "../actions/get-search-movies.action";
import { loadCache, saveCache, pruneOldest } from "../lib/cache";
import type { Cache } from "../lib/cache";
import type { Movie } from "../interfaces/movie.interface";

const SEARCH_CACHE_KEY: string = "movie-search";
const MAX_ENTRIES: number = 20;

export const useMovieSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const moviesCache = useRef<Cache>(loadCache(SEARCH_CACHE_KEY));

  const handleSearch = async (query: string) => {
    query = query.trim().toLowerCase();
    if (query.length === 0) return;

    // Sin TTL: una query expirada no debería llamar a la API
    // Solo se debe expulsar cuando no quede espacio.
    const cached = moviesCache.current[query];
    if (cached) {
      setMovies(cached.data);
      return;
    }

    const movies = await getSearchMovies(query);
    moviesCache.current[query] = { data: movies, timestamp: Date.now() };

    pruneOldest(moviesCache.current, MAX_ENTRIES);
    setMovies(movies);
    saveCache(SEARCH_CACHE_KEY, moviesCache.current);
  };
  return {
    inputRef,
    isOpen,
    movies,
    setIsOpen,

    handleSearch,
  };
};
