
import FavoriteScreen from '../pages/connected/Favorite';
import HomeScreen from '../pages/connected/Home';
import BottomTab from './BottomTab';
import { createDrawerNavigator } from '@react-navigation/drawer'
import LoginScreen from '../pages/notConnected/Login';

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="LogHomen" component={HomeScreen} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator