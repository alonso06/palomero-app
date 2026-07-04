import { useEffect } from "react";
import { Header } from "./shared/components/Header";
import { getTrendingMoviesByDay } from "./movies/actions/get-trending-movies-by-day.action";
import type { Movie } from "./movies/interfaces/movie.interface";
import { Carrousel } from "./movies/components/Carrousel";
import { CardMovie } from "./movies/components/CardMovie";
import { useMovies } from "./movies/hooks/useMovies";
import { WhatsAppSharedButton } from "./movies/components/WhatsAppSharedButton";

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
  const {
    favoriteMovies,
    idFavoriteMovies,
    trendingMovies,
    handleDeleteFavoriteMovies,
    handleFavoriteMovies,
    setTrendingMovies,
  } = useMovies();

  const loadMovies = async () => {
    const movies = await getTrendingMovies();
    setTrendingMovies(movies);
  };

  useEffect(() => {
    console.log("Cargando películas en tendencia ...");
    loadMovies();
  }, []);

  return (
    <>
      <Header
        idFavoriteMovies={idFavoriteMovies}
        onAddToFavorites={handleFavoriteMovies}
        onDeleteFavorites={handleDeleteFavoriteMovies}
      />
      {/* Hero section */}
      <section className="w-full h-[70vh] text-black flex flex-col justify-center items-center">
        {/* SearchMovies */}
        <Carrousel movies={trendingMovies}></Carrousel>
      </section>
      {/* Favorite movies */}
      <section className="px-14 bg-black">
        <h2 className="text-white text-4xl py-5">MIS FAVORITOS</h2>
        {favoriteMovies.length === 0 ? (
          <div className="flex-1 text-white flex flex-col gap-2 justify-center items-center my-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-28 h-28 icon icon-tabler icons-tabler-outline icon-tabler-library-plus"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 5.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666" />
              <path d="M4.012 7.26a2.005 2.005 0 0 0 -1.012 1.737v10c0 1.1 .9 2 2 2h10c.75 0 1.158 -.385 1.5 -1" />
              <path d="M11 10h6" />
              <path d="M14 7v6" />
            </svg>
            <span className="text-xl">Agrega tus favoritos</span>
          </div>
        ) : (
          <>
            <div className="mb-7 flex items-center gap-5">
              <div className="text-white text-xl">Compartir:</div>
              <WhatsAppSharedButton
                movies={favoriteMovies}
              ></WhatsAppSharedButton>
            </div>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
              {favoriteMovies.map((movie) => (
                <CardMovie
                  mode="favorites"
                  key={movie.id}
                  movie={movie}
                  onDeleteFavorite={handleDeleteFavoriteMovies}
                ></CardMovie>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default App;
