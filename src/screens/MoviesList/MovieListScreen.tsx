import React from 'react';
import {View} from 'react-native';
import MovieList from '../../components/MoviesList';
const MoviesScreen = () => {
  return (
    <View style={{flex: 1, padding: 16}}>
      <MovieList />
    </View>
  );
};

export default MoviesScreen;
