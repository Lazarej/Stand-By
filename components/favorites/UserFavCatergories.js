import { View, Text , StyleSheet, Touchable, TouchableOpacity, Modal, Alert} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import GlobalStyles from "../../style/GlobalStyles";
import { MaterialIcons } from '@expo/vector-icons';

export default function UserFavCategories (){

    const [isOpen ,setIsOpen] = useState(false)

    return(
        <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setIsOpen( prev => !prev)}>
            <Text style={ isOpen ? {...styles.text, color:GlobalStyles.primary.color} : {...styles.text}}>Catégories</Text>
            <AntDesign name="right" size={24}  style={isOpen ? {marginTop:5, color:GlobalStyles.primary.color, transform:[{rotate:'90deg'}]} : {marginTop:5, color:'black'}} />
            </TouchableOpacity>

            <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen} 
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setIsOpen(!isOpen);
        }}>
         <View style={styles.modal}>
            <View style={styles.categoriesContainer}>
                <View style={{flexDirection:'row'}}>
                <Text style={styles.modalText}>Mes catégories</Text>
                </View>
                <View>
                    <Text>Ajouter une categorie</Text>
                </View>

            </View>

         </View>
        </Modal>
        </View>
    )
}

const styles = StyleSheet.create({

    button:{
       flexDirection:'row'
    },

    rowContainer:{
      alignItems:'center',
      flexDirection:'row',
      marginTop:20,
      marginBottom:30
    },

    text:{
        fontFamily:'RobotoN',
        fontSize: RFPercentage(3.3),
        marginRight:10
    },

    modal:{
        backgroundColor:'rgba(255, 255, 255, 0.3)',
        flex:1,
        justifyContent:'center',
        alignItems:'center',

    },

    categoriesContainer:{
        height:'40%',
        width:'80%',
        backgroundColor:'#fff',
        borderRadius:15,
        borderWidth:1,
        borderColor:'#E0E0E0',
        padding:20,
        justifyContent:'space-between'
        
    },

    modalText:{
        fontFamily:'RobotoL',
        fontSize:RFPercentage(3)    }
    

    
})