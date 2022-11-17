import { useRoute } from "@react-navigation/native";
import {
  ImageBackground,
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

export default function NewsDetails({ navigation }) {
     const route = useRoute();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ImageBackground
        style={styles.image}
        source={{ uri: `http://192.168.0.50:1337${route.params.image}` }}
      >
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
      </ImageBackground>
      <Wrapper>
        <View style={{ marginVertical: 40 , justifyContent:'space-between', flexDirection:'row' , alignItems:'center'}}>
          <Text style={{ ...GlobalStyles.title, fontSize: RFPercentage(4.8) }}>
            {route.params.title}
          </Text>
       
        </View>
        <Text
          style={{
            ...GlobalStyles.text,
            fontSize: RFPercentage(2.5),
            marginBottom: 40,
          }}
        >
          {route.params.text}
        </Text>
      </Wrapper>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
});
