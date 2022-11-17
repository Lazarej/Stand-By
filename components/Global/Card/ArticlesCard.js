import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import GlobalStyles from "../../../style/GlobalStyles";
import {RFPercentage} from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

export default function ArticlesCard(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
    onPress={() => navigation.navigate('NewsDetails', {
      image: props.image,
      title: props.title,
      text: props.text,
      id: props.id,
      from:'article'
    })}
    >
      <View style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={{ uri: `http://192.168.0.50:1337${props.image}` }}
      />
      <View style={styles.infoCont}>
        <View style={{marginLeft:10}}>
        <Text style={styles.infoContTitle}>{props.title}</Text>
        <Text style={{...GlobalStyles.text, fontSize:RFPercentage(2.3)}}>
          {props.text.substring(0, 79)}...
        </Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    backgroundColor:'#fff',
    borderRadius: 15,
    borderColor:'#F4F4F4',
    borderWidth:1
  },
  image: {
    width: "100%",
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  infoCont: {
    flex: 1,
    width: "100%",
    
  },
  infoContTitle:{
       fontFamily:'RobotoN',
       fontSize:18,
       marginVertical:10
  },

  
});
