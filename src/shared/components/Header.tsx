import { useEffect, useRef, useState } from "react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const idTimeOut = setTimeout(() => inputRef.current?.focus(), 300);

    return () => {
      clearTimeout(idTimeOut);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-10 bg-black/55 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      ></div>
      <div className="relative py-4 px-14 bg-black gap-20 text-center flex flex-row justify-between">
        <a
          className={`text-white text-xl ${isOpen ? "blur-sm opacity-30 pointer-events-none" : ""}`}
          href="#"
        >
          CINEFILO
        </a>
        <div
          className={`z-20 absolute inset-x-0 flex items-center justify-center px-14 transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"} `}
        >
          <div className="flex items-center gap-3 w-full max-w-lg bg-white/10 hover:bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 py-3">
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
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar película"
              className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-white/50 caret-white"
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
        <div>
          <button
            onClick={() => setIsOpen(true)}
            className={`transition-all duration-200 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-6 h-6 hover:w-6.5 hover:h-6.5 hover:stroke-white icon icon-tabler icons-tabler-outline icon-tabler-search fill-transparent stroke-white/80 shrink-0"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
