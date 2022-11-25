import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GlobalStyles from "../style/GlobalStyles";
import HomeScreen from "../pages/connected/Home";
import NewsLetterScreen from "../pages/connected/NewsLetter";
import ArticleScreen from "../pages/connected/Article";
import FavoriteScreen from "../pages/connected/Favorite";
import SearchScreen from "../pages/connected/Search";
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {RFPercentage} from "react-native-responsive-fontsize";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Details from '../pages/connected/Details';

const name = 'custom'

const Tab = createBottomTabNavigator();

const Stack = createSharedElementStackNavigator({
});


const Stack1Screen = () => (
  <Stack.Navigator>
    <Stack.Screen name={name} options={{ headerShown: false }} component={HomeScreen} />
    <Stack.Screen name="Detail" component={Details} />
  </Stack.Navigator>
);

const Stack2Screen = () => (
  <Stack.Navigator>
    <Stack.Screen name={name} options={{ headerShown: false }} component={NewsLetterScreen} />
    <Stack.Screen name="Detail" component={Details} />
  </Stack.Navigator>
);

const Stack3Screen = () => (
  <Stack.Navigator>
    <Stack.Screen name={name} options={{ headerShown: false }} component={ArticleScreen} />
    <Stack.Screen name="Detail" component={Details} />
  </Stack.Navigator>
);

const Stack4Screen = () => (
  <Stack.Navigator>
    <Stack.Screen name={name} options={{ headerShown: false }} component={FavoriteScreen} />
    <Stack.Screen name="Detail" component={Details} />
  </Stack.Navigator>
);

const Stack5Screen = () => (
  <Stack.Navigator>
    <Stack.Screen name={name} options={{ headerShown: false }} component={SearchScreen} />
    <Stack.Screen name="Detail" component={Details} />
  </Stack.Navigator>
);

export default function BottomTab() {

  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        tabBarStyle: { paddingHorizontal:25,
        height:60,
       },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Stack1Screen}
        options={{
        headerShown: false ,
          tabBarIcon: ({color}) => (
            <AntDesign name="home" size={28} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="NewsLetter"
        component={Stack2Screen}
        options={{
        title:'NewsLetter',
          tabBarIcon: ({color}) => (
            <FontAwesome name="paper-plane-o" size={24} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="Article"
        component={Stack3Screen}
        options={{
          title:'Articles',
         
          tabBarIcon: ({color}) => (
            <Ionicons name="ios-newspaper-outline" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Stack4Screen}
        options={{
          title:'Favorits',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="favorite-outline" size={28} color={color}  />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Stack5Screen}
        options={{
          title:'Recherche',
          tabBarIcon: ({color}) => (
            <AntDesign name="search1" size={26} color={color} />
          ),
        }}
      />
      
      
          
    </Tab.Navigator>
  );
}