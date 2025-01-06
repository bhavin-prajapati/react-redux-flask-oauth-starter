import {
  CREATE_GAME,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAIL,
  GET_GAMES,
  GET_GAMES_SUCCESS,
  GET_GAMES_FAIL,
  GET_GAME,
  GET_GAME_SUCCESS,
  GET_GAME_FAIL
} from '../utils/constants';

export const createGame = (gameConfig) => {
  return { type: CREATE_GAME, data: gameConfig };
};

export const createGameSuccess = (message) => {
  return { type: CREATE_GAME_SUCCESS, data: message };
};

export const createGameFailed = (error) => {
  return { type: CREATE_GAME_FAIL, data: error };
};

export const getGames = () => {
  return { type: GET_GAMES };
};

export const getGamesSuccess = (games) => {
  return { type: GET_GAMES_SUCCESS, data: games };
};

export const getGamesFailed = (error) => {
  return { type: GET_GAMES_FAIL, data: error };
};

export const getGame = () => {
  return { type: GET_GAME };
};

export const getGameSuccess = (games) => {
  return { type: GET_GAME_SUCCESS, data: game };
};

export const getGameFailed = (error) => {
  return { type: GET_GAME_FAIL, data: error };
};
