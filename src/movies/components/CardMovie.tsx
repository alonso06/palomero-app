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

  const [showOverlay, setShowOverlay] = useState(false);

  const isSelected =
    mode === "search" ? props.idFavoriteMovies.has(movie.id) : false;

  const handleOverlayClick = () => {
    setShowOverlay(!showOverlay);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onDeleteFavorite(movie);
    setShowOverlay(false);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mode === "search") {
      props.onAddToFavorites(movie);
    }
    setShowOverlay(false);
  };

  return (
    <>
      <div className="relative w-full h-full">
        {showOverlay && (
          <div
            className="absolute w-full h-full inset-x-0 z-10 flex flex-col justify-center items-center gap-2 bg-black/50 px-2 py-1"
            onClick={handleOverlayClick}
          >
            <div className="mx-auto">
              {mode === "search" && !isSelected ? (
                <button
                  onClick={handleAdd}
                  className="group bg-green-600 px-3 py-3 rounded-full cursor-pointer hover:bg-green-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-6 h-6 stroke-white fill-none icon icon-tabler icons-tabler-outline icon-tabler-heart group-active:scale-110 transition-all duration-150 hover:fill-white lg:w-7 lg:h-7"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleDelete}
                  className="group bg-red-600 px-3 py-3 rounded-full cursor-pointer hover:bg-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-6 h-6 stroke-white fill-none icon icon-tabler icons-tabler-outline icon-tabler-heart-off group-active:scale-110 transition-all duration-150 hover:fill-white lg:w-7 lg:h-7"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 3l18 18" />
                    <path d="M19.5 12.572l-1.5 1.428m-2 2l-4 4l-7.5 -7.428a5 5 0 0 1 -1.288 -5.068a4.976 4.976 0 0 1 1.788 -2.504m3 -1c1.56 0 3.05 .727 4 2a5 5 0 1 1 7.5 6.572" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
        {/* )} */}
        <div
          onClick={handleOverlayClick}
          key={movie.id}
          data-slot="card"
          className={`w-full h-full transition-opacity duration-300 ${isSelected ? "opacity-40" : "opacity-100"}`}
        >
          <div className="relative w-full h-full">
            <picture
              className="w-full h-full block aspect-3/4"
              data-carrousel-item
            >
              {movie.url ? (
                <img
                  className="h-full w-full object-fill mask-[linear-gradient(black_60%,transparent)]"
                  src={`https://image.tmdb.org/t/p/w500/${url}`}
                  alt={`${title}-${movie.id}`}
                />
              ) : (
                <div className="h-full w-full object-fill mask-[linear-gradient(black_60%,transparent)] flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-12 h-12 fill-transparent stroke-white icon icon-tabler icons-tabler-outline icon-tabler-photo"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 8h.01" />
                    <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12" />
                    <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
                    <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" />
                  </svg>
                </div>
              )}
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
