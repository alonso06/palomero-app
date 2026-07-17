import { useState } from "react";
import type { Movie } from "../interfaces/movie.interface";
import { isEntryValid, loadCache, saveCache } from "../lib/cache";
import { FAVORITE_CACHE_KEY } from "@/App";

const FAVORITE_TTL: number = 1000 * 60 * 60 * 24 * 7;

export const getInitialState = (): Movie[] => {
  const cache = loadCache(FAVORITE_CACHE_KEY);
  const entry = cache["favorites"];
  if (!isEntryValid(entry, FAVORITE_TTL)) {
    delete cache["favorites"];
    saveCache(FAVORITE_CACHE_KEY, cache);
    return [];
  }
  return entry.data;
};

export const useMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [favoriteMovies, setFavoriteMovies] =
    useState<Movie[]>(getInitialState);

  const handleFavoriteMovies = (favoriteMovie: Movie) => {
    if (favoriteMovies.length > 0) {
      const isDuplicated = favoriteMovies.some(
        (movie) => movie.id === favoriteMovie.id,
      );

      if (isDuplicated) return;
    }
    setFavoriteMovies((prev) => [...prev, favoriteMovie]);
  };

  const handleDeleteFavoriteMovies = (favoriteMovie: Movie) => {
    const newFavoriteMovies = favoriteMovies.filter(
      (movie) => movie.id !== favoriteMovie.id,
    );

    console.log("Nuevos favoritos", newFavoriteMovies);

    setFavoriteMovies(newFavoriteMovies);
  };

  const idFavoriteMovies = new Set(
    favoriteMovies.map((favoriteMovie) => favoriteMovie.id),
  );

  return {
    favoriteMovies,
    idFavoriteMovies,
    trendingMovies,
    handleDeleteFavoriteMovies,
    handleFavoriteMovies,
    setTrendingMovies,
  };
};
