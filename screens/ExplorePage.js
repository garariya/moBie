import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";

const ExplorePage = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <Text style={styles.header}>Explore</Text>



      <Text style={styles.sectionTitle}>Categories</Text>


      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigation.navigate("MoviesExplore")}
        >
          <View style={styles.gridPoster}>
            <Text style={styles.gridTitle}>Movies</Text>
          </View>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigation.navigate("TVSeriesExplore")}
        >
          <View style={styles.gridPoster}>
            <Text style={styles.gridTitle}>TV Shows</Text>
          </View>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigation.navigate("Animated")}
        >
          <View style={styles.gridPoster}>
            <Text style={styles.gridTitle}>Animated</Text>
          </View>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigation.navigate("Animated")}
        >
          <View style={styles.gridPoster}>
            <Text style={styles.gridTitle}>more categories...</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExplorePage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0c0c0c",
    paddingHorizontal: 15,
    paddingTop: 50,
    flex: 1,
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
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
  },
  gridTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
