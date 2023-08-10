import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk, RootState} from '../../store';
import {fetchMovies} from '../../api';
import {Movie, MoviesState} from '../../interfaces';

const initialState: MoviesState = {
  movies: [],
  isLoading: false,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
      state.isLoading = false;
    },
  },
});

export const {addMovies} = movieSlice.actions;

export const selectAllMovies = (state: RootState) => state.movies.movies;
export const selectIsLoading = (state: RootState) => state.movies.isLoading;

export const fetchMoviesAsync = (): AppThunk => async dispatch => {
  try {
    dispatch(addMovies([]));
    const teams = await fetchMovies();
    dispatch(addMovies(teams.results));
  } catch (error) {}
};

export default movieSlice.reducer;
