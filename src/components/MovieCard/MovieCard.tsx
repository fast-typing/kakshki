import React, { useState } from "react";
import { Movie } from "../../interfaces/Interfaces";
import StarIcon from "@mui/icons-material/Star";
import "./MovieCard.css";
import { Chip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useNavigate } from "react-router-dom";

export default function MovieCard(props: { movie: Movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  function toGenre(genre: string) {
    navigate(`/search?genre=${genre}`);
  }

  function getGenres() {
    return props.movie.genres.map((genre) => (
      <Chip onClick={() => toGenre(genre)} label={genre} variant="outlined" />
    ));
  }

  function toggleFavorite(): void {
    setIsFavorite(!isFavorite);
  }

  const routeToMovie = () => {
    navigate(`/movie/${props.movie.id}`);
  };

  return (
    <div className="card">
      <div className="grid gap-1 cursor-pointer" onClick={routeToMovie}>
        <div className="float-icon">
          <IconButton
            onClick={toggleFavorite}
            color={isFavorite ? "secondary" : "success"}
          >
            {isFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
        <img
          src={
            props.movie.poster == "string"
              ? "https://www.iephb.ru/wp-content/uploads/2021/01/img-placeholder.png"
              : props.movie.poster
          }
          alt={props.movie.poster}
        />
        <div className="flex justify-between items-center">
          <h2>{props.movie.title}</h2>
          <div className="flex">
            <StarIcon />
            <span>{props.movie.average_rating}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">{getGenres()}</div>
    </div>
  );
}
