import { Text, View, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import Wrapper from "../../components/Global/Wrapper";
import GlobalStyles from "../../style/GlobalStyles";
import { useContext, useEffect } from "react";
import { UserContext } from "../../store/User";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import NewsSection from "../../components/home/NewsSection";
import ArticleSection from "../../components/home/ArticleSection";
import Drawer from "../../components/Global/Drawer/Drawer"
import { isWeb } from "../../globalVar/os";
export default function HomeScreen() {

  const {width , height} = useWindowDimensions()

  useEffect(()=>{
  },[])

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ minHeight: "100%" }}
    >
      <View
        style={ isWeb ? {
          width: "100%",
          height:350,
          justifyContent: "space-evenly",
          backgroundColor: GlobalStyles.primary.backgroundColor,
        }  : {
          width: "100%",
          flex: 1,
          height:450,
          justifyContent: "space-evenly",
          backgroundColor: GlobalStyles.primary.backgroundColor,
        }}
      >
        {
          height > width ? <Drawer/> : null
        }
        <View style={styles.titleContentCont}>
          <Text style={isWeb ? {...styles.tilteText, fontSize:RFPercentage(5), lineHeight: RFPercentage(4)} : {...styles.tilteText}}>Les</Text>
          <Text style={isWeb ? {...styles.tilteText, fontSize:RFPercentage(5), lineHeight: RFPercentage(4)} : {...styles.tilteText}}>News</Text>
          <Text style={isWeb ? {...styles.tilteText, fontSize:RFPercentage(5), lineHeight: RFPercentage(4)} : {...styles.tilteText}}>Du</Text>
          <Text style={isWeb ? {...styles.tilteText, fontSize:RFPercentage(5), lineHeight: RFPercentage(4)} : {...styles.tilteText}}>Moment !</Text>
        </View>
      </View>

      <Wrapper>
        <NewsSection></NewsSection>
        <View style={styles.line}></View>
        <ArticleSection></ArticleSection>
      </Wrapper>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContentCont: {
    width: "100%",
    marginLeft: "10%",
  },

  tilteText: {
    fontFamily: "RobotoB",
    color: "#fff",
    fontSize: RFPercentage(9),
    textTransform: "uppercase",
    lineHeight: RFPercentage(8.8),
    letterSpacing: -3,
  },

  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#E6E6E6",
    marginTop:40,
    marginBottom:60
  },
});
