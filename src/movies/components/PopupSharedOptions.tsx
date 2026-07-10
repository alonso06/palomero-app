import { useEffect } from "react";
import { WhatsAppSharedButton } from "./WhatsAppSharedButton";
import type { Movie } from "../interfaces/movie.interface";
import { shareMovieText } from "../utils/shareMovieText";
import { shareMoviePdf } from "../utils/shareMoviePdf";

type Props = {
  setPopupState: React.Dispatch<React.SetStateAction<boolean>>;
  movies: Movie[];
};

export const PopupSharedOptions = ({ setPopupState, movies }: Props) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPopupState(false);
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const onClick = () => {
    setPopupState(false);
  };

  return (
    <>
      <div
        onClick={onClick}
        className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm transition-opacity duration-300 text-white flex justify-center items-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative px-12 py-9 bg-black border border-gray-700 rounded-2xl md:px-24 md:py-16 lg:px-30 lg:py-20"
        >
          <div className="flex justify-center items-center flex-col gap-5">
            <WhatsAppSharedButton
              movies={movies}
              isActive={true}
              text="Compartir como texto"
              movieShareFunction={shareMovieText}
            />
            <WhatsAppSharedButton
              movies={movies}
              isActive={false}
              text="Compartir como pdf"
              movieShareFunction={shareMoviePdf}
            />
          </div>
        </div>
      </div>
    </>
  );
};
