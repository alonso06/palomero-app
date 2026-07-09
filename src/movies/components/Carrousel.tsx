import { useEffect, useState } from "react";
import { Card } from "./Card";
import type { Movie } from "../interfaces/movie.interface";

type Props = {
  movies: Movie[];
  autoslide?: boolean;
  timeForSlide?: number;
};

export const Carrousel = ({
  movies,
  autoslide = true,
  timeForSlide = 5000,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (autoslide) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
      }, timeForSlide);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [autoslide, timeForSlide, movies.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  return (
    <>
      <div className="relative w-full h-full" data-slot="carrousel">
        <div
          className="relative w-full h-full overflow-hidden"
          data-slot="carrousel-content"
        >
          {movies.map((movie, index) => {
            return (
              <Card
                key={movie.id}
                movie={movie}
                index={index}
                currentIndex={currentIndex}
              ></Card>
            );
          })}
        </div>
        <button
          type="button"
          className="absolute -top-10 inset-s-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none rounded-full"
          onClick={prevSlide}
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-10 h-10 group-hover:rounded-full group-hover:bg-black/15 group-focus:ring-black/20 group-focus:outline-none">
            <svg
              className="w-5 h-5 text-white/50 rtl:rotate-180 group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m15 19-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute -top-10 inset-e-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none rounded-full"
          onClick={nextSlide}
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-10 h-10 group-hover:rounded-full group-hover:bg-black/15 group-focus:ring-black/20 group-focus:outline-none">
            <svg
              className="w-5 h-5 text-white/50 rtl:rotate-180 group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m9 5 7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </>
  );
};
