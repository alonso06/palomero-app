import type { Movie } from "../interfaces/movie.interface";

type Props = {
  movie: Movie;
  index: number;
  currentIndex: number;
};

export const Card = ({ movie, index, currentIndex }: Props) => {
  const { title, url, overview, popularity, release_date } = movie;
  return (
    <>
      <div
        key={index}
        data-slot="card"
        className={`absolute w-full h-full inset-0 transition-transform transform ${index === currentIndex ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="relative w-full h-full">
          <picture className="w-full h-full block" data-carrousel-item>
            <img
              className="h-full w-full object-cover object-[80%_12%]"
              src={`https://image.tmdb.org/t/p/w500/${url}`}
              alt={`${title}-${index}`}
            />
          </picture>
          <div
            data-slot="card-content"
            className="absolute flex flex-col left-10 bottom-10 w-3/7 text-white gap-20"
          >
            <div className="flex flex-row justify-between items-end">
              <div className="uppercase text-6xl font-bold">{title}</div>
              <p className="text-xl">
                Puntaje: <span className="font-bold">{popularity}</span>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="">{overview}</p>
              <div className="mt-5 text-xls font-semibold">{release_date}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
