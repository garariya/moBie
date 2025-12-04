import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const ExplorePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Movies Box */}
      <TouchableOpacity
        style={styles.boxContainer}
        onPress={() => navigation.navigate("MoviesExplore")}
      >
        <LinearGradient
          colors={["#ff8c00", "#ff0080"]}
          style={styles.gradientBox}
        >
          <Text style={styles.boxText}>Movies</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* TV Series Box */}
      <TouchableOpacity
        style={styles.boxContainer}
        onPress={() => navigation.navigate("TVSeriesExplore")}
      >
        <LinearGradient
          colors={["#0099ff", "#8a2be2"]}
          style={styles.gradientBox}
        >
          <Text style={styles.boxText}>TV Shows</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.boxContainer}
        onPress={() => navigation.navigate("Animated")}
      >
        <LinearGradient
          colors={["#3DFF99", "#0FA958"]}
          style={styles.gradientBox}
        >
          <Text style={styles.boxText}>Animated</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ExplorePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  boxContainer: {
    width: "90%",
    marginVertical: 12,
    borderRadius: 20,
    overflow: "hidden",
  },

  gradientBox: {
    width: "100%",
    paddingVertical: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  boxText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
