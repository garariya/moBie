import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Button,
} from "react-native";

import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";


export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();
  const [micPermissions, requestMicPermission] = useMicrophonePermissions();

  const permissionResult = ImagePicker.requestMediaLibraryPermissionsAsync();

  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [photoUri, setPhotoUri] = useState("https://i.pinimg.com/1200x/6e/62/65/6e62651c41f6b8d7248c1b7f76480e88.jpg");
  const [recording, setRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);

  // Request permissions
  useEffect(() => {
    (async () => {
      if (!permission?.granted) await requestPermission();
      if (!micPermissions?.granted) await requestMicPermission();
      await permissionResult();
    })();
  }, [permission, micPermissions?.granted]);

  // Take picture
  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setPhotoUri(photo.uri);
        console.log("📸 Photo taken:", photo.uri);
      } catch (error) {
        console.log("Error taking picture:", error);
      }
    }
  };

  // Start/Stop recording
  const handleRecord = async () => {
    if (!cameraRef.current || !isCameraReady) return;

    try {
      if (!recording) {
        console.log(" Starting recording...");
        setRecording(true);
        const video = await cameraRef.current.recordAsync({
          quality: "720p"
        });
        setVideoUri(video.uri);
        console.log("Video saved:", video.uri);
      } else {
        console.log("Stopping recording...");
        cameraRef.current.stopRecording();
        setRecording(false);
      }
    } catch (error) {
      console.log("Recording error:", error);
      setRecording(false);
    }
  };

  const trendingURL = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const allMoviesURL = "https://api.themoviedb.org/3/trending/all/day?language=en-US";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTY5YjlhYTA3ODIyMGMyOGIxYmY4ZmExOWU1OTAyYSIsIm5iZiI6MTc2MTUyMzU5OC4xOTYsInN1YiI6IjY4ZmViNzhlYzZmNDdkNmNmZjlmYjE2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UJYnZZ-clw15PZT2nNK0hLUrpGCbPLxdJDgy7zLDYuA",
    },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trendingRes, allRes] = await Promise.all([
          fetch(trendingURL, options),
          fetch(allMoviesURL, options),
        ]);

        const trendingData = await trendingRes.json();
        const allData = await allRes.json();

        setTrendingMovies(trendingData.results || []);
        setAllMovies(allData.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  const filteredTrending = trendingMovies.filter((movie) =>
    movie.title?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAllMovies = allMovies.filter((movie) =>
    (movie.title || movie.name)?.toLowerCase().includes(search.toLowerCase())
  );

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
    filteredTrending.length === 0 &&
    filteredAllMovies.length === 0 &&
    search.trim() !== "";

  return (
    <ScrollView style={styles.container}>
      {/* Display photo */}
      <Image source={{ uri: photoUri }} style={{ width: 160, height: 240, margin: 20 }} />

      {/* Camera preview */}
      <CameraView
        ref={cameraRef}
        style={{ width: 160, height: 240, margin: 20 }}
        facing="back"
        mode="video"
        enableVideoRecording
        enableAudioRecording
        onCameraReady={() => {
          setIsCameraReady(true);
          console.log("✅ Camera ready");
        }}
        hidden={false}
      />

      <Button title="Take Picture" onPress={takePicture} />
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        color={recording ? "red" : "green"}
        onPress={handleRecord}
      />

      {videoUri && (
        <Video
          source={{ uri: videoUri }}
          style={{ width: 200, height: 250, marginTop: 10 }}
          useNativeControls
          resizeMode="cover"
          shouldPlay
        />
      )}

      <Button title="pick an image"
      onPress={async()=>{
        console.log("Pick Image")
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          
        })
      }}></Button>

      <Text style={styles.header}>🎬 moBie</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search movies..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />

      {noResults ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No results found 😞</Text>
        </View>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Trending Now</Text>

          <FlatList
            data={filteredTrending}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.movieCard}
                onPress={() => handleMoviePress(item)}
              >
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  style={styles.poster}
                />
                <Text style={styles.movieTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />

          <Text style={styles.sectionTitle}>All Movies</Text>

          <View style={styles.grid}>
            {filteredAllMovies.map((movie) => (
              <TouchableOpacity
                key={movie.id}
                style={styles.gridItem}
                onPress={() => handleMoviePress(movie)}
              >
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  }}
                  style={styles.gridPoster}
                />
                <Text style={styles.gridTitle}>
                  {movie.title || movie.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0c0c0c",
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  header: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  movieCard: {
    marginRight: 15,
    width: 140,
  },
  poster: {
    width: 140,
    height: 200,
    borderRadius: 10,
  },
  movieTitle: {
    color: "#fff",
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
    paddingBottom: 80,
  },
  gridItem: {
    width: "47%",
    marginBottom: 20,
  },
  gridPoster: {
    width: "100%",
    height: 220,
    borderRadius: 10,
  },
  gridTitle: {
    color: "#fff",
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0c0c0c",
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
