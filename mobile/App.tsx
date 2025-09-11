import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingScreen from "./src/app/LoadingScreen";
import WelcomeScreen from "./src/app/WelcomeScreen";
import SignInScreen from "./src/app/SignInScreen";
import RegisterScreen from "./src/app/RegisterScreen";

// Define all screens and their params
export type RootStackParamList = {
  Loading: undefined;
  Welcome: undefined;
  SignIn: undefined;
  Register: undefined;
};

// Create a typed stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
