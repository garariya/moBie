import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  ActivityIndicator, 
  TouchableOpacity 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function AccountCenter() {
  const navigation = useNavigation();
  const API = "https://smartpick-backend-69k1.onrender.com"

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) return navigation.navigate("Login");

      try {
        const res = await fetch(`${API}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();
        setUser(data);

      } catch (error) {
        console.log("Fetch user error:", error);
      }
    };

    fetchUser();
  }, [navigation]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };

  const handleDelete = async () => {
    Alert.alert(
      "Delete Account",
      "This action is permanent. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            const token = await AsyncStorage.getItem("token");
            if (!token) return navigation.navigate("Login");

            try {
              const res = await fetch(`${API}/api/auth/delete-account`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
              });

              const data = await res.json();

              if (!res.ok) {
                Alert.alert("Error", data.message || "Delete failed");
                return;
              }

              await AsyncStorage.removeItem("token");

              Alert.alert("Deleted", "Your account has been permanently deleted.");
              navigation.navigate("Signup");

            } catch (err) {
              console.log("Delete error:", err);
              Alert.alert("Error", "Something went wrong!");
            }
          }
        }
      ]
    );
  };

  if (!user) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Your Profile</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user.name}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.btn, styles.logoutBtn]} onPress={handleLogout}>
            <Text style={styles.btnText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, styles.deleteBtn]} onPress={handleDelete}>
            <Text style={styles.btnText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    elevation: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },

  field: {
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },

  value: {
    fontSize: 18,
    marginTop: 5,
    color: "#222",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: "center",
  },

  logoutBtn: {
    backgroundColor: "#444",
  },

  deleteBtn: {
    backgroundColor: "#d9534f",
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
