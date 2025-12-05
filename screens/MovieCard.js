import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const MovieCard = ({ route, navigation }) => {
  const { movie } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: movie.poster }} style={styles.poster} />

      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      <Text style={styles.subtitle}>Release Date: {movie.release_date}</Text>

      <TouchableOpacity
        style={styles.trailerButton}
        onPress={() => navigation.navigate('Trailer', { movieId: movie.id })}
      >
        <Text style={styles.trailerButtonText}>🎬 Watch Trailer</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 15,
  },
  poster: {
    width: '100%',
    height: 450,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
  subtitle: {
    color: '#ccc',
    marginVertical: 8,
    fontSize: 16,
  },
  overview: {
    color: '#ddd',
    fontSize: 15,
    lineHeight: 22,
  },
  trailerButton: {
    marginTop: 20,
    borderColor: '#fff',
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trailerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
});

