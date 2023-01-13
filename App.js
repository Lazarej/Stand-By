import 'react-native-gesture-handler';
import {UserStore} from "./store/User"
import Navigation from "./router/navigation";
import { Text, View, FlatList } from "react-native";
export default function App() {
  
  return (
      <UserStore>
       <Navigation/>
      </UserStore>
  );
}