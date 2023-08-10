import axios from 'axios';
import {Movie, MovieRequest} from '../interfaces';
import {API_BASE_URL, API_KEY} from '@env';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchMovies = async (): Promise<MovieRequest> => {
  try {
    const response = await instance.get('trending/all/week', {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching movies');
  }
};

export const fetchMovieDetails = async (movieId: number): Promise<Movie> => {
  try {
    const response = await instance.get(`/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching movie details');
  }
};
