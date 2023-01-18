import { useEffect, useRef, useState, useContext } from "react";
import {
  Animated,
  Text,
  Modal,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyles from "../../../style/GlobalStyles";
import { UserContext } from "../../../store/User";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Link } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons'; 

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const layout = Math.floor(useWindowDimensions().width - 80);
  const SlideIn = useRef(new Animated.Value(-layout)).current;

  useEffect(() => {}, []);

  const SlideInAnim = () => {
    setIsOpen((prev) => (prev = !prev));
    Animated.timing(SlideIn, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const SlideOutAnim = () => {
    Animated.timing(SlideIn, {
      toValue: -layout,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsOpen((prev) => (prev = !prev));
    });
  };

  return (
    <View>
      <Feather
        style={{ marginLeft: "10%" }}
        onPress={() => SlideInAnim()}
        name="menu"
        size={44}
        color="#fff"
      />
      <Modal
        animationType="fade"
        statusBarTranslucent
        transparent={true}
        visible={isOpen}
      >
        <View style={styles.modal}>
          <Animated.View
            style={{
              ...styles.drawer,
              width: layout,
              transform: [{ translateX: SlideIn }],
            }}
          >
            <View>
              <View style={styles.drawerHeader}>
                <View style={{ width: 100 }}>
                  <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={() => SlideOutAnim()}
                  >
                    <Ionicons
                      name="arrow-back-outline"
                      size={30}
                      color={GlobalStyles.primary.color}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.drawerBody}>      
                <View style={styles.rowLink}>
                  <AntDesign
                    style={styles.icon}
                    name="search1"
                    size={24}
                    color="#AAAAAA"
                  />
                  <Link style={styles.drawerLink} to={{ screen: "search"}}>
                    Recherche...
                  </Link>
                </View>
                <View style={styles.rowLink}>
                  <MaterialCommunityIcons
                    style={styles.icon}
                    name="checkbox-multiple-blank-outline"
                    size={24}
                    color="#AAAAAA"
                  />
                  <Link style={styles.drawerLink} to={{ screen: "InterestOnLog"}}>
                    Vos intéréts
                  </Link>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={logout}
              style={{
                width: "100%",
                justifyContent: "center",
                height: 80,
                alignItems: "center",
              }}
            >
              <Text style={styles.deconnexion}>Déconnexion</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "rgba(000, 000, 000, 0.3)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  drawer: {
    height: "100%",
    position: "absolute",
    left: 0,
    justifyContent: "space-between",
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },

  drawerHeader: {
    justifyContent: "flex-end",
    height: 100,
    width: "100%",
  },

  drawerBody: {
    width: "100%",
    
    paddingVertical: 50,
   
  },

  rowLink: {
    flexDirection: "row",
    paddingVertical:12,
    paddingHorizontal: 15,
    borderBottomWidth:1,
    borderColor: "#F4F4F4",
    
  },

  drawerLink: {
    fontSize: RFPercentage(2.7),
    color: "#AAAAAA",
  },

  icon: {
    marginRight: 20,
  },

  deconnexion: {
    color: GlobalStyles.primary.color,
    fontSize: RFPercentage(2.9),
  },
});
