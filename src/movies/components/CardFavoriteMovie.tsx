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
            className="w-full h-full block aspect-2/3"
            data-carrousel-item
          >
            <img
              className="h-full w-full object-contain mask-[linear-gradient(black_60%,transparent)]"
              //   src={`https://image.tmdb.org/t/p/w500/${url}`}
              src={url}
              alt={`${title}-${index}`}
            />
          </picture>

          <div
            data-slot="card-content"
            className="absolute left-6 bottom-12 text-white "
          >
            <div className="uppercase text-xs font-bold">{title}</div>
          </div>
        </div>
      </div>
    </>
  );
};
