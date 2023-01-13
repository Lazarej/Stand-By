import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { RFPercentage } from "react-native-responsive-fontsize";
import ArticleScreen from "../pages/connected/Article";
import FavoriteScreen from "../pages/connected/Favorite";
import HomeScreen from "../pages/connected/Home";
import NewsLetterScreen from "../pages/connected/NewsLetter";
import Modules from "../pages/connected/videos/Modules";
import GlobalStyles from "../style/GlobalStyles";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { View, } from "react-native";
const Drawer = createDrawerNavigator();

export default function DrawerTab() {
  return (
      <Drawer.Navigator initialRouteName="Home"
          screenOptions={{
              drawerType: 'permanent',
               drawerActiveTintColor: GlobalStyles.primary.backgroundColor,
          }} > 
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <AntDesign name="home" size={28} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="NewsLetter"
        component={NewsLetterScreen}
        options={{
            title: "NewsLetter",
             drawerIcon: ({color}) => (
              <FontAwesome name="paper-plane-o" size={24} color={color} />
           ),
        
        }}
      />
      <Drawer.Screen
        name="Article"
        component={ArticleScreen}
        options={{
          title: "Articles",

          drawerIcon: ({ color }) => (
            <Ionicons name="ios-newspaper-outline" size={28} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          title: "Favorits",
          drawerIcon: ({ color }) => (
            <MaterialIcons name="favorite-outline" size={28} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Vidéos"
        component={Modules}
        options={{
          headerTitleStyle: {
            fontSize: RFPercentage(3.5),
            fontFamily: "RobotoB",
            textTransform: "uppercase",
            color: "white",
          },
          headerStyle: {
            backgroundColor: GlobalStyles.primary.color,
            height: 100,
            borderWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          drawerIcon: ({ color }) => (
            <MaterialIcons name="ondemand-video" size={28} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
