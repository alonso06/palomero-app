import type { Movie } from "../interfaces/movie.interface";
import { formatMovieList } from "@/movies/utils/formatMovieText";
import { buildWhatsappUrl } from "@/shared/utils/whatsapp";

type Props = {
  movies: Movie[];
};

export const WhatsAppSharedButton = ({ movies }: Props) => {
  const handleClick = () => {
    if (movies.length === 0) return;
    const text = formatMovieList(movies);
    const url = buildWhatsappUrl(text);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      className="cursor-pointer "
      onClick={handleClick}
      aria-label="Compartir por WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 fill-green-600 stroke-white icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp hover:fill-green-700"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
        <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
      </svg>
    </button>
  );
};
