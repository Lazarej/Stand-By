import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import HomeScreen from "./pages/connected/Home";
import SignupScreen from "./pages/notConnected/Signup";
import ForgotPasswordScreen from "./pages/notConnected/ForgotPassword";
import RegisterScreen from "./pages/notConnected/Register";
import GlobalStyles from "./style/GlobalStyles";

function DetailsScreen({ route, navigation }) {
  const { itemId, otherParam, isSignedIn } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>itemId: {itemId}</Text>
      <Text>otherParam: {otherParam}</Text>
      <Text>Details Screen {isSignedIn}</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate("Details")}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="change"
        onPress={() => {
          isSignedIn = !isSignedIn;
          console.log(isSignedIn);
        }}
      ></Button>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignIn] = useState(false);

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
        {isSignedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "" }}
            />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              initialParams={{ isSignedIn }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ title: "",
            headerShown:false }}
            
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
              options={{ title: "" }}
            
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: "" ,
              headerShown:false }}
            
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
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
