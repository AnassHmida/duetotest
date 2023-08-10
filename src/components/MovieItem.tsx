import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Movie, RootStackParamList} from '../interfaces';
import {useNavigation} from '@react-navigation/native';
import StarRating from 'react-native-star-rating-widget';
import {StackNavigationProp} from '@react-navigation/stack';

const maxRating = 10;
const maxStars = 5;

type MovieItemProps = {
  movie: Movie;
};

const MovieItem = ({movie}: MovieItemProps) => {
  const voteAverage = movie.vote_average;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleItemPress = () => {
    navigation.navigate('Movie Details', {movieId: movie.id});
  };

  const convertedRating = (voteAverage / maxRating) * maxStars;

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

  return (
    <TouchableOpacity style={styles.container} onPress={handleItemPress}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {movie.title || movie.name || movie.original_title || 'N/A'}
        </Text>
        <Text numberOfLines={3} style={styles.description}>
          {movie.overview}
        </Text>
        <StarRating
          rating={convertedRating}
          onChange={() => {}}
          style={styles.starRating}
          starSize={20}
        />
        <View style={styles.releaseDateContainer}>
          <Text style={styles.releaseDateText}>Release Date:</Text>
          <Text style={styles.releaseDate}>{movie.release_date || 'N/A'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 12,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  starRating: {
    marginTop: 8,
  },
  releaseDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  releaseDateText: {
    fontSize: 12,
    color: '#999',
    marginRight: 4,
  },
  releaseDate: {
    fontSize: 10,
    color: '#333',
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 12,
  },
});

export default MovieItem;
