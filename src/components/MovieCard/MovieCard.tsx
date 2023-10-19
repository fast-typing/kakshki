import React, { useState } from "react";
import { Movie } from "../../interfaces/Interfaces";
import StarIcon from '@mui/icons-material/Star';
import './MovieCard.css'
import { Chip } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export default function MovieCard(props: { movie: Movie }) {
    const [isFavorite, setIsFavorite] = useState(false)

    function toGenre() { }

    function getGenres() { return props.movie.genres.map((genre) => <Chip onClick={toGenre} label={genre} variant="outlined" />) }

    function toggleFavorite(): void { setIsFavorite(!isFavorite) }

    return (
        <div className="card">
            <div className="float-icon">
                <IconButton onClick={toggleFavorite} color={isFavorite ? "secondary" : "success"}>
                    {isFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
            </div>
            <img src='https://www.iephb.ru/wp-content/uploads/2021/01/img-placeholder.png' alt={props.movie.poster} />
            {/* <img src={props.movie.poster} alt={props.movie.poster} /> */}
            <div className="flex justify-between items-center">
                <h2>{props.movie.title}</h2>
                <div className="flex">
                    <StarIcon />
                    <span>{props.movie.average_rating}</span>
                </div>
            </div>
            <div className="flex gap-2">
                {getGenres()}
            </div>
        </div>
    )
}