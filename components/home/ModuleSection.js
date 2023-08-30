import { Link } from "@react-navigation/native";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions, Text } from "react-native";
import { View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { _URL } from "../../globalVar/url";
import { UserContext } from "../../store/User";
import GlobalStyles from "../../style/GlobalStyles";
import ModuleCard from "../Global/Card/ModuleCard";

export default function ModuleSection() {
  const { width, height } = useWindowDimensions();
  const { user } = useContext(UserContext);
  const [modulesState, setModulesState] = useState([]);

  const getData = () => {
    user.interests.map(async (interest) => {
      try {
        const response = await axios.get(
          `${process.env._URL}/api/modules?populate=*&filters[interet][type][$contains]=${interest.type}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.data.data[0];

        if (data !== undefined) {
          setModulesState((prev) => [...prev, data]);
          }
          
        setModulesState((prev) => prev.slice(0, 2));
      } catch (error) {
        console.error(error);
      }
    });
  };

  useEffect(() => {
    getData();
    return () => {
      setArticlesState((prev) => (prev = []));
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={GlobalStyles.title}>Nos Modules</Text>
        <Link
          style={
            height < width
              ? { ...styles.headerLink, fontSize: RFPercentage(1) }
              : { ...styles.headerLink }
          }
          to={{ screen:"Module"}}
        >
          Tout voir
        </Link>
      </View>
      <View
        style={
          height < width
            ? {
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }
            : null
        }
      >
        {modulesState.map((module, index) => (
          <ModuleCard key={index} index={index} item={module}></ModuleCard>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 40,
  },

  sectionHeader: {
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
