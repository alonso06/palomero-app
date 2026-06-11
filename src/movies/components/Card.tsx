import type { Movie } from "../interfaces/movie.interface";

type Props = {
  movie: Movie;
  index: number;
  currentIndex: number;
};

export const Card = ({ movie, index, currentIndex }: Props) => {
  const { title, url, overview, release_date, adult } = movie;
  return (
    <>
      <div
        key={index}
        data-slot="card"
        className={`absolute w-full h-full inset-0 transition-transform transform ${index === currentIndex ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="relative w-full h-full">
          <div
            className="absolute inset-0 bg-cover bg-right"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${url})`,
            }}
          ></div>
          {/* Capa degradado */}
          <div className="absolute inset-0 bg-black opacity-85"></div>
          <picture
            className="relative w-full h-full block aspect-2/3"
            data-carrousel-item
          >
            <img
              className="h-full w-full object-contain object-[80%_12%] mask-[linear-gradient(black_80%,transparent)]"
              src={`https://image.tmdb.org/t/p/w500/${url}`}
              alt={`${title}-${index}`}
            />
          </picture>

          <div
            data-slot="card-content"
            className="absolute flex flex-col left-20 bottom-30 w-3/7 text-white gap-10 z-10"
          >
            {/*TODO: !Eliminar clases flex */}
            <div className="flex flex-row justify-between items-end">
              <div className="uppercase text-5xl font-bold">{title}</div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="line-clamp-3 text-ellipsis">{overview}</p>
              <div className="mt-5 text-lg font-semibold flex flex-row gap-5">
                <div>{new Date(release_date).getFullYear()}</div>|
                <div>{adult ? "+18" : "PG"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
