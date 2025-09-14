import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <LinearGradient
        colors={["#fdf7f2", "#f7eadd", "#f2e0d0"]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Abstract background shapes */}
      <View style={[styles.wave, styles.waveTop]} />
      <View style={[styles.wave, styles.waveMiddle]} />
      <View style={[styles.wave, styles.waveBottom]} />

      {/* Logo & Brand */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>Glidex</Text>
      </View>

      {/* Image layout */}
      <View style={styles.imageWrapper}>
        {/* Left image */}
        <Image
          source={require("../../assets/images/model1.png")}
          style={styles.leftImage}
        />
        {/* Right stacked images */}
        <View style={styles.rightImageColumn}>
          <Image
            source={require("../../assets/images/model2.png")}
            style={styles.rightImage}
          />
          <Image
            source={require("../../assets/images/model3.png")}
            style={styles.rightImage}
          />
        </View>
      </View>

      {/* Tagline */}
      <Text style={styles.tagline}>
        The Fashion App Where{"\n"}Your Designs Meet the World
      </Text>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("RegisterScreen")} 
      >
        <Text style={styles.buttonText}>Let’s Get Started</Text>
      </TouchableOpacity>

      {/* Sign in */}
      <Text style={styles.footerText}>
  Already have an account?{" "}
  <Text
    style={styles.signIn}
    onPress={() => navigation.navigate("SignInScreen")} // 👈 update here
  >
    Sign in
  </Text>
</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  // Waves
  wave: {
    position: "absolute",
    width: width * 1.5,
    height: height * 0.7,
    borderRadius: width,
    opacity: 0.35,
  },
  waveTop: {
    backgroundColor: "#fbe6d7",
    top: -height * 0.4,
    left: -width * 0.3,
    transform: [{ rotate: "25deg" }],
  },
  waveMiddle: {
    backgroundColor: "#f3d9c3",
    top: height * 0.1,
    right: -width * 0.4,
    transform: [{ rotate: "-15deg" }],
  },
  waveBottom: {
    backgroundColor: "#edd1b8",
    bottom: -height * 0.35,
    left: -width * 0.2,
    transform: [{ rotate: "20deg" }],
  },

  logoContainer: {
    position: "absolute",
    top: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: 55,
    height: 55,
    marginRight: 8,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "600",
    color: "#000",
  },

  // Image layout
  imageWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    width: "100%",
  },
  leftImage: {
    width: 120,
    height: 280,
    borderRadius: 60,
    marginRight: 20,
  },
  rightImageColumn: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  rightImage: {
    width: 90,
    height: 120,
    borderRadius: 45,
    marginVertical: 8,
  },

  tagline: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 40,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footerText: {
    fontSize: 14,
    color: "#333",
  },
  signIn: {
    color: "#007bff",
    fontWeight: "600",
  },
});