import axios from 'axios';
import { LOGIN_ENDPOINT, CREATE_GAME_ENDPOINT, GET_GAMES_ENDPOINT, LOGOUT_ENDPOINT, API_SERVER } from './constants';


const login = (username, password) => {
    const options = {
        method: 'post',
        credentials: 'include', // Don't forget to specify this if you need cookies
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body: qs.stringify({
            username: username,
            password: password
        })
    };
    return fetch(BASE_URL + SIGNIN_ENDPOINT, options)
        .then(res => res.json());
};

const logout = () => {
    const config = {
        withCredentials: true,
    };
    return axios.get(`${API_SERVER}${LOGOUT_ENDPOINT}`, config)
        .then((response) => response.json())
};

export const createGame = (gameConfig) => {
    const data = JSON.stringify(gameConfig)
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true,
    };
    return axios.post(`${API_SERVER}${CREATE_GAME_ENDPOINT}`, data, config)
}

export const getGames = () => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true,
    };
    return axios.get(`${API_SERVER}${GET_GAMES_ENDPOINT}`, config)
}

export const getGame = (gameId) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true,
    };
    return axios.get(`${API_SERVER}${GET_GAMES_ENDPOINT}&gameId=${gameId}`, config)
}



export default { login, logout, createGame, getGames, getGame }