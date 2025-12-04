import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';

const AnimatedMovies = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const nowPlayingURL = `https://api.themoviedb.org/3/discover/movie?with_genres=16&primary_release_year=2024`;
  const popularURL = `https://api.themoviedb.org/3/discover/movie?with_genres=16&sort_by=popularity.desc&language=en-US&page=1`;
  const topRatedURL = `https://api.themoviedb.org/3/discover/movie?with_genres=16&sort_by=vote_average.desc&language=en-US&page=1`;
  const upcomingURL = `https://api.themoviedb.org/3/discover/movie?with_genres=16&sort_by=release_date.asc&language=en-US&page=1`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTY5YjlhYTA3ODIyMGMyOGIxYmY4ZmExOWU1OTAyYSIsIm5iZiI6MTc2MTUyMzU5OC4xOTYsInN1YiI6IjY4ZmViNzhlYzZmNDdkNmNmZjlmYjE2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UJYnZZ-clw15PZT2nNK0hLUrpGCbPLxdJDgy7zLDYuA",
    },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const nowRes = await fetch(nowPlayingURL, options);
        const nowData = await nowRes.json();
        setNowPlayingMovies(nowData.results || []);

        const popularRes = await fetch(popularURL, options);
        const popularData = await popularRes.json();
        setPopularMovies(popularData.results || []);

        const topRes = await fetch(topRatedURL, options);
        const topData = await topRes.json();
        setTopRatedMovies(topData.results || []);

        const upcomingRes = await fetch(upcomingURL, options);
        const upcomingData = await upcomingRes.json();
        setUpcomingMovies(upcomingData.results || []);
      } catch (error) {
        console.error("Error fetching animated movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const filterMovies = (movies) =>
    movies.filter((movie) => movie.title?.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleMoviePress = (movie) => {
    navigation.navigate("MovieCard", {
      movie: {
        id: movie.id,
        title: movie.title,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        overview: movie.overview,
        release_date: movie.release_date,
      },
    });
  };

  const noResults =
    filterMovies(nowPlayingMovies).length === 0 &&
    filterMovies(popularMovies).length === 0 &&
    filterMovies(topRatedMovies).length === 0 &&
    filterMovies(upcomingMovies).length === 0 &&
    searchQuery.trim() !== "";

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Animated Movies</Text>

      <TextInput
        style={styles.searchBox}
        placeholder="Search..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {noResults ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No results found 😞</Text>
        </View>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          <FlatList
            data={filterMovies(upcomingMovies)}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleMoviePress(item)} style={styles.movieContainer}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                  style={styles.poster}
                />
                <Text style={styles.movieTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />

          <Text style={styles.sectionTitle}>Now Playing</Text>
          <FlatList
            data={filterMovies(nowPlayingMovies)}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleMoviePress(item)} style={styles.movieContainer}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                  style={styles.poster}
                />
                <Text style={styles.movieTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />

          <Text style={styles.sectionTitle}>Popular</Text>
          <FlatList
            data={filterMovies(popularMovies)}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleMoviePress(item)} style={styles.movieContainer}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                  style={styles.poster}
                />
                <Text style={styles.movieTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />

          <Text style={styles.sectionTitle}>Top Rated</Text>
          <FlatList
            data={filterMovies(topRatedMovies)}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleMoviePress(item)} style={styles.movieContainer}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                  style={styles.poster}
                />
                <Text style={styles.movieTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </ScrollView>
  );
};

export default AnimatedMovies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 15,
  },
  searchBox: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  movieContainer: {
    marginRight: 12,
  },
  poster: {
    width: 150,
    height: 220,
    borderRadius: 12,
  },
  movieTitle: {
    color: '#fff',
    width: 150,
    marginTop: 5,
    fontSize: 14,
  },
  noResultsContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  noResultsText: {
    color: '#fff',
    fontSize: 16,
  },
});
