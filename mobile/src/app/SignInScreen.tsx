import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function SignInScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (email && password) {
      navigation.replace("Home");
    } else {
      alert("Please enter email and password");
    }
  };

  const handleForgotPassword = () => {
    alert("Forgot Password tapped!");
  };

  const handleGoogleSignIn = () => {
    alert("Google Sign In tapped!");
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      {/* Decorative shapes behind content */}
      <View style={[styles.shape, styles.shapeTopLeft]} />
      <View style={[styles.shape, styles.shapeBottomRight]} />
      <View style={[styles.shapeSmall, styles.shapeCenter]} />

      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.title}>Sign In</Text>
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

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Horizontal line with "or sign in with" */}
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or sign in with</Text>
          <View style={styles.line} />
        </View>

        {/* Google Sign In */}
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <Image
            source={require("../../assets/images/google.png")}
            style={styles.googleIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Sign Up Text */}
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpText}>
            Don’t have an account? <Text style={{ fontWeight: "bold" }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "flex-start", 
    alignItems: "center", 
    paddingTop: 80, 
    paddingHorizontal: 20, 
    backgroundColor: "#f2e6db",
    position: "relative",
  },
  content: {
    width: "40%",
    zIndex: 1, // ensures content is above shapes
    alignItems: "center",
  },
  title: { 
    fontSize: 48, 
    fontWeight: "400",
    marginBottom: 5,   
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "300",
    color: "#333",
    marginBottom: 40,  
  },
  input: { 
    width: "40%", 
    borderWidth: 1, 
    borderColor: "#ccc", 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 20, 
    backgroundColor: "#fff" 
  },
  forgotPassword: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 30,
    alignSelf: "flex-end",
  },
  button: { 
    backgroundColor: "#000", 
    padding: 12, 
    borderRadius: 8, 
    width: "40%", 
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "600" 
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#201e1e",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#4b4949",
  },
  googleButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  googleIcon: {
    width: 40,
    height: 40,
  },
  signUpText: {
    marginTop: 15,
    fontSize: 14,
    color: "#000",
  },
  // Shapes
  shape: {
    position: "absolute",
    borderRadius: 200,
    width: width * 0.9,
    height: height * 0.5,
    opacity: 0.6,
    zIndex: 0, // behind content
  },
  shapeTopLeft: {
    top: -height * 0.2,
    left: -width * 0.3,
    backgroundColor: "#d7cec5ff",
    transform: [{ rotate: "25deg" }],
  },
  shapeBottomRight: {
    bottom: -height * 0.2,
    right: -width * 0.3,
    backgroundColor: "#e7ceb7ff",
    transform: [{ rotate: "-20deg" }],
  },
  shapeSmall: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    opacity: 0.5,
    backgroundColor: "#c1b188ff",
  },
  shapeCenter: {
    top: height * 0.3,
    right: -50,
  },
});
