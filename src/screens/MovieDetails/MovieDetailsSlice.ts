import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk, RootState} from '../../store';
import {fetchMovieDetails} from '../../api';
import {Movie} from '../../interfaces';

const initialState: MovieDetailsState = {
  movieDetails: null,
  isLoading: false,
};

type MovieDetailsState = {
  movieDetails: Movie | null;
  isLoading: boolean;
};

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    setMovieDetails: (state, action: PayloadAction<Movie>) => {
      state.movieDetails = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {setMovieDetails, setLoading} = movieDetailsSlice.actions;

export const selectMovieDetails = (state: RootState) =>
  state.moviedetails.movieDetails;
export const selectIsLoading = (state: RootState) =>
  state.moviedetails.isLoading;

export const fetchMovieDetailsAsync =
  (movieId: number): AppThunk =>
  async dispatch => {
    try {
      dispatch(setLoading(true));
      const movieDetails = await fetchMovieDetails(movieId);
      dispatch(setMovieDetails(movieDetails));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

export default movieDetailsSlice.reducer;
