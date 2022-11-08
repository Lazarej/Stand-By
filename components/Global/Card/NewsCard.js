import { View,StyleSheet, Text, Image } from "react-native";
import LikeButton from "../Button/LikeButton";

export default function NewsCard(props) {
  console.log('newsCard' , props.element)  
  return (
    <View style={styles.newContainer}>
        <View style={styles.container}>
        <View style={styles.partLeft} >
        <Image
        style={styles.image}
        source={{uri:`http://192.168.0.50:1337${props.image}`}}
        />
      <Text style={styles.title}>{props.title}</Text>
    </View>
    <LikeButton id={props.id } element={props.element}></LikeButton>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
    newContainer:{
        width: "100%",
        height: 95,
        backgroundColor:'#fff',
        paddingTop:10,  
        borderColor:'#F4F4F4',
        borderWidth:1,
        marginBottom:20,
        borderRadius:15,
          
    },

    container:{
      marginHorizontal:10,
      flexDirection:'row',
      justifyContent:'space-between'     
    },

    partLeft:{
        flexDirection:'row'       
    },

    image:{
        height:75,
        width:75,
        marginRight:10,      
        resizeMode:'cover',
        borderRadius:15
    },
    title:{
        fontFamily:'RobotoN'
    }
})