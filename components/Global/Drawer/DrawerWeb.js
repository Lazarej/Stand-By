import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image, StyleSheet } from "react-native";
import { View } from "react-native-web";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { UserContext } from "../../../store/User";

export default function DrawerWeb(props) {
      const { logout } = useContext(UserContext);
  return (
    <DrawerContentScrollView
      {...props}
    >
      <View>
        <View style={styles.drawerHeader}>
          <Image
            source={require("../../../assets/images/icon.png")}
            style={styles.icon}
          />
        </View>
        <DrawerItemList {...props} />
      </View>
          <DrawerItem
              activeTintColor="red"
              inactiveTintColor="red"
              onPress={() => logout()}
              label={'Déconnexion'}
              icon={() =>  <Ionicons name="exit-outline" size={30} color="red" />}
          />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
    justifyContent: "center",
    paddingLeft: 10,
  },

  icon: {
    height: 40,
    width: 40,
  },

  exitRow: {
      flexDirection: "row",
      height: 60,
      marginLeft: 20,
      marginTop:10
  },
});
