import { useState } from "react";
import type { Movie } from "../interfaces/movie.interface";

type Props =
  | {
      mode: "search";
      movie: Movie;
      idFavoriteMovies: Set<number>;
      onAddToFavorites: (favoriteMovie: Movie) => void;
      onDeleteFavorite: (favoriteMovie: Movie) => void;
    }
  | {
      mode: "favorites";
      movie: Movie;
      onDeleteFavorite: (favoriteMovie: Movie) => void;
    };

export const CardMovie = (props: Props) => {
  const { mode, movie } = props;
  const { title, url } = movie;

  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const isSelected = mode === "search" && props.idFavoriteMovies.has(movie.id);

  const handleClick = () => {
    if (mode === "search") {
      if (isSelected) {
        props.onDeleteFavorite(movie);
        console.log("Eliminar");
      } else {
        props.onAddToFavorites(movie);
      }
    } else {
      setConfirmingDelete(true);
    }
  };

  const handleConfirmDelete = (e: React.MouseEvent) => {
    console.log("Render en confirmDelete");
    e.stopPropagation();
    if (mode === "favorites") {
      props.onDeleteFavorite(movie);
    }
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmingDelete(false);
  };

  const isDimmed = mode === "search" ? isSelected : confirmingDelete;

  return (
    <>
      <div className="relative w-full h-full">
        {/* Desde favoritos */}
        {mode === "favorites" && confirmingDelete && (
          <div className="absolute w-full h-full inset-x-0 z-10 flex flex-col justify-center items-center gap-2 bg-black/70 px-2 py-1">
            <span className="text-white text-lg font-bold">
              ¿Quitar de la lista?
            </span>
            <div className="flex gap-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 px-6 py-1 text-white rounded-full text-lg font-bold cursor-pointer hover:bg-red-600"
              >
                Sí
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-200 px-6 py-1 text-black rounded-full text-lg font-bold cursor-pointer hover:bg-gray-300"
              >
                No
              </button>
            </div>
          </div>
        )}
        <div
          onClick={handleClick}
          key={movie.id}
          data-slot="card"
          className={`w-full h-full transition-opacity duration-300 ${isDimmed ? "opacity-40" : "opacity-100"}`}
        >
          <div className="relative w-full h-full">
            <picture
              className="w-full h-full block aspect-3/4"
              data-carrousel-item
            >
              <img
                className="h-full w-full object-fill mask-[linear-gradient(black_60%,transparent)]"
                src={`https://image.tmdb.org/t/p/w500/${url}`}
                alt={`${title}-${movie.id}`}
              />
            </picture>

            <div
              data-slot="card-content"
              className="absolute left-5 right-5 bottom-5 text-white"
            >
              <h3 className="uppercase whitespace-normal line-clamp-2 text-xs font-bold">
                {title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
