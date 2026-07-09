import { buildWhatsappUrl } from "@/shared/utils/whatsapp";
import { formatMovieList } from "./formatMovieText";
import type { Movie } from "../interfaces/movie.interface";

export const shareMovieText = (movies: Movie[]) => {
  const text = formatMovieList(movies);
  const url = buildWhatsappUrl(text);
  window.open(url, "_blank", "noopener,noreferrer");
};
