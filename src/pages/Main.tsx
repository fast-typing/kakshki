import { ThemeProvider } from "@emotion/react";
import { CircularProgress } from "@mui/material";
import { truncate } from "fs";
import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import { Movie } from "../interfaces/Interfaces";

export default function Main() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://dvigit.onrender.com/read_all_films')
            .then(response => response.json())
            .then((data) => {
                const dataMovies = data.map((movie: Movie) => {
                    return <MovieCard key={movie.id} movie={movie}></MovieCard>
                })
                setMovies(dataMovies)
                setLoading(false)
            })
            .catch(error => console.error(error));
    }, [])

    return (
        <div className="main-container">
            <main>
                {loading ? <CircularProgress /> : movies}
            </main>
        </div>
    );
}