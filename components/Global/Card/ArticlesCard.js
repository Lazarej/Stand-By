import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import GlobalStyles from "../../../style/GlobalStyles";
import {RFPercentage} from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { SharedElement } from "react-native-shared-element";

export default function ArticlesCard(props) {
  const navigation = useNavigation();

  useEffect(()=>{
    console.log('article',props.article.attributes)
  })

  return (
    <TouchableOpacity 
    onPress={() => navigation.navigate('Details', {
      image: props.article.attributes.image.data.attributes.url,
      title: props.article.attributes.title,
      text: props.article.attributes.text,
      id: props.article.id,
      questions: props.article.attributes.questions,
      from:'article',
      interest: props.article.attributes.interet
    })}
    >
      <View style={styles.container}>
      <SharedElement id={props.article.id}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={{ uri: `http://192.168.0.50:1337${props.article.attributes.image.data.attributes.url}` }}
      />
      </SharedElement>
      <View style={styles.infoCont}>
        <View style={{marginLeft:10}}>
        <Text style={styles.infoContTitle}>{props.article.attributes.title}</Text>
        <Text style={{...GlobalStyles.text, fontSize:RFPercentage(2.3)}}>
          {props.article.attributes.text.substring(0, 79)}...
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
