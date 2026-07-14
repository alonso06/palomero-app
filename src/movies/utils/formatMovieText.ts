import type { Movie } from "../interfaces/movie.interface";

const formatMovie = (movie: Movie) => {
  return (
    `*${movie.title}*\n` +
    `*Año*: ${movie.release_date}\n` +
    `*+18*: ${movie.adult ? "Sí" : "No"}\n` +
    `*Sinopsis*: ${movie.overview}`
  );
};

export const formatMovieList = (movies: Movie[]) => {
  const separator = "\n----------------------------\n\n";
  const header = "*Mis películas favoritas:*\n\n";
  const website = "https://palomero.pages.dev/";
  return header + movies.map(formatMovie).join(separator) + "\n\n" + website;
};
