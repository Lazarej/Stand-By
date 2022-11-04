import { View,StyleSheet, Text, Image } from "react-native";
import LikeButton from "../Button/LikeButton";

export default function NewsCard(props) {
  return (
    <View style={styles.newContainer}>
        <View style={styles.partLeft} >
        <Image
        style={styles.image}
        source={{uri:`http://192.168.0.50:1337${props.image}`}}
        />
      <Text style={styles.title}>{props.title}</Text>
    </View>
    <LikeButton id={props.id } element={props.element}></LikeButton>
    </View>
  );
}


const styles = StyleSheet.create({
    newContainer:{
        width: "100%",
        height: 100,
       
        paddingTop:10,  
        flexDirection:'row',
        justifyContent:'space-between'       
    },

    partLeft:{
        flexDirection:'row'       
    },

    image:{
        height:85,
        width:85,
        marginRight:10,      
        resizeMode:'cover',
        borderRadius:15
    },
    title:{
        fontFamily:'RobotoN'
    }
})