// src/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';

// Combine Reducers
const rootReducer = combineReducers({
  user: authReducer,
  // Add other reducers here if you have more
});

export default rootReducer;