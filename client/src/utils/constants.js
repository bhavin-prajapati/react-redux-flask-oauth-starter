// Action Types
export const CREATE_GAME = 'CREATE_GAME';
export const CREATE_GAME_SUCCESS = 'CREATE_GAME_SUCCESS';
export const CREATE_GAME_FAIL = 'CREATE_GAME_FAIL';
export const GET_GAMES = 'GET_GAMES';
export const GET_GAMES_SUCCESS = 'GET_GAMES_SUCCESS';
export const GET_GAMES_FAIL = 'GET_GAMES_FAIL';
export const GET_GAME = 'GET_GAME';
export const GET_GAME_SUCCESS = 'GET_GAME_SUCCESS';
export const GET_GAME_FAIL = 'GET_GAME_FAIL';
export const LOG_IN = 'LOG_IN';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAIL = 'LOG_IN_FAIL';
export const LOG_OUT = 'LOG_OUT';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAIL = 'LOG_OUT_FAIL';
export const NAVIGATE_TO = 'NAVIGATE_TO';

// API
export const FLASK_APP = import.meta.env.VITE_FLASK_APP;
export const API_SERVER = `${import.meta.env.VITE_API_SERVER}/api/v1`;
export const LOGIN_ENDPOINT = '/login';
export const CREATE_GAME_ENDPOINT = '/create';
export const GET_GAMES_ENDPOINT = '/games';
export const GET_GAME_ENDPOINT = '/game';
export const LOGOUT_ENDPOINT = '/logout';
export const DASHBOARD_ENDPOINT = '/';
export const USER_COOKIE_NAME = 'user';

