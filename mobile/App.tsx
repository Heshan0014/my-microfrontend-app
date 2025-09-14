// App.tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import EnterCodeScreen from ".//src/app/EnterCodeScreen";
import NewPasswordScreen from ".//src/app/NewPasswordScreen";
import RegisterScreen from ".//src/app/RegisterScreen";
import ResetPasswordScreen from ".//src/app/ResetPasswordScreen";
import SignInScreen from ".//src/app/SignInScreen";
import StyleProfileSetup from ".//src/app/StyleProfileSetup";
import WelcomeScreen from ".//src/app/WelcomeScreen";
import LoadingScreen from "./src/app/LoadingScreen";


export type RootStackParamList = {
  Loading: undefined;
  Welcome: undefined;
  SignInScreen: undefined;
  ResetPasswordScreen: { email: string };
  EnterCodeScreen: { email: string; code: string };
  RegisterScreen: undefined;
  NewPasswordScreen: { email: string };
  Home: undefined;
  StyleProfileSetup: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Emoji accessibility warning is for web; safe to use in React Native */}
      <Text style={{ fontSize: 20 }}>Welcome to Micro Frontend App 🚀</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StyleProfileSetup"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen name="EnterCodeScreen" component={EnterCodeScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="StyleProfileSetup" component={StyleProfileSetup} />
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}