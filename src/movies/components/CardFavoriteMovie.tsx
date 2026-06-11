import type { Movie } from "../interfaces/movie.interface";

type Props = {
  movie: Movie;
  index: number;
};

export const CardFavoriteMovie = ({ movie, index }: Props) => {
  const { title, url } = movie;
  return (
    <>
      <div key={index} data-slot="card" className="w-full h-full">
        <div className="relative w-full h-full">
          <picture
            className="w-full h-full block aspect-3/4"
            data-carrousel-item
          >
            <img
              className="h-full w-full object-fill mask-[linear-gradient(black_60%,transparent)]"
              src={`https://image.tmdb.org/t/p/w500/${url}`}
              // src={url}
              alt={`${title}-${index}`}
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
    </>
  );
};
