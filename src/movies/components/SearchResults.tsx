import { CardMovie } from "./CardMovie";
import type { Movie } from "../interfaces/movie.interface";

type Props = {
  movies: Movie[];
  isOpen: boolean;
  onAddToFavorites: (favoriteMovie: Movie) => void;
};

export const SearchResults = ({ movies, isOpen, onAddToFavorites }: Props) => {
  if (!isOpen || movies.length === 0) return;
  return (
    <>
      <div className="z-50 absolute inset-x-0 top-28 mt-2 flex justify-center px-14">
        <div className="w-full overflow-hidden grid grid-cols-6 gap-3">
          {movies.map((movie) => (
            <CardMovie
              onAddToFavorites={onAddToFavorites}
              index={movie.id}
              movie={movie}
            ></CardMovie>
          ))}
        </div>
      </div>
    </>
  );
};
