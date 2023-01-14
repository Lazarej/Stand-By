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
import { Button } from "react-native-paper";
import DrawerWeb from "../components/Global/Drawer/DrawerWeb";
const Drawer = createDrawerNavigator();

export default function DrawerTab() {
  return (
    <Drawer.Navigator initialRouteName="Home"
      drawerContent={props => <DrawerWeb {...props} /> }
          screenOptions={{
            drawerType: 'permanent',
            drawerActiveTintColor: GlobalStyles.primary.backgroundColor,
            drawerStyle: {
            justifyContent:'space-between'
    },
            headerLeft: () => (
              null
            ) 
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
         title:'Modules',
          drawerIcon: ({ color }) => (
            <MaterialIcons name="ondemand-video" size={28} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
