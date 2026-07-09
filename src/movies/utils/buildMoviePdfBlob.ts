import type { Movie } from "../interfaces/movie.interface";
import jsPDF from "jspdf";

export function buildMoviePdfBlob(movies: Movie[]): Blob {
  const doc = new jsPDF();
  let y = 20;

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Mis películas favoritas", 10, y);
  y += 15;

  movies.forEach((movie, index) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(movie.title, 10, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Fecha: ${movie.release_date}`, 10, y);
    y += 6;

    doc.text(`+18: ${movie.adult ? "Sí" : "No"}`, 10, y);
    y += 6;

    const sinopsis = doc.splitTextToSize(movie.overview, 180);
    doc.text(sinopsis, 10, y);
    y += sinopsis.length * 5 + 5;

    if (index < movies.length - 1) {
      doc.setDrawColor(200);
      doc.line(10, y, 200, y);
      y += 10;
    }
  });

  return doc.output("blob");
}
