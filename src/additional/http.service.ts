import { Movie, Review } from "../interfaces/Interfaces";

export function login(data): Promise<string | void> {
    return _request(`login?username=${data.username}&password=${data.password}`, 'POST')
}

export  function registration(data): Promise<any | void>  {
    return _request(`registration`, 'POST', data)
}

export function getAllMovies(): Promise<Movie[] | void> {
    return _request(`get_all_films`, 'GET')
}

export function markFilm(token: string, filmId: number, type: "favorite" | "postoponed" | "abondoned" | "finished") {
    return _request(`update_user_list?token=${token}&film_id=${filmId}&list_type=${type}`, 'PATCH')
}

export function getMovie(id: string): Promise<Movie | void> {
    return _request(`get_film?film_id=${id}`, 'GET')
}

export function getReviews(movieId: string): Promise<Review[] | void> {
    return _request(`get_all_reviews?film_id=${movieId}`, 'GET')
}

async function _request(path: string, method: string, body?: any) {
    const url = 'https://dvigit.onrender.com/' + path
    const options = { method: method, }
    if (body) {
        options['body'] = JSON.stringify(body)
        options['headers'] = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    return await fetch(url, options)
        .then((response) => response.json())
        .then((res) => res)
        .catch((error) => console.error(error));
}