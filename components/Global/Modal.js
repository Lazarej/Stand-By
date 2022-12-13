import {
    View,
    TouchableOpacity,
    Modal,
    StyleSheet
  } from "react-native";
  import { Ionicons } from "@expo/vector-icons";
  import {  Snackbar } from 'react-native-paper';

export default function ModalGlobal(props){

    return(
        <Modal
        animationType="fade"
        transparent={true}
        visible={props.isOpen}
        statusBarTranslucent
      >
        <View style={styles.modal}>
          <View style={styles.categoriesContainer}>
            <TouchableOpacity
              style={{ position: "absolute", top: 10, right: 10 }}
              onPress={props.close}
            >
              <Ionicons name="close-outline" size={34} color="black" />
            </TouchableOpacity>
           {props.children}
          </View>
        </View>
        <Snackbar
    visible={props.snackBar.visible}
    onDismiss={props.onDismiss}
    duration={1500} 
   >
    {props.snackBar.message}
  </Snackbar>
      </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: "rgba(000, 000, 000, 0.3)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
    
      categoriesContainer: {
        height: 550,
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 20,
      },
})