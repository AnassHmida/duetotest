import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectMovieDetails,
  selectIsLoading,
  fetchMovieDetailsAsync,
} from './MovieDetailsSlice';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';

import {AppDispatch} from '../../store';
import {RootStackParamList} from '../../interfaces';
import StarRating from 'react-native-star-rating-widget';

type MovieDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'Movie Details'
>;

const MovieDetailsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const route = useRoute<MovieDetailsScreenRouteProp>();
  const {movieId} = route.params;
  const movieDetails = useSelector(selectMovieDetails);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchMovieDetailsAsync(movieId));
  }, [dispatch, movieId]);

  if (isLoading || !movieDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const maxRating = 10;
  const maxStars = 5;
  const convertedRating = (movieDetails.vote_average / maxRating) * maxStars;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`,
        }}
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{movieDetails.title}</Text>
      </View>
      <StarRating
        rating={convertedRating}
        onChange={() => {}}
        style={styles.starRating}
        starSize={20}
      />
      <Text style={styles.releaseDate}>
        Release Date: {movieDetails.release_date}
      </Text>
      <Text style={styles.overview}>{movieDetails.overview}</Text>
      <Text style={styles.originalTitle}>
        Original Title: {movieDetails.original_title || 'N/A'}
      </Text>
      <Text style={styles.originalLanguage}>
        Original Language: {movieDetails.original_language}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F4F4',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  starRating: {},
  releaseDate: {
    marginTop: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  overview: {
    fontSize: 18,
    marginBottom: 12,
  },
  originalTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  originalLanguage: {
    fontSize: 16,
    marginBottom: 12,
  },
  popularity: {
    fontSize: 16,
    marginBottom: 12,
  },
  voteCount: {
    fontSize: 16,
    marginBottom: 12,
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 12,
  },
});

export default MovieDetailsScreen;
