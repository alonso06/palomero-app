import { tmbdbApi } from "../../../functions/api/tmdb";
import type { TMDBResponse } from "../interfaces/tmdb.response";

export const getSearchMovies = async (query: string) => {
  const response = await tmbdbApi<TMDBResponse>("/search/movie", {
    params: {
      query: query,
      include_adult: true,
    },
  });

  return response.data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    url: movie.poster_path,
    overview: movie.overview,
    release_date: movie.release_date,
    adult: movie.adult,
  }));
};
