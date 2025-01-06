// src/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import gameReducer from './gameReducer';
import uiReducer from './uiReducer';

// Combine Reducers
const rootReducer = combineReducers({
  auth: authReducer,
  games: gameReducer,
  ui: uiReducer
});

export default rootReducer;