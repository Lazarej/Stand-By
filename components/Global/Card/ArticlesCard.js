import { View, StyleSheet, Text, Image, TouchableOpacity, useWindowDimensions } from "react-native";
import GlobalStyles from "../../../style/GlobalStyles";
import {RFPercentage} from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { SharedElement } from 'react-navigation-shared-element';
import { _URL } from "../../../globalVar/url";

export default function ArticlesCard(props) {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions ()
  
  useEffect(()=>{
   
  },[])

  return (
    <TouchableOpacity 
    onPress={() => navigation.navigate('Details', {
      image: props.article.attributes.image.data.attributes.url,
      title: props.article.attributes.title,
      text: props.article.attributes.text,
      id: props.article.id,
      questions: props.article.attributes.questions,
      signataire: props.article.attributes.signataire,
      duree: props.article.attributes.duree,
      date: props.article.attributes.date,
      from:'article',
      categorie: props.article.attributes.interet.data.attributes.type ,
      interest: props.article.attributes.interet
    })}
    >
      <View style={ width < height ? {...styles.container} : {...styles.container, width:450}}>
      <SharedElement id={props.article.attributes.image.data.attributes.url}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={{ uri: `${_URL}${props.article.attributes.image.data.attributes.url}` }}
      />
      </SharedElement>
      <View style={styles.infoCont}>
        <View style={{marginLeft:10}}>
        <Text style={styles.infoContTitle}>{props.article.attributes.title}</Text>
        <Text style={{...GlobalStyles.text, fontSize:16}}>
          {props.article.attributes.text[0].text.substring(0, 79)}...
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
    borderColor:'#E6E6E6',
    borderWidth: 1,
    marginRight:20
  },
  image: {
    width: "100%",
    height:100,
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
