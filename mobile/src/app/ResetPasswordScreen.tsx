import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App"; // 👈 import your RootStackParamList

const { width, height } = Dimensions.get("window");

// Props type from navigation
type Props = NativeStackScreenProps<RootStackParamList, "ResetPasswordScreen">;

export default function ResetPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    // Step 1: Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    try {
      // Step 2: Call backend to check if email exists in Firebase
      const response = await fetch(
        "http://172.20.10.4:8080/api/auth/reset-password?email=" + email,
        { method: "POST" }
      );

      // If backend returned HTML (e.g. error page), prevent JSON parse crash
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid response from server");
      }

      if (data.status === "success") {
        // Show 4-digit code
        Alert.alert("Your 4-digit code", data.code, [
          {
            text: "Enter Code",
            onPress: () =>
              navigation.navigate("EnterCodeScreen", {
                email,
                code: data.code,
              }),
          },
        ]);
      } else {
        Alert.alert("Error", "This email is not registered.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={styles.backArrow}
        onPress={() => navigation.goBack()} // 👈 back navigation
      >
        ←
      </Text>

      <View style={styles.content}>
        <Text style={styles.title}>Reset password</Text>
        <Text style={styles.subtitle}>
          Enter the email associated with your account and we’ll send an email
          with instructions to reset your password.
        </Text>

        <Text style={styles.label}>Email address</Text>
        <TextInput
          placeholder="example@gmail.com"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Send Instructions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8ecd9",
    padding: 20,
    paddingTop: 40,
  },
  backArrow: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 30,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#444",
    marginBottom: 30,
    lineHeight: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
    marginBottom: 25,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
