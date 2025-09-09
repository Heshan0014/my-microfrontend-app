import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function SignInScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (email && password) {
      navigation.replace("Home"); // Navigate to Home after sign-in
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Welcome to the Designer Panel</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    paddingTop: 120,  
    padding: 20, 
    backgroundColor: "#f2e1cf" 
  },
  title: { 
    fontSize: 64, 
    fontWeight: "400",
    fontFamily: "Arial", 
    marginBottom: 5,   // 👈 much smaller gap
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "300",
    color: "#333",
    marginBottom: 40,  // 👈 space before inputs
  },
  input: { 
    width: "30%", 
    borderWidth: 1, 
    borderColor: "#ccc", 
    padding: 10, 
    borderRadius: 8, 
    marginBottom: 20, 
    backgroundColor: "#fff" 
  },
  button: { 
    backgroundColor: "#2955e5ff", 
    padding: 10, 
    borderRadius: 8, 
    width: "30%", 
    alignItems: "center" 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "600" 
  },
});
