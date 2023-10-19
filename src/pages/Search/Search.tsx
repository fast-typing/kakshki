import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import { Movie } from "../../interfaces/Interfaces";
import Select from "@mui/material/Select";
import CasinoRoundedIcon from "@mui/icons-material/CasinoRounded";
import { useNavigate } from "react-router-dom";
import MovieSceleton from "../../components/MovieSceleton/MovieSceleton";
import AdaptiveContainer from "../../components/AdaptiveContainer/AdaptiveContainer";

export default function Search() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [defMovies, setDefMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    title: "",
    country: "",
    genre: "",
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
        setMovies(res);
        setTimeout(() => {
          setSkeleton((prev) => {
            return { ...prev, loading: false };
          });
        }, 1000);
      })
      .catch((error) => console.error(error));
  }, []);

  function handleChange(e) {
    setFilter((prev) => {
      return {
        ...filter,
        [e.target.name]: e.target.value,
      };
    });
    console.log(filter);
  }

  function routeToRandom() {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const id = movies[randomIndex].id;
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
          name="genre"
          onChange={handleChange}
          value={filter.genre}
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
        >
          <CasinoRoundedIcon />
        </IconButton>
      </div>
      <AdaptiveContainer
        html={
          skeleton.loading
            ? skeleton.skeleton
            : movies.length
            ? movies.map((movie) => <MovieCard key={movie.id} movie={movie}></MovieCard>)
            : "Пусто :("
        }
      />
    </div>
  );
}
