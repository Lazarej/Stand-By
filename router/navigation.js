import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../pages/connected/Home";
import LoginScreen from "../pages/notConnected/Login";
import ForgotPasswordScreen from "../pages/notConnected/ForgotPassword";
import SignupScreen from "../pages/notConnected/Signup";
import GlobalStyles from "../style/GlobalStyles";
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import {UserContext} from "../store/User"
import {  useEffect, useCallback } from "react";
import InterestScreen from "../pages/connected/UserInterest";
import BottomTab from "./BottomTab";

const Stack = createNativeStackNavigator();

export default function Navigation (){

    const {user} = useContext(UserContext)
    const [fontsLoaded] = useFonts({
        RobotoB: require("../assets/fonts/RobotoB.ttf"),
        RobotoN: require("../assets/fonts/RobotoN.ttf"),
        RobotoL: require("../assets/fonts/RobotoL.ttf"),
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

    return(
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
          {user.login ? (
            
            <>
            {
              user.interests ? (
                <Stack.Screen
                name="Tab"
                component={BottomTab}
                options={{ headerShown: false }}
              />
              
              ) :(
               
              <Stack.Screen
              name="Interest"
              component={InterestScreen}
              options={{ title: "" }}
            />
              )
            }
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
    )
}