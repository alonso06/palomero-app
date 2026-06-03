import { useEffect, useState } from "react";
import { Header } from "./shared/components/Header";
import { getTrendingMoviesByDay } from "./movies/actions/get-trending-movies-by-day.action";
import type { Movie } from "./movies/interfaces/movie.interface";
import { Carrousel } from "./movies/components/Carrousel";

function App() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  const getTrendingMovies = async () => {
    console.log("Open function");
    const movies = await getTrendingMoviesByDay();
    console.log("movies ", movies);
    setTrendingMovies(movies);
  };

  // useEffect(() => {
  //   console.log("useeffect");
  //   getTrendingMovies();
  // }, []);

  return (
    <>
      <Header />
      <section className="w-full h-screen text-black flex flex-col justify-center items-center">
        {/* SearchMovies */}
        <Carrousel></Carrousel>
      </section>
    </>
  );
}

export default App;
