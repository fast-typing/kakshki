import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../../interfaces/Interfaces";
import { CircularProgress, Rating } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { red } from "@mui/material/colors";

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`https://dvigit.onrender.com/get_film?film_id=${id}`)
      .then((response) => response.json())
      .then((res: Movie) => {
        setMovie(res);
        console.log(res);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="flex gap-8">
          <img src={movie.poster} alt="" />
          <div className="grid gap-4">
            <div className="grid">
              <h1>{movie.title}</h1>
              <div className="flex gap-2">
                <span>{movie.average_rating}</span>
                <Rating
                  max={10}
                  precision={0.1}
                  defaultValue={movie.average_rating}
                  readOnly
                  sx={{ color: red[500] }}
                />
              </div>
            </div>
            <div className="grid gap-1">
            <div className="flex gap-2 items-center">
                <span>Год создания: </span>
                <h3>{movie.year}</h3>
              </div>
              <div className="flex gap-2 items-center">
                <span>Бюджет: </span>
                <h3>{movie.budget}</h3>
              </div>
              <div className="flex gap-2 items-center">
                <span>Страна: </span>
                <h3>{movie.country}</h3>
              </div>
              <div className="flex gap-2 items-center">
                <span>Возратсной рейтинг: </span>
                <h3>{movie.age_rating}</h3>
              </div>
              <div className="flex gap-2 items-center">
                <span>Директор: </span>
                <h3>{movie.director}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
