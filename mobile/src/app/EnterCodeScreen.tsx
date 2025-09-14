import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  EnterCodeScreen: { email: string; code: string };
  NewPasswordScreen: { email: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "EnterCodeScreen">;

export default function EnterCodeScreen({ navigation, route }: Props) {
  const { email, code } = route.params;
  const [digits, setDigits] = useState(["", "", "", ""]);

  const inputs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleChange = (text: string, index: number) => {
    const newDigits = [...digits];
    newDigits[index] = text;
    setDigits(newDigits);

    if (text && index < inputs.length - 1) {
      inputs[index + 1].current?.focus();
    }
  };

  const handleVerify = () => {
    const enteredCode = digits.join("");
    if (enteredCode === code) {
      navigation.navigate("NewPasswordScreen", { email });
    } else {
      Alert.alert("Error", "Invalid code!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter 4-digit Code</Text>
      <View style={styles.inputRow}>
        {digits.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputs[index]}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify Code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 30,
    color: "#333",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginBottom: 30,
  },
  input: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    backgroundColor: "#fff",
    elevation: 2,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 8,
    width: "70%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});