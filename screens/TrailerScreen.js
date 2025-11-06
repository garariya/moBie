import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Alert } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const TMDB_API_KEY = '1569b9aa078220c28b1bf8fa19e5902a';  

const TrailerScreen = ({ route }) => {
  const { movieId } = route.params;
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const data = await res.json();

        console.log("📦 TMDB Response:", data);

        const trailer = data.results.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          Alert.alert('No Trailer', 'Sorry, no trailer found for this movie.');
        }
      } catch (error) {
        console.error('❌ Error fetching trailer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [movieId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  if (!trailerKey) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: '#fff' }}>No trailer available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={300}
        play={true}
        videoId={trailerKey}
        onError={(e) => console.log('❌ YouTube Player Error:', e)}
      />
    </View>
  );
};

export default TrailerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
