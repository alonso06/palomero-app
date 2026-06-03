import axios from "axios";
import type { TMDBResponse } from "../interfaces/tmdb.response";

export const getTrendingMoviesByDay = async () => {
  const response = await axios.get<TMDBResponse>(
    "https://api.themoviedb.org/3/trending/movie/day",
    {
      params: {
        language: "es",
        api_key: "914944fd3e3f01311bae73ae7eb954df",
      },
    },
  );
  return response.data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    url: movie.poster_path,
    overview: movie.overview,
    popularity: movie.popularity,
    release_date: movie.release_date,
  }));
};
