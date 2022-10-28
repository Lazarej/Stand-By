import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import HomeScreen from "./pages/connected/Home";
import LoginScreen from "./pages/notConnected/Login";
import ForgotPasswordScreen from "./pages/notConnected/ForgotPassword";
import SignupScreen from "./pages/notConnected/Signup";
import GlobalStyles from "./style/GlobalStyles";
import {UserStore,UserContext} from "./store/User"
import { useContext } from "react";


const Stack = createNativeStackNavigator();

export default function App() {
 
  const [test , setTest] = useState(false)
  const {user} = useContext(UserContext)
  console.log('app',user)
  const [fontsLoaded] = useFonts({
    RobotoB: require("./assets/fonts/RobotoB.ttf"),
    RobotoN: require("./assets/fonts/RobotoN.ttf"),
    RobotoL: require("./assets/fonts/RobotoL.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const changeState = () => {
    setIsSignIn((prev) => !prev);
  };

  return (
      <UserStore>
        <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerTintColor: GlobalStyles.primary.color,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "" }}
            />

          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "",
            headerShown:false }}
            
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
              options={{ title: "" }}
            
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ title: "" ,
              headerShown:false }}
            
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
      </UserStore>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
