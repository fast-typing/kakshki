import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Skeleton,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import { Movie } from "../../interfaces/Interfaces";
import Select from "@mui/material/Select";
import CasinoRoundedIcon from "@mui/icons-material/CasinoRounded";
import { useNavigate, useSearchParams } from "react-router-dom";
import MovieSceleton from "../../components/MovieSceleton/MovieSceleton";
import AdaptiveContainer from "../../components/AdaptiveContainer/AdaptiveContainer";

export default function Search() {
  const [movies, setMovies] = useState<{ old: Movie[], current: Movie[] }>({ old: [], current: [] });
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    title: "",
    country: "",
    genres: "",
    year: "",
    ageRating: "",
  });
  const [skeleton, setSkeleton] = useState({
    loading: true,
    skeleton: [1, 1, 1, 1, 1].map((el) => <MovieSceleton />),
  });

  useEffect(() => {
    fetch("https://dvigit.onrender.com/read_all_films")
      .then((response) => response.json())
      .then((res: Movie[]) => {
        setMovies({ old: res, current: res })
        for (let key of Object.keys(filter)) { checkQuery(key) }

        setTimeout(() => {
          setSkeleton((prev) => {
            return { ...prev, loading: false };
          });
        }, 1000);
      })
      .catch((error) => console.error(error));
  }, []);


  useEffect(() => {
    for (let key of Object.keys(filter)) { checkQuery(key) }
  }, [searchParams.get('title'), searchParams.get('genres')])

  function checkQuery(name: string) {
    const value = searchParams.get(name)
    if (!value?.length) return
    handleChange({ target: { name: name, value: value } })
  }


  useEffect(() => {
    if (!movies.old.length) return
    let allMovies = movies.old
    allMovies = filterByField('title', allMovies)
    allMovies = filterByField('country', allMovies)
    allMovies = filterByField('year', allMovies)
    allMovies = filterByField('genres', allMovies, true)
    setMovies({ old: movies.old, current: allMovies })
  }, [filter])

  function filterByField(field: string, allMovies: Movie[], isArray = false): Movie[] {
    const value = filter[field]
    if (!value?.length) return allMovies
    if (isArray) {
      return allMovies.filter(movie => movie[field].filter(genre => genre.includes(value)).length)
    } else {
      return allMovies.filter(movie => movie[field].toLowerCase().includes(value))
    }
  }

  function handleChange(e) {
    setFilter({ ...filter, [e.target.name]: e.target.value.toLowerCase(), });
  }

  function routeToRandom() {
    const randomIndex = Math.floor(Math.random() * movies.current.length);
    const id = movies.current[randomIndex].id;
    navigate(`/movie/${id}`);
  }

  return (
    <div className="favorite">
      <div className="flex gap-4 mb-8 items-center flex-wrap">
        {/* <h1 className='mb-4'>Фильтры</h1> */}
        <input
          placeholder="Название"
          name="title"
          onChange={handleChange}
          value={filter.title}
        />
        <input
          placeholder="Год издания"
          name="year"
          onChange={handleChange}
          value={filter.year}
        />
        <input
          placeholder="Жанр"
          name="genres"
          onChange={handleChange}
          value={filter.genres}
        />
        <input
          placeholder="Страна"
          name="country"
          onChange={handleChange}
          value={filter.country}
        />
        <FormControl sx={{ width: "150px" }}>
          <InputLabel id="age">MPAA</InputLabel>
          <Select
            size="small"
            labelId="age"
            name="ageRating"
            label="MPAA"
            onChange={handleChange}
            value={filter.ageRating}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"G"}>0+</MenuItem>
            <MenuItem value={"P"}>6+</MenuItem>
            <MenuItem value={"PG13"}>12+</MenuItem>
            <MenuItem value={"R"}>16+</MenuItem>
            <MenuItem value={"NC17"}>18+</MenuItem>
          </Select>
        </FormControl>
        <IconButton
          size="large"
          sx={{ height: "fit-content" }}
          onClick={routeToRandom}
          disabled={!movies.current.length}
        >
          <CasinoRoundedIcon />
        </IconButton>
      </div>
      <AdaptiveContainer
        html={
          skeleton.loading
            ? skeleton.skeleton
            : movies.current.length
              ? movies.current.map((movie) => (
                <MovieCard key={movie.id} movie={movie}></MovieCard>
              ))
              : "Пусто :("
        }
      />
    </div>
  );
}
