import { FormControl, InputLabel, MenuItem, Skeleton, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieCard from '../../components/MovieCard/MovieCard'
import { Movie } from '../../interfaces/Interfaces'
import Select from '@mui/material/Select';

export default function Search() {
    const [movies, setMovies] = useState([])
    const [defMovies, setDefMovies] = useState([])
    const [skeleton, setSkeleton] = useState({ loading: true, skeleton: [] })
    const [filter, setFilter] = useState({ title: '', country: '', genre: '', year: '', ageRating: '' })

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
        setSkeleton({ skeleton: skeletons, loading: skeleton.loading })

        fetch('https://dvigit.onrender.com/read_all_films')
            .then(response => response.json())
            .then((res: Movie[]) => {
                const dataMovies = res.map((movie: Movie) => {
                    return <MovieCard key={movie.id} movie={movie}></MovieCard>
                })
                setMovies(dataMovies)
                setTimeout(() => {
                    setSkeleton(prev => { return { ...prev, loading: false } })
                }, 1000)
            })
            .catch(error => console.error(error));
    }, [])

    function handleChange(e) {
        setFilter(prev => {
            return {
                ...filter,
                [e.target.name]: e.target.value
            }
        })
        console.log(filter)
    }

    return (
        <div className="favorite">
            <div className='flex gap-4 mb-8'>
                {/* <h1 className='mb-4'>Фильтры</h1> */}
                <TextField label='Название' sx={{ width: '150px' }} name='title' onChange={handleChange} value={filter.title} />
                <TextField label='Год создания' sx={{ width: '150px' }} name='year' onChange={handleChange} value={filter.year} />
                <TextField label='Жанр' sx={{ width: '150px' }} name='genre' onChange={handleChange} value={filter.genre} />
                <TextField label='Страна' sx={{ width: '150px' }} name='country' onChange={handleChange} value={filter.country} />
                <FormControl sx={{ width: '150px' }}>
                    <InputLabel id="age">MPAA</InputLabel>
                    <Select labelId="age" name="ageRating" label="MPAA" onChange={handleChange} value={filter.ageRating}>
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value={"G"}>0+</MenuItem>
                        <MenuItem value={"P"}>6+</MenuItem>
                        <MenuItem value={"PG13"}>12+</MenuItem>
                        <MenuItem value={"R"}>16+</MenuItem>
                        <MenuItem value={"NC17"}>18+</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="flex gap-4">
                {skeleton.loading ? skeleton.skeleton : movies.length ? movies : 'Пусто :('}

            </div>
        </div>
    )
}