// src/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';

// Combine Reducers
const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;