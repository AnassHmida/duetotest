import {combineReducers} from '@reduxjs/toolkit';
import MovieListSlice from '../screens/MoviesList/MovieListSlice';
import MovieDetailsSlice from '../screens/MovieDetails/MovieDetailsSlice';

const rootReducer = combineReducers({
  movies: MovieListSlice,
  moviedetails: MovieDetailsSlice,
});

export default rootReducer;
