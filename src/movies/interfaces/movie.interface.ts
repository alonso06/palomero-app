export interface Movie {
  id: number;
  title: string;
  url: string | null;
  overview: string;
  popularity?: number;
  release_date: Date;
  adult: boolean;
}
