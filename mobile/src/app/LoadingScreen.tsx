import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function LoadingScreen({ navigation }: any) {
  useEffect(() => {
    // Simulate loading time (2 seconds)
    setTimeout(() => {
      navigation.replace("Home");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#6200ee" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: "#6200ee"
  }
});
