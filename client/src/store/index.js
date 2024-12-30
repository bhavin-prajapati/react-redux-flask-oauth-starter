// src/store/store.js
import logger from 'redux-logger'
import { configureStore, Tuple } from '@reduxjs/toolkit';
import rootReducer from '../reducers/index';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
