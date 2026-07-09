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
          {/* Background image */}
          <div
            className="hidden absolute inset-0 bg-cover bg-right md:block"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${url})`,
            }}
          ></div>
          {/* Capa degradado */}
          <div className="absolute inset-0 bg-black opacity-100 md:opacity-85"></div>
          <picture
            className="relative w-full h-full block aspect-2/3"
            data-carrousel-item
          >
            <img
              className="h-full w-full object-cover mask-[linear-gradient(black_30%,transparent)] md:mask-[linear-gradient(black_50%,transparent)] md:object-contain md:object-[95%_12%] lg:mask-[linear-gradient(black_80%,transparent)] lg:object-[85%_12%] xl:object-[80%_12%]"
              src={`https://image.tmdb.org/t/p/w500/${url}`}
              alt={`${title}-${index}`}
            />
          </picture>
          <div
            data-slot="card-content"
            className="absolute flex flex-col text-white left-10 right-10 bottom-26 w-fit gap-4 md:gap-8 md:w-3/7 md:left-18 md:bottom-50 md:z-10 lg:gap-10 lg:left-20 lg:bottom-40 xl:bottom-60"
          >
            <div className="uppercase font-bold text-2xl md:text-3xl lg:text-5xl">
              {title}
            </div>
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="text-sm font-semibold flex flex-row gap-5 lg:text-lg">
                <div>{new Date(release_date).getFullYear()}</div>|
                <div>{adult ? "+18" : "TP"}</div>
              </div>
              <p className="line-clamp-3 text-ellipsis text-[1rem] md:text-lg">
                {overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
