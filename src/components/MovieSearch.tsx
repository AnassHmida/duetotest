import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type MovieSearchProps = {
  searchQuery: string;
  onSearchChange: (text: string) => void;
};

const MovieSearch: React.FC<MovieSearchProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <TextInput
      placeholder="Search movies..."
      value={searchQuery}
      onChangeText={onSearchChange}
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12, 
    borderRadius: 20, 
    backgroundColor: '#F0F0F0', 
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
});

export default MovieSearch;