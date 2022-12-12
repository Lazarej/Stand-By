import { useRoute } from "@react-navigation/native";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Wrapper from "../../components/Global/Wrapper";
import GlobalStyles from "../../style/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import LikeButton from "../../components/Global/Button/LikeButton";
import OtherArticle from "../../components/details/OtherArticle";
import Qsm from "../../components/details/Qsm";
import { SharedElement } from 'react-navigation-shared-element';
import { useEffect, useRef } from "react";
import { _URL } from "../../globalVar/url";


export default function Details({ navigation }) {
  
  const route = useRoute();
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(()=>{
    Animation()
  },[])
  const Animation = () =>{
       Animated.timing(opacity,{
        toValue:1,
        duration:300,
        delay:50,
        useNativeDriver:true
       }).start()
  }    



  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Animated.View style={{...styles.iconCont, opacity: opacity}}>
      <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color={GlobalStyles.primary.color}
          />
        </TouchableOpacity>
        {
          route.params.from === 'news' ?
          <View  style={styles.likeButton}>
        <LikeButton  size={24} id={route.params.id} element={route.params.element}></LikeButton>
        </View> : null
        }
      </Animated.View>
      <SharedElement id={route.params.image}>
      <Image
        style={styles.image}
        source={{ uri: `${_URL}${route.params.image}` }}
      >
       
      </Image>
      </SharedElement>
      <Wrapper>
        <Animated.View style={{opacity:opacity}}>
        <View style={{ marginVertical: 40 , justifyContent:'space-between' , alignItems:'baseline'}}>
          <Text style={{ ...GlobalStyles.title, fontSize: RFPercentage(4.8), width:'90%', marginBottom:10}}>
            {route.params.title}
          </Text>    
          {
            route.params.categorie.value && route.params.from === 'news' ?
            <View style={{width:'auto', paddingHorizontal:5, paddingVertical:3 , flexDirection:'row', alignItems:'center' , borderWidth:1, borderColor:'#AAAAAA' ,borderRadius:15 }}>
             
             <View style={{backgroundColor: route.params.categorie.color, width:14,  height:14, borderRadius:10}}></View>
             <Text style={{fontFamily:'RobotoN', fontSize:13, marginHorizontal:7}}>{route.params.categorie.value}</Text>
          </View> :
          null
          }   
        </View>
        <Text
          style={{
            ...GlobalStyles.text,
            fontSize: RFPercentage(2.5),
            marginBottom: 60,
          }}
        >
          {route.params.text}
        </Text>
        {
          route.params.questions.length !== 0 ? 
          <Qsm questions={route.params.questions}/> :null
        }
        {
          route.params.from === 'article'? 
          <OtherArticle interest={route.params.interest} id={route.params.id}/> : null
        }
        </Animated.View>
      </Wrapper>
    </ScrollView>
  );
}

Details.sharedElements = (route) => {
  return [{
    id: route.params.image,
  },
]
  
}

const styles = StyleSheet.create({
  iconCont:{
  width:'100%',
  zIndex:10,
  },

  image: {
    height: 350,
    width: "100%",
    marginRight: 10,
    resizeMode: "cover",
  },

  backButton: {
    height: 40,
    width: 40,
    top: 50,
    left: 20,
    backgroundColor: "#fff",
    position: "absolute",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  likeButton: {
    height: 40,
    width: 40,
    top: 50,
    right: 20,
    backgroundColor: "#fff",
    position: "absolute",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
