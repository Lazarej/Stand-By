import { useRoute } from "@react-navigation/native";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Wrapper from "../../components/Global/Wrapper";
import GlobalStyles from "../../style/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import LikeButton from "../../components/Global/Button/LikeButton";
import OtherArticle from "../../components/details/OtherArticle";
import Qsm from "../../components/details/Qsm";
import {
  SharedElement,
} from 'react-native-shared-element';


export default function Details({ navigation }) {
     const route = useRoute();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.iconCont}>
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
      </View>
      <SharedElement id={route.params.id}>
      <Image
        style={styles.image}
        source={{ uri: `http://192.168.0.50:1337${route.params.image}` }}
      >
       
      </Image>
      </SharedElement>
      <Wrapper>
        <View style={{ marginVertical: 40 , justifyContent:'space-between', flexDirection:'row' , }}>
          <Text style={{ ...GlobalStyles.title, fontSize: RFPercentage(4.8), width:'90%'}}>
            {route.params.title}
          </Text>
          
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
      </Wrapper>
    </ScrollView>
  );
}

Details.sharedElements = (navigation, otherNavigation, showing) => {
  const id = navigation.getParam('id')
  return [id]
  
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
    borderRadius: 15,
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
