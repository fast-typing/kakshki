export function login(data) {
    fetch(
        'https://dvigit.onrender.com/login',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: data.username, password: data.password })
        })
        .then(response => response.json())
        .then((res) => { console.log(res) })
        .catch(error => console.error(error));
}

export function registration(data) {
    fetch(
        'https://dvigit.onrender.com/login',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: data.username, password: data.password })
        })
        .then(response => response.json())
        .then((res) => { console.log(res) })
        .catch(error => console.error(error));
}