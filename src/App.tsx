import { useEffect, useState } from "react";
import { Header } from "./shared/components/Header";
import { getTrendingMoviesByDay } from "./movies/actions/get-trending-movies-by-day.action";
import type { Movie } from "./movies/interfaces/movie.interface";
import { Carrousel } from "./movies/components/Carrousel";

function App() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  const sortMoviesByPopularity = (movies: Movie[]) => {
    const sortedMovies = [...movies].sort(
      (a, b) => b.popularity - a.popularity,
    );
    setTrendingMovies(sortedMovies);
  };

  const getTrendingMovies = async () => {
    const movies = await getTrendingMoviesByDay();
    sortMoviesByPopularity(movies);
    // setTrendingMovies(movies);
  };

  const mockDataSearchMovies = [
    {
      id: 1,
      title: "MOVIE 01",
      url: "https://picsum.photos/seed/picsum/200/300",
      overview:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Excepturi quas rem molestiae",
      release_date: "26/06/12",
    },
    {
      id: 2,
      title: "MOVIE 02",
      url: "https://picsum.photos/seed/picsum/200/300",
      overview:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Excepturi quas rem molestiae",
      release_date: "26/06/12",
    },
    {
      id: 3,
      title: "MOVIE 03",
      url: "https://picsum.photos/seed/picsum/200/300",
      overview:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Excepturi quas rem molestiae",
      release_date: "26/06/12",
    },
  ];

  useEffect(() => {
    getTrendingMovies();
  }, []);

  return (
    <>
      <Header />
      <section className="w-full h-3/4 text-black flex flex-col justify-center items-center">
        {/* SearchMovies */}
        <Carrousel movies={trendingMovies}></Carrousel>
      </section>
      <section className="bg-black">
        <h1 className="text-white text-4xl px-14 py-5">MIS FAVORITOS</h1>
        <div className=""></div>
      </section>
    </>
  );
}

export default App;
