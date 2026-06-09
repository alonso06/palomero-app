import { useEffect, useState } from "react";
import { Header } from "./shared/components/Header";
import { getTrendingMoviesByDay } from "./movies/actions/get-trending-movies-by-day.action";
import type { Movie } from "./movies/interfaces/movie.interface";
import { Carrousel } from "./movies/components/Carrousel";
import { CardFavoriteMovie } from "./movies/components/CardFavoriteMovie";

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
      adult: true,
    },
    {
      id: 2,
      title: "MOVIE 02",
      url: "https://picsum.photos/seed/picsum/200/300",
      overview:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Excepturi quas rem molestiae",
      release_date: "26/06/12",
      adult: true,
    },
    {
      id: 3,
      title: "MOVIE 03",
      url: "https://picsum.photos/seed/picsum/200/300",
      overview:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Excepturi quas rem molestiae",
      release_date: "26/06/12",
      adult: true,
    },
    {
      id: 4,
      title: "MOVIE 03",
      url: "https://picsum.photos/seed/picsum/200/300",
      overview:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Excepturi quas rem molestiae",
      release_date: "26/06/12",
      adult: true,
    },
    {
      id: 5,
      title: "MOVIE 03",
      url: "https://picsum.photos/seed/picsum/200/300",
      overview:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Excepturi quas rem molestiae",
      release_date: "26/06/12",
      adult: true,
    },
    {
      id: 6,
      title: "MOVIE 03",
      url: "https://picsum.photos/seed/picsum/200/300",
      overview:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Excepturi quas rem molestiae",
      release_date: "26/06/12",
      adult: true,
    },
    {
      id: 7,
      title: "MOVIE 03",
      url: "https://picsum.photos/seed/picsum/200/300",
      overview:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Excepturi quas rem molestiae",
      release_date: "26/06/12",
      adult: true,
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
      <section className="px-14 bg-black">
        <h1 className="text-white text-4xl py-5">MIS FAVORITOS</h1>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
          {mockDataSearchMovies.map((movie, index) => (
            <CardFavoriteMovie movie={movie} index={index}></CardFavoriteMovie>
          ))}
        </div>
      </section>
    </>
  );
}

export default App;
