import { Movie } from "../interfaces/Interfaces";

export function login(data) {
    const url = `https://dvigit.onrender.com/login?username=${data.username}&password=${data.password}`
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch(url, options)
        .then(response => response.json())
        .then((res) => { console.log(res) })
        .catch(error => console.error(error));
}

export function registration(data) {
    const url = 'https://dvigit.onrender.com/registration'
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(url, options)
        .then(response => response.json())
        .then((res) => { console.log(res) })
        .catch(error => console.error(error));
}

export async function markFilm(token: string, filmId: number, type: "favorite" | "postoponed" | "abondoned" | "finished") {
    const url = `https://dvigit.onrender.com/update_user_list?token=${token}&film_id=${filmId}&list_type=${type}`
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    return await fetch(url, options)
        .then(response => response.json())
        .then((res) => res)
        .catch(error => { console.error(error); return false });
}

export async function getMovie(id: string) {
    const url = `https://dvigit.onrender.com/get_film?film_id=${id}`
    return await fetch(url)
        .then((response) => response.json())
        .then((res: Movie) => res)
        .catch((error) => console.error(error));
}