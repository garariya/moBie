import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function SignupScreen() {
  const REACT_APP_API_URL = "https://smartpick-backend-69k1.onrender.com";
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${REACT_APP_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Signup response:", data);

      if (res.ok) {
        Alert.alert("Success", "Signup successful!");

        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        if (data.token) {
          await AsyncStorage.setItem("token", data.token);
        }

        navigation.replace("Tabs", {
          userName: data.user.name,
        });
      } else {
        Alert.alert("Signup Failed", data.message || "Try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join us and get started</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(value) => handleChange("name", value)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(value) => handleChange("email", value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={formData.password}
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.switchText}>
          Already have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7fb",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    padding: 25,
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 25,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 15,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#4A90E2",
    marginTop: 25,
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  switchText: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 15,
  },
  link: {
    color: "#4A90E2",
    fontWeight: "700",
  },
});
