import { ThemeProvider } from "@emotion/react";
import { CircularProgress, Skeleton } from "@mui/material";
import { truncate } from "fs";
import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import { Movie } from "../../interfaces/Interfaces";
import './Main.css'

export default function Main() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [skeleton, setSkeleton] = useState([])

    useEffect(() => {
        const skeletons = [1, 1, 1, 1, 1].map((el) => {
            const w = 227
            return <div className="grid gap-1">
                <Skeleton variant="rounded" width={w} height={300} />
                <Skeleton variant="rounded" width={w} height={30} />
                <div className="flex gap-2">
                    <Skeleton variant="rounded" width={w} height={32} />
                </div>
            </div>
        })
        setSkeleton(skeletons)

        fetch('https://dvigit.onrender.com/read_all_films')
            .then(response => response.json())
            .then((res: Movie[]) => {
                const dataMovies = res.map((movie: Movie) => {
                    return <MovieCard key={movie.id} movie={movie}></MovieCard>
                })
                setMovies(dataMovies)
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            })
            .catch(error => console.error(error));
    }, [])

    return (
        <>
            <div className="favorite">
                <h1 className="mb-3">Избранное</h1>
                <div className="flex gap-4">
                    {loading ? skeleton : movies.length ? movies : 'Пусто :('}
                </div>
            </div>
            <div className="favorite">
                <h1 className="mb-3">Новинки</h1>
                <div className="flex gap-4">
                    {loading ? skeleton : movies.length ? movies : 'Пусто :('}
                </div>
            </div>
        </>
    );
}