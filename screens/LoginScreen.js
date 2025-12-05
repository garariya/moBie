import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const REACT_APP_API_URL = "https://smartpick-backend-69k1.onrender.com"; 
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${REACT_APP_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("user", JSON.stringify(data.user));

        navigation.replace("Tabs", {
          userName: data.user.name,
        });
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Something went wrong, try again");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

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

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.switchText}>
          Don’t have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Signup")}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f7fb",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    padding: 25,
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    width: "100%",
    padding: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginTop: 6,
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 25,
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
    fontWeight: "600",
  },
});
