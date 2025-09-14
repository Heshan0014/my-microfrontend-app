import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

type RootStackParamList = {
  NewPasswordScreen: { email: string };
  LoginScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "NewPasswordScreen">;

export default function NewPasswordScreen({ navigation, route }: Props) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { email } = route.params;

  const handleNewPassword = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    Alert.alert("Success", "Password updated successfully!", [
      { text: "Login", onPress: () => navigation.navigate("LoginScreen") },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <Text style={styles.backArrow}>←</Text>

      {/* Title */}
      <Text style={styles.title}>New Password</Text>
      <Text style={styles.subtitle}>
        Your new password must be different from previously used passwords
      </Text>

      {/* New Password */}
      <Text style={styles.label}>New Password</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="New Password"
          secureTextEntry={!showNewPassword}
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity
          onPress={() => setShowNewPassword(!showNewPassword)}
        >
          <Ionicons
            name={showNewPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password */}
      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={!showConfirmPassword}
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons
            name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleNewPassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8ecd9", // beige background like screenshot
    padding: 20,
    paddingTop: 40,
  },
  backArrow: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
    lineHeight: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
