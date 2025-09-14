// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingScreen from "./src/app/LoadingScreen";
import WelcomeScreen from "./src/app/WelcomeScreen";
import SignInScreen from "./src/app/SignInScreen";
import RegisterScreen from "./src/app/RegisterScreen";

export type RootStackParamList = {
  Loading: undefined;
  Welcome: undefined;
  SignIn: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Welcome to Micro Frontend App 🚀</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LocationPreference"
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
