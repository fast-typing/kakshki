import React, { useState } from "react";
import { Movie } from "../../interfaces/Interfaces";
import StarIcon from '@mui/icons-material/Star';
import Button from "@mui/material/Button";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './MovieCard.css'

export default function MovieCard(props: { movie: Movie }) {
    const [isFavorite, setIsFavorite] = useState(false)

    function getGenres() {
        return props.movie.genres.map((genre) => <div>{genre}</div>) 
    }

    function toggleFavorite(): void {
        setIsFavorite((prev) => !prev)
    }

    return (
        <div className="card">
            <div className="float-icon">
                <Button sx={{ paddingX: 1.25, paddingY: 1, width: "fit-content", minWidth: "fit-content" }} variant="outlined" onClick={toggleFavorite}>
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </Button>
            </div>
            <img src={props.movie.poster} alt={props.movie.poster} />
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