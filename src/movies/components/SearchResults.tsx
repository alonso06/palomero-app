import { CardMovie } from "./CardMovie";
import type { Movie } from "../interfaces/movie.interface";

type Props = {
  movies: Movie[];
  isOpen: boolean;
  idFavoriteMovies: Set<number>;
  onAddToFavorites: (favoriteMovie: Movie) => void;
  onDeleteFavorites: (favoriteMovie: Movie) => void;
};

export const SearchResults = ({
  movies,
  isOpen,
  idFavoriteMovies,
  onAddToFavorites,
  onDeleteFavorites,
}: Props) => {
  if (!isOpen || movies.length === 0) return;

  return (
    <>
      <div className="z-40 absolute inset-x-0 top-28 mt-2 flex justify-center px-14 pointer-events-none">
        <div className="w-full overflow-hidden grid grid-cols-2 gap-3 md:grid md:grid-cols-4 lg:grid lg:grid-cols-6 pointer-events-auto">
          {movies.map((movie) => (
            <CardMovie
              key={movie.id}
              mode={"search"}
              idFavoriteMovies={idFavoriteMovies}
              movie={movie}
              onAddToFavorites={onAddToFavorites}
              onDeleteFavorite={onDeleteFavorites}
            ></CardMovie>
          ))}
        </div>
      </div>
    </>
  );
};
