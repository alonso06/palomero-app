import { useState } from "react";
import type { Movie } from "../interfaces/movie.interface";

export const getInitialState = (): Movie[] => {
  const localFavoriteMovies = localStorage.getItem("favorite-movies");
  if (!localFavoriteMovies) return [];
  return JSON.parse(localFavoriteMovies);
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
