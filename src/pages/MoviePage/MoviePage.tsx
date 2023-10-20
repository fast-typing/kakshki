import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../../interfaces/Interfaces";
import { CircularProgress, Rating, Skeleton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { red } from "@mui/material/colors";
import { getMovie, markFilm } from "../../http/http";
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie>();
  const [alignment, setAlignment] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingButtons, setLoadingButtons] = useState<boolean>(false);
  const fields = {
    country: 'Страна',
    genres: 'Жанры',
    year: 'Год создания',
    director: 'Режиссер',
    writers: 'Сценаристы',
    producers: 'Продессеры',
    cinematographers: 'Операторы',
    composers: 'Композиторы',
    art_directors: 'Художники',
    editor: 'Монтажеры',
    budget: 'Бюджет',
    box_office_world: 'Сборы',
    age_rating: "Рейтинг MPAA",
    premiere_russia: 'Премьера в России',
    premiere_world: 'Премьера в мире',
  }
  const [mainInfo, setMainInfo] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const movie = await getMovie(id)
      if (!movie) return
      setMovie(movie);
      const info = []
      for (let key of Object.keys(fields)) {
        info.push(<div key={key} className="flex gap-2 items-center justify-between sm:justify-normal">
          <span className="w-[200px]">{fields[key]}: </span>
          <h3>{movie[key]}</h3>
        </div>)
      }
      setMainInfo(info)
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }

    fetchData()
  }, []);

  //!!!!!
  const handleAlignment = async (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: "postoponed" | "abondoned" | "finished",
  ) => {
    setLoadingButtons(true)
    const token = '123'
    const res = await markFilm(token, movie.id, newAlignment)
    setTimeout(() => {
      if (res) { setAlignment(newAlignment); }
      setLoading(false)
    }, 2000)
  };

  const toggleButtons = [
    { value: 'finished', icon: <CheckRoundedIcon />, text: 'Просмотрено' },
    { value: 'postoponed', icon: <AccessTimeRoundedIcon />, text: 'Отложено' },
    { value: 'abondoned', icon: <DeleteIcon />, text: 'Брошено' }
  ].map((item) => {
    return (
      <ToggleButton className="w-full grid sm:w-fit sm:flex" value={item.value}>
        {item.icon}
        <span className="ml-1 hidden sm:block">{item.text}</span>
      </ToggleButton>
    )
  })

  return (
    <div>
      {loading ? (
        <div className="grid gap-4 w-full">
          <div className="grid gap-1">
            <Skeleton variant="rounded" width={200} height={36}></Skeleton>
            <Skeleton variant="rounded" width={200} height={24}></Skeleton>
          </div>
          <Skeleton variant="rounded" width={400} height={47}></Skeleton>
          <div className="grid lg:flex gap-8 w-full">
            <Skeleton variant="rounded" width='100%' height={600}></Skeleton>
            <Skeleton variant="rounded" width={700} height={600}></Skeleton>
            <Skeleton variant="rounded" width='100%' height={300}></Skeleton>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 w-full">
          <div className="grid gap-1">
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
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            disabled={loadingButtons}
          >
            {toggleButtons}
          </ToggleButtonGroup>
          <div className="grid lg:flex gap-8 w-full">
            <img src={movie.poster} className="w-full mb-6" alt="" />
            <div className="grid gap-2 h-fit">
              {mainInfo}
            </div>
            <video className="w-full h-fit" controls >
              <source
                // src={movie.trailer}
                src='https://video-preview.s3.yandex.net/OHRcNgIAAAA.mp4'
                type="video/mp4" />
              Your browser doesn't support HTML5 video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
