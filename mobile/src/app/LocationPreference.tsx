import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  Linking, // ✅ added for opening Google Maps
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App"; // ✅ import global type

const { width, height } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "LocationPreference">;

export default function LocationPreference({ navigation }: Props) {
  const handleAllowLocation = async () => {
    // Request location permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Please allow location access.");
      return;
    }

    try {
      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;
      console.log("User coordinates:", latitude, longitude);

      // Open Google Maps centered on user location
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Error", "Unable to open Google Maps");
      }

      // Optional: save location to Firestore or navigate forward here
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Could not access location.");
    }
  };

  const handleManualEntry = () => {
    navigation.navigate("ManualLocation"); // ✅ works if you add ManualLocation in App.tsx
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#fdf7f2", "#f2e6db"]}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={[styles.shape, styles.shapeBottomRight]} />

      <View style={styles.container}>
        <Image
          source={require("../../assets/images/location.png")}
          style={styles.icon}
          resizeMode="contain"
        />

        <Text style={styles.title}>What is Your Location?</Text>
        <Text style={styles.subtitle}>
          We need to know your location in order to suggest nearby services.
        </Text>

        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={handleAllowLocation}
        >
          <MaterialCommunityIcons
            name="map-marker"
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.buttonText}>Allow Location Access</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={handleManualEntry}
        >
          <Text style={styles.buttonTextSecondary}>
            Enter Location Manually
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  icon: { width: 80, height: 80, marginBottom: 30 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 8, textAlign: "center" },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  buttonPrimary: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6B4226",
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: "80%",
    justifyContent: "center",
    marginBottom: 15,
  },
  buttonSecondary: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6B4226",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  buttonTextSecondary: { color: "#6B4226", fontSize: 16, fontWeight: "600" },
  shape: {
    position: "absolute",
    backgroundColor: "#EED9C4",
    opacity: 0.6,
    borderRadius: 0,
    width: width * 0.6,
    height: height * 0.85,
  },
  shapeBottomRight: {
    bottom: -height * 0.3,
    right: width * 0.5,
    backgroundColor: "#D9B99B",
    transform: [{ rotate: "300deg" }],
  },
});
