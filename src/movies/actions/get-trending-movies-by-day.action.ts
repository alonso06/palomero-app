import type { TMDBResponse } from "../interfaces/tmdb.response";
import { tmbdbApi } from "../api/tmbdb.api";

export const getTrendingMoviesByDay = async () => {
  const response = await tmbdbApi<TMDBResponse>("/trending/movie/day");

  return response.data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    url: movie.poster_path,
    overview: movie.overview,
    popularity: movie.popularity,
    release_date: movie.release_date,
    adult: movie.adult,
  }));
};
