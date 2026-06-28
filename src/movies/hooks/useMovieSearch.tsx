import { useState, useRef } from "react";
import { getSearchMovies } from "../actions/get-search-movies.action";
import type { Movie } from "../interfaces/movie.interface";

export const useMovieSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const moviesCache = useRef<Record<string, Movie[]>>({});

  const handleSearch = async (query: string) => {
    query = query.trim().toLowerCase();
    if (query.length === 0) return;

    if (moviesCache.current[query]) {
      setMovies(moviesCache.current[query]);
      return;
    }
    const movies = await getSearchMovies(query);
    setMovies(movies);
    moviesCache.current[query] = movies;
  };
  return {
    inputRef,
    isOpen,
    movies,
    setIsOpen,

    handleSearch,
  };
};
