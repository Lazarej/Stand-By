import 'react-native-gesture-handler';
import {UserStore} from "./store/User"
import Navigation from "./router/navigation";

export default function App() {

  return (
      <UserStore>
       <Navigation/>
      </UserStore>
  );
}