import { useEffect, useState } from "react";
import { Header } from "./shared/components/Header";
import { getTrendingMoviesByDay } from "./movies/actions/get-trending-movies-by-day.action";
import type { Movie } from "./movies/interfaces/movie.interface";
import { Carrousel } from "./movies/components/Carrousel";

function App() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  const getTrendingMovies = async () => {
    const movies = await getTrendingMoviesByDay();
    setTrendingMovies(movies);
  };

  useEffect(() => {
    console.log("useeffect");
    getTrendingMovies();
  }, []);

  return (
    <>
      <Header />
      <section className="w-full h-3/4 text-black flex flex-col justify-center items-center">
        {/* SearchMovies */}
        <Carrousel movies={trendingMovies}></Carrousel>
      </section>
      <section>
        <h1 className="text-4xl text-black">MIS FAVORITOS</h1>
        <div className="bg-amber-200 h-44"></div>
      </section>
    </>
  );
}

export default App;
