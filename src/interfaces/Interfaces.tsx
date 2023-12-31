export interface Movie {
  title: string;
  poster: string;
  trailer: string;
  country: string;
  genres: string[];
  year: number;
  director: string;
  writers: string[];
  producers: string[];
  cinematographers: string[];
  composers: string[];
  art_directors: string[];
  editor: string[];
  budget: string;
  box_office_world: string;
  age_rating: "G" | "P" | "PG13" | "R" | "NC17";
  average_rating: number;
  premiere_russia?: string;
  premiere_world: string;
  is_planned: boolean;
  is_abandoned: boolean;
  is_favorite: boolean;
  is_postponed: boolean;
  is_finished: boolean;
  id: number;
}

export interface Review {
  id: number;
  username: string;
  user_id: string;
  film_id: number;
  rating: number;
  message: string;
  title: string;
  created_at: string;
}

export interface User {
  id: string;
  username: string;
  planned_films: [];
  abandoned_films: [];
  favorite_films: [];
  postponed_films: [];
  finished_films: [];
  // current_films: [];
}

export interface Registration {
  id: string
}