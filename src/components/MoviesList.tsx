import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMoviesAsync,
  selectAllMovies,
  selectIsLoading,
} from '../screens/MoviesList/MovieListSlice';
import { View, FlatList, ActivityIndicator, RefreshControl, Text } from 'react-native';
import { AppDispatch } from '../store';
import MovieItem from './MovieItem';
import MovieSearch from './MovieSearch';
import { Movie } from '../interfaces';

const MovieList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allMovies = useSelector(selectAllMovies);
  const isLoading = useSelector(selectIsLoading);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    dispatch(fetchMoviesAsync());
  }, [dispatch]);

  useEffect(() => {
    const filtered = allMovies.filter(movie =>
      movie.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchQuery, allMovies]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await dispatch(fetchMoviesAsync());
    setIsRefreshing(false);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MovieSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      {filteredMovies.length === 0 ? (
        <Text style={{ textAlign: 'center', marginVertical: 16, color: '#999' }}>
          No movies found
        </Text>
      ) : (
        <FlatList
          data={filteredMovies}
          renderItem={({ item }) => <MovieItem movie={item} />}
          keyExtractor={item => String(item.id)}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
          }
        />
      )}
    </View>
  );
};

export default MovieList;
