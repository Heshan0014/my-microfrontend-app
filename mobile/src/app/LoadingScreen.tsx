import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Animated, Dimensions } from "react-native";

export default function LoadingScreen({ navigation }: any) {
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animate progress bar
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000, // 2 seconds
      useNativeDriver: false,
    }).start(() => {
      navigation.replace("SignIn"); // navigate to Welcome screen after loading
    });
  }, []);

  // Interpolate progress width
  const screenWidth = Dimensions.get("window").width;
  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, screenWidth * 0.6], // bar is 60% of screen width
  });

  return (
    <View style={styles.container}>
      {/* Logo + Brand Name */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logo.png")} // 👈 your G logo image
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>Glidex</Text>
      </View>

      {/* Center Image */}
      <Image
        source={require("../../assets/images/shopping.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Progress Bar */}
      <View style={styles.progressBackground}>
        <Animated.View style={[styles.progressFill, { width: barWidth }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2e1cf",
    paddingHorizontal: 20,
  },
  logoContainer: {
    position: "absolute",
    top: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: 55, // adjust size
    height: 55,
    marginRight: 8,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "600",
    color: "#000",
  },
  image: {
    width: "80%",
    height: 450,
    marginBottom: 50,
  },
  progressBackground: {
    width: "60%",
    height: 10,
    borderRadius: 5,
    backgroundColor: "#f7e7d8",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#000",
  },
});
