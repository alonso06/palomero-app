import { useEffect, useState } from "react";
import { Header } from "./shared/components/Header";
import { getTrendingMoviesByDay } from "./movies/actions/get-trending-movies-by-day.action";
import type { Movie } from "./movies/interfaces/movie.interface";
import { Carrousel } from "./movies/components/Carrousel";
import { CardMovie } from "./movies/components/CardMovie";
import { useMovies } from "./movies/hooks/useMovies";
import { PopupSharedOptions } from "./movies/components/PopupSharedOptions";
import { isEntryValid, loadCache, saveCache } from "./movies/lib/cache";

type MovieWithPopularity = Movie & {
  popularity: number;
};
export const FAVORITE_CACHE_KEY: string = "favorite-movie";
const TRENDING_CACHE_KEY: string = "trending-movie";
const TRENDING_TTL: number = 1000 * 60 * 60;

const sortMoviesByPopularity = (movies: MovieWithPopularity[]) => {
  return [...movies].sort((a, b) => b.popularity - a.popularity);
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

  const [popupState, setPopupState] = useState(false);

  const handleSharedClick = () => {
    setPopupState(true);
  };

  const loadMovies = async () => {
    const cache = loadCache(TRENDING_CACHE_KEY);
    const cached = cache["daily"];

    if (isEntryValid(cached, TRENDING_TTL)) {
      setTrendingMovies(cached.data);
      return;
    }

    const movies = await getTrendingMovies();
    setTrendingMovies(movies);
    cache["daily"] = { data: movies, timestamp: Date.now() };
    saveCache(TRENDING_CACHE_KEY, cache);
  };

  useEffect(() => {
    console.log("Cargando películas en tendencia ...");
    loadMovies();
  }, []);

  useEffect(() => {
    const cache = loadCache(FAVORITE_CACHE_KEY);
    console.log("Cache", cache);
    cache["favorites"] = { data: favoriteMovies, timestamp: Date.now() };
    saveCache(FAVORITE_CACHE_KEY, cache);
  }, [favoriteMovies]);

  return (
    <>
      <Header
        idFavoriteMovies={idFavoriteMovies}
        onAddToFavorites={handleFavoriteMovies}
        onDeleteFavorites={handleDeleteFavoriteMovies}
      />
      {popupState ? (
        <PopupSharedOptions
          movies={favoriteMovies}
          setPopupState={setPopupState}
        ></PopupSharedOptions>
      ) : (
        <></>
      )}
      {/* Hero section */}
      <section className="relative w-full h-[70vh] text-black">
        {/*TODO: Agregar título en tendencia */}
        <h1 className="absolute z-20 top-4 left-4 md:top-6 md:left-8 lg:left-14 text-white text-xs md:text-sm lg:text-lg uppercase font-semibold tracking-wider bg-black/60 backdrop-blur-sm px-3 py-1.5 md:py-2 rounded-full">
          En tendencia
        </h1>
        <Carrousel movies={trendingMovies}></Carrousel>
      </section>
      {/* Favorite movies */}
      <section className="px-5 bg-black md:px-8 lg:px-14">
        <h2 className="text-center uppercase text-white font-bold py-5 text-3xl md:text-start md:py-8 md:text-4xl lg:text-5xl lg:py-10">
          Mis favoritos
        </h2>
        {favoriteMovies.length === 0 ? (
          <div className="flex-1 text-white flex flex-col gap-2 justify-center items-center my-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-20 h-20 icon icon-tabler icons-tabler-outline icon-tabler-library-plus md:w-24 md:h-24 lg:w-28 lg:h-28"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 5.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666" />
              <path d="M4.012 7.26a2.005 2.005 0 0 0 -1.012 1.737v10c0 1.1 .9 2 2 2h10c.75 0 1.158 -.385 1.5 -1" />
              <path d="M11 10h6" />
              <path d="M14 7v6" />
            </svg>
            <span className="text-[1rem] md:text-xl">Agrega tus favoritos</span>
          </div>
        ) : (
          <>
            <div className="mb-7 flex items-center gap-5">
              <button
                onClick={handleSharedClick}
                className="text-white text-[1rem] p-3 bg-green-600 rounded-xl hover:bg-green-700 md:text-lg lg:text-xl"
              >
                Compartir por whatsapp
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
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
