export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetail extends Movie {
  backdrop_path: string | null;
  runtime: number | null;
  status: string;
  vote_count: number; 
  budget: number;
  revenue: number;

  genres: {
    id: number;
    name: string;
  }[];

  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];

  original_language: string;

  original_title: string;

  spoken_languages: {
  english_name: string;
  iso_639_1: string;
  name: string;
}[];
}