export interface Movie {
  title: string;
  poster: string;
  trailer: string;
  created_at: number;
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
  id: number
}
