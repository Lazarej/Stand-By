import { Link } from "@react-navigation/native";
import { View, StyleSheet, Text, useWindowDimensions } from "react-native";
import GlobalStyles from "../../style/GlobalStyles";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../store/User";
import axios from "axios";
import NewsCard from "../Global/Card/NewsCard";


export default function NewsSection() {
  const { user } = useContext(UserContext);
  const [newsState, setNewsState] = useState([]);
  const { width, height } = useWindowDimensions()
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env._URL}/api/news?populate=*`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.data.data.slice(0, 2);
        setNewsState((prev) => (prev = data));
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={GlobalStyles.title}>Quoi de neuf ?</Text>
        <Link style={ height < width ? {...styles.headerLink , fontSize:RFPercentage(1)} : {...styles.headerLink}} to={{ screen: "NewsLetter"}}>
          Tout voir
        </Link>
      </View>
      <View style={ height < width ? {flexDirection:'row', flexWrap:'wrap', justifyContent:'center'} : null}>
        {Object.values(newsState).map((e) => (
          <NewsCard
            element={e}
            key={e.id}
          ></NewsCard>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  sectionHeader: {
    marginTop: 60,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },

  headerLink: {
    fontWeight: "bold",
    color: GlobalStyles.primary.color,
    fontSize: RFPercentage(2.1),
  },
});
