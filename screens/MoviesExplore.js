import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import React,{useEffect, useState} from 'react'

const MoviesExplore = ({navigation}) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`;
  const popularURL = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`
  const topRatedURL = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`
  const upcomingURL = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTY5YjlhYTA3ODIyMGMyOGIxYmY4ZmExOWU1OTAyYSIsIm5iZiI6MTc2MTUyMzU5OC4xOTYsInN1YiI6IjY4ZmViNzhlYzZmNDdkNmNmZjlmYjE2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UJYnZZ-clw15PZT2nNK0hLUrpGCbPLxdJDgy7zLDYuA",
    },
  };


  useEffect(()=>{
    const fetchMovies = async() => {
      try {
        const nowPlayingRes = await fetch(nowPlayingURL, options);
        const nowPlayingData = await nowPlayingRes.json();
        setNowPlayingMovies(nowPlayingData.results || []);

        const popularRes = await fetch(popularURL, options);
        const popularData = await popularRes.json();
        setPopularMovies(popularData.results || []);

        const topRatedRes = await fetch(topRatedURL, options);
        const topRatedData = await topRatedRes.json();
        setTopRatedMovies(topRatedData.results || []);

        const upcomingRes = await fetch(upcomingURL, options);
        const upcomingData = await upcomingRes.json();
        setUpcomingMovies(upcomingData.results || []);
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    }

    fetchMovies();
  },[])
  

  const filteredNowPlayingMovies = nowPlayingMovies.filter((movie)=> 
    movie.title?.toLowerCase().includes(searchQuery.toLowerCase()))
  
    const filteredPopularMovies = popularMovies.filter((movie)=>
    movie.title?.toLowerCase().includes(searchQuery.toLowerCase()))
  
    const filteredTopRatedMovies = topRatedMovies.filter((movie)=>
    movie.title?.toLowerCase().includes(searchQuery.toLowerCase()))
  
    const filteredUpcomingMovies = upcomingMovies.filter((movie)=>
    movie.title?.toLowerCase().includes(searchQuery.toLowerCase()))

    

    const handleMoviePress = (movie) => {
      navigation.navigate("MovieCard", {
        movie: {
          id: movie.id,
          title: movie.title || movie.name,
          poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          overview: movie.overview,
          release_date: movie.release_date || movie.first_air_date,
        },
      });
    };

    const noResults =
    filteredNowPlayingMovies.length === 0 &&
    filteredPopularMovies.length === 0 &&
    filteredTopRatedMovies.length === 0 &&
    filteredUpcomingMovies.length === 0 &&
    searchQuery.trim() !== "";

  return (

    <ScrollView  style={{flex:1, backgroundColor:"#000"}}>
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>MoviesExplore</Text>

      <TextInput 
        style={styles.searchBox}
        placeholderTextColor="#999"
        placeholder='search...'
        value={searchQuery}
        onChangeText={setSearchQuery}
        />
        {
          noResults ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No results found 😞</Text>
            </View>
          ) : (
            <>
              <Text style={styles.sectionTitle}>Upcoming Movies</Text>
      <FlatList
            data={filteredUpcomingMovies}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleMoviePress(item)}
              >
                <Image
                style={styles.poster}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                />
                <Text style={styles.movieTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />

      <Text style={styles.sectionTitle}>Now Playing in theatres</Text>
      <FlatList
            data={filteredNowPlayingMovies}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleMoviePress(item)}
              >
                <Image
                style={styles.poster}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                />
                <Text style={styles.movieTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />

      <Text style={styles.sectionTitle}>Popular Movies</Text>
      <FlatList
            data={filteredPopularMovies}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleMoviePress(item)}
              >
                <Image
                style={styles.poster}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                />
                <Text style={styles.movieTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />

      <Text style={styles.sectionTitle}>Top Rated Movies</Text>
      <FlatList
            data={filteredTopRatedMovies}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleMoviePress(item)}
              >
                <Image
                style={styles.poster}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                />
                <Text style={styles.movieTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
            </>
          )}
    </View>
    </ScrollView>
  )
}

export default MoviesExplore

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },

  sectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },

  movieTitle: {
    color: "white",
    width: 120,
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },

  poster: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginRight: 10,
  },

  searchBox: {
    width: "100%",
    height: 45,
    backgroundColor: "#222",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "white",
    marginVertical: 10,
  },

  listContainer: {
    marginBottom: 20,
  },
  noResultsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  noResultsText: {
    color: "#999",
    fontSize: 18,
  },
});
