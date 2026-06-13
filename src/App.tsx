import { useEffect, useState } from "react";
import { Header } from "./shared/components/Header";
import { getTrendingMoviesByDay } from "./movies/actions/get-trending-movies-by-day.action";
import type { Movie } from "./movies/interfaces/movie.interface";
import { Carrousel } from "./movies/components/Carrousel";
import { CardFavoriteMovie } from "./movies/components/CardFavoriteMovie";

//TODO: Revisar manejo de excepción
const sortMoviesByPopularity = (movies: Movie[]) => {
  return [...movies].sort((a, b) => {
    b.popularity - a.popularity;
  });
};

const getTrendingMovies = async () => {
  const movies = await getTrendingMoviesByDay();
  return sortMoviesByPopularity(movies);
};

function App() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const loadMovies = async () => {
    const movies = await getTrendingMovies();
    setTrendingMovies(movies);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleFavoriteMovies = (favoriteMovie: Movie) => {
    setFavoriteMovies((prev) => [...prev, favoriteMovie]);
  };
  return (
    <>
      <Header onAddToFavorites={handleFavoriteMovies} />
      {/* Hero section */}
      <section className="w-full h-[70vh] text-black flex flex-col justify-center items-center">
        {/* SearchMovies */}
        <Carrousel movies={trendingMovies}></Carrousel>
      </section>
      {/* Favorite movies */}
      <section className="px-14 bg-black">
        <h2 className="text-white text-4xl py-5">MIS FAVORITOS</h2>
        {favoriteMovies.length === 0 ? (
          <div className="text-white">Agrega tus favoritos</div>
        ) : (
          <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
            {favoriteMovies.map((movie, index) => (
              <CardFavoriteMovie
                key={index}
                movie={movie}
                index={index}
              ></CardFavoriteMovie>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default App;
