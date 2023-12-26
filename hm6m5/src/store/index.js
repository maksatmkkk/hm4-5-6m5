import { configureStore, combineReducers } from "@reduxjs/toolkit";
import movieReducer from "./slices/movieSlice";
import seriesReducer from "./slices/seriesSlice";
import searchReducer from "./slices/searchSlice"; 
import authReducer from "./slices/AuthSlice"; 
import seriesDetailReducer from './slices/seriesDetailSlice';
import movieDetailReducer from './slices/movieDetailSlice';

const rootReducer = combineReducers({
  movie: movieReducer,
  series: seriesReducer,
  search: searchReducer,
  auth: authReducer,
  seriesDetail: seriesDetailReducer,
  movieDetail: movieDetailReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
