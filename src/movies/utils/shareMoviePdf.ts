import type { Movie } from "../interfaces/movie.interface";
import { buildMoviePdfBlob } from "./buildMoviePdfBlob";

export async function shareMoviePdf(movies: Movie[]) {
  const blob = buildMoviePdfBlob(movies);
  const file = new File([blob], "mis-peliculas-favoritas.pdf", {
    type: "application/pdf",
  });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: "Mis películas favoritas",
      });
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Error al compartir el PDF:", error);
      }
    }
  } else {
    const filename = "peliculas-favoritas.pdf";
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    const mensaje = "Te comparto la lista de mis peliculas favoritas";
    window.open(`https://wa.me/?text=${encodeURIComponent(mensaje)}`, "_blank");
  }
}
