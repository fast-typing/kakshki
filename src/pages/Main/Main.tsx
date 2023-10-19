import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import { Movie } from "../../interfaces/Interfaces";
import "./Main.css";
import MovieSceleton from "../../components/MovieSceleton/MovieSceleton";
import AdaptiveContainer from "../../components/AdaptiveContainer/AdaptiveContainer";

export default function Main() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skeleton, setSkeleton] = useState(
    [1, 1, 1, 1, 1].map((el) => <MovieSceleton />)
  );

  useEffect(() => {
    fetch("https://dvigit.onrender.com/read_all_films")
      .then((response) => response.json())
      .then((res: Movie[]) => {
        setMovies(res);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="favorite">
      <h1 className="mb-3">Новинки</h1>
      <AdaptiveContainer
        html={
          loading
            ? skeleton
            : movies.length
            ? movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}></MovieCard>
              ))
            : "Пусто :("
        }
      />
    </div>
  );
}
