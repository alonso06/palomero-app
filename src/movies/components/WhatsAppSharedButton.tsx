import type { Movie } from "../interfaces/movie.interface";

type Props = {
  movies: Movie[];
  isActive: boolean;
  text: string;
  movieShareFunction: (movies: Movie[]) => void;
};

export const WhatsAppSharedButton = ({
  movies,
  isActive,
  text,
  movieShareFunction,
}: Props) => {
  const handleClick = () => {
    if (movies.length === 0) return;
    movieShareFunction(movies);
  };

  return (
    <button
      className={`cursor-pointer text-lg p-3 rounded-xl border border-gray-700 ${isActive ? "bg-blue-700 hover:bg-blue-800" : "bg-gray-950 hover:bg-black"}`}
      onClick={handleClick}
      aria-label={text}
    >
      {text}
    </button>
  );
};
