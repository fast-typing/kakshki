import React, { useState } from "react";
import { Movie } from "../../interfaces/Interfaces";
import StarIcon from "@mui/icons-material/Star";
import "./MovieCard.css";
import { Chip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useNavigate } from "react-router-dom";
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { markFilm } from "../../http/http";

export default function MovieCard(props: { movie: Movie }) {
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function toGenre(genre: string) {
    navigate(`/search?genres=${genre}`);
  }

  function getGenres() {
    return props.movie.genres.map((genre) => (
      <Chip onClick={() => toGenre(genre)} label={genre} variant="outlined" />
    ));
  }

  // !!!
  async function toggleFavorite() {
    setLoading(true)
    const token = '123'
    const res = await markFilm(token, props.movie.id, "favorite")
    setTimeout(() => {
      if (res) { setFavorite(!favorite) }
      setLoading(false)
    }, 2000)
  }

  const routeToMovie = () => {
    navigate(`/movie/${props.movie.id}`);
  };

  const floatIcon = loading ? <RefreshRoundedIcon className="loading" /> : (favorite ? <BookmarkIcon /> : <BookmarkBorderIcon />)

  return (
    <div className="card">
      <div className="float-icon">
        <IconButton disabled={loading} onClick={toggleFavorite}>{floatIcon}</IconButton>
      </div>
      <div className="grid gap-1 cursor-pointer" onClick={routeToMovie}>
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
