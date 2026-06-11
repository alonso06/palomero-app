export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  media_type: MediaType;
  original_language: OriginalLanguage;
  genre_ids: number[];
  popularity: number;
  release_date: Date;
  softcore: boolean;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export enum MediaType {
  Movie = "movie",
}

export enum OriginalLanguage {
  En = "en",
}
