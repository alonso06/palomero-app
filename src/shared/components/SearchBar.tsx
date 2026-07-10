import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  setIsOpen: (state: boolean) => void;
  onQuery: (query: string) => void;
}

export const SearchBar = ({ isOpen, inputRef, setIsOpen, onQuery }: Props) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onQuery(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div
        data-name="SearchBar"
        className={`z-50 absolute inset-x-0 flex items-center justify-center px-8 transition-all duration-300 md:px-14 ${isOpen ? "opacity-100 translate-y-3 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"} `}
      >
        <div className="flex items-center gap-2 max-w-lg bg-white/10 hover:bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 py-3 md:w-full md:gap-3">
          <button onClick={handleSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-5 h-5 icon icon-tabler icons-tabler-outline icon-tabler-search fill-transparent stroke-white/50 shrink-0"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </button>
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar película"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white text-[1rem] placeholder:text-[1rem] placeholder:text-white/50 caret-white md:text-lg md:placeholder:text-lg"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-6 h-6 icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-x fill-transparent stroke-white"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10l4 4m0 -4l-4 4" />
              <path d="M12 3c7.2 0 9 1.8 9 9c0 7.2 -1.8 9 -9 9c-7.2 0 -9 -1.8 -9 -9c0 -7.2 1.8 -9 9 -9" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
