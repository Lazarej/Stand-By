import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import {  useState } from "react";
import GlobalStyles from "../../style/GlobalStyles";
import UserCategories from "../Global/UserCategories";
import ModalGlobal from "../Global/Modal";

export default function UserFavCategories() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.rowContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsOpen((prev) => !prev)}
      >
      
      </TouchableOpacity>
      <ModalGlobal isOpen={isOpen} close={() =>setIsOpen(!isOpen)}>
      <UserCategories title={'Catégories'}/> 
      </ModalGlobal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
  },

  rowContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 30,
  },

  text: {
    fontFamily: "RobotoN",
    fontSize: RFPercentage(3.3),
    marginRight: 10,
  },

  
   
  contentContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
  },
  

});
