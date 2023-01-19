import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GlobalStyles from "../style/GlobalStyles";
import HomeScreen from "../pages/connected/Home";
import NewsLetterScreen from "../pages/connected/NewsLetter";
import ArticleScreen from "../pages/connected/Article";
import FavoriteScreen from "../pages/connected/Favorite";
import SearchScreen from "../pages/connected/Search";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {RFPercentage} from "react-native-responsive-fontsize";
import { AntDesign } from '@expo/vector-icons'; 
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Details from '../pages/connected/Details';
import Modules from '../pages/connected/videos/Modules';



const Tab = createBottomTabNavigator();



export default function BottomTab() {

  return (
    <Tab.Navigator
      initialRouteName="Home"
       sceneContainerStyle={{ backgroundColor: 'white' }}
      screenOptions={{
        headerTitleStyle:{
          fontSize: RFPercentage(3.5),
          fontFamily:'RobotoB',
          textTransform: 'uppercase',       
        },
        headerTitleAlign:'center',
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: GlobalStyles.primary.backgroundColor,
        tabBarShowLabel:false,
        headerStyle: {
        height:100,
       },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
        headerShown: false ,
          tabBarIcon: ({color}) => (
            <AntDesign name="home" size={28} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="NewsLetter"
        component={NewsLetterScreen}
        options={{
        title:'NewsLetter',
          tabBarIcon: ({color}) => (
            <FontAwesome name="paper-plane-o" size={24} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="Article"
        component={ArticleScreen}
        options={{
          title:'Articles',
         
          tabBarIcon: ({color}) => (
            <Ionicons name="ios-newspaper-outline" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          title:'Favorits',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="favorite-outline" size={28} color={color}  />
          ),
        }}
      />
      <Tab.Screen
        name="Vidéos"
        component={Modules}
        options={{
          headerTitleStyle:{
             fontSize: RFPercentage(3.5),
             fontFamily:'RobotoB',
             textTransform: 'uppercase', 
             color:'white'
          },
          headerStyle:{
             backgroundColor: GlobalStyles.primary.color,
             height:100,    
             borderWidth: 0,
             elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0
          },
          tabBarIcon: ({color}) => (
            <MaterialIcons name="ondemand-video" size={28} color={color} />
          ),
        }}
      />
      
      
          
    </Tab.Navigator>
  );
}