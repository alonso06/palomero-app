import { useEffect, useState } from "react";
import { Card } from "./Card";

const mockData = [
  {
    id: 1,
    title: "MOVIE 01",
    url: "https://picsum.photos/seed/picsum/200/300",
    overview:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Excepturi quas rem molestiae",
    popularity: 1222,
    release_date: "26/06/12",
  },
  {
    id: 2,
    title: "MOVIE 02",
    url: "https://picsum.photos/seed/picsum/200/300",
    overview:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Excepturi quas rem molestiae",
    popularity: 1222,
    release_date: "26/06/12",
  },
  {
    id: 3,
    title: "MOVIE 03",
    url: "https://picsum.photos/seed/picsum/200/300",
    overview:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Excepturi quas rem molestiae",
    popularity: 1222,
    release_date: "26/06/12",
  },
];

export const Carrousel = ({
  movies = mockData,
  autoslide = true,
  timeForSlide = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (autoslide) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % mockData.length);
      }, timeForSlide);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [autoslide, timeForSlide, movies.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mockData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + mockData.length) % mockData.length);
  };

  return (
    <>
      <div className="relative w-full h-full" data-slot="carrousel">
        <div
          className="relative w-full h-3/4 bg-gray-500 overflow-hidden "
          data-slot="carrousel-content"
        >
          {mockData.map((movie, index) => {
            return (
              <Card
                movie={movie}
                index={index}
                currentIndex={currentIndex}
              ></Card>
            );
          })}
        </div>
        <button
          type="button"
          className="absolute top-0 inset-s-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={prevSlide}
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-5 h-5 text-white rtl:rotate-180"
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
          className="absolute top-0 inset-e-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={nextSlide}
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-5 h-5 text-white rtl:rotate-180"
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
