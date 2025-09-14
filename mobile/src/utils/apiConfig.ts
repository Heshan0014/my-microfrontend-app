import { Platform } from "react-native";

let baseURL = "http://localhost:8080"; //  for Web + iOS Simulator

if (Platform.OS === "android") {
  baseURL = "http://10.0.2.2:8080"; //  Android Emulator
}

export default baseURL;
