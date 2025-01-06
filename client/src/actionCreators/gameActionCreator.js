import api from '../utils/api';
import * as game from '../actions/game';

export const createGame = (gameConfig) => {
  return (dispatch) => {
    dispatch(game.createGame(gameConfig));
    api.createGame(gameConfig)
      .then((response) => {
        if (response.data.error) {
          dispatch(game.createGameFailed(response.data.error));
        } else if (response.data.message) {
          dispatch(game.createGameSuccess(response.data.message));
        }
      });
  };
};

export const getGames = () => {
  return (dispatch) => {
    dispatch(game.getGames());
    api.getGames()
      .then((response) => {
        if (response.data.error) {
          dispatch(game.getGamesFailed(response.data.error));
        } else if (response.data) {
          dispatch(game.getGamesSuccess(response.data));
        }
      });
  };
};

export const getGame = (gameId) => {
  return (dispatch) => {
    dispatch(game.getGame());
    api.getGame(gameId)
      .then((response) => {
        if (response.data.error) {
          dispatch(game.getGameFailed(response.data.error));
        } else if (response.data) {
          dispatch(game.getGameSuccess(response.data));
        }
      });
  };
};



export default { createGame, getGames, getGame }