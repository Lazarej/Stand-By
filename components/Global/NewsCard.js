import { View,StyleSheet, Text, Image } from "react-native";

export default function NewsCard(props) {
  return (
    <View style={styles.newContainer} >
        <Image
        style={styles.image}
        source={{uri:`http://192.168.0.50:1337${props.image}`}}
        />

      <Text>{props.title}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
    newContainer:{
        width: "100%",
        height: 100,
        marginVertical:5,
        paddingTop:10,  
        flexDirection:'row'       
    },

    image:{
        height:80,
        width:80,
        marginRight:10,      
        resizeMode:'cover'
    }
})