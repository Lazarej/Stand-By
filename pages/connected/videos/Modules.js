import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, useWindowDimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { TabView } from "react-native-tab-view";
import RenderScene from "../../../components/Global/GlobalTab/RenderScene";
import RenderTabBar from "../../../components/Global/GlobalTab/RenderTabBar";
import Loader from "../../../components/Global/Loader";
import GlobalStyles from "../../../style/GlobalStyles";
import { useContext } from "react";
import { UserContext } from "../../../store/User";
import axios from "axios";

import ModuleCard from "../../../components/Global/Card/ModuleCard";

export default function Modules() {
  const windowWidth = Dimensions.get("window").width;
  const { user } = useContext(UserContext);
  const [index, setIndex] = useState(0);
  const [modulesState, setModulesState] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const {width , height} = useWindowDimensions()
  const [routes, setRoutes] = useState([
    {
      key: "tous",
      title: "Tous",
      color: GlobalStyles.primary.color,
    },
    {
      key: "list",
      title: "Ma liste",
      color: GlobalStyles.primary.color,
    },
    {
      key: "interest",
      title: "Notre selection pour vous",
      color: GlobalStyles.primary.color,
    },
  ]);

  useEffect(() => {
    if (index === 0) {
      getModule();
    }
    if (index === 1) {
      getUserModuleList();
    }
    if (index === 2) {
      getModulesByInterest();
    }

    return () => {
      
      setModulesState((prev) => (prev = []));
      setLoading((prev) => (prev = true));
    };
  }, [index]);

  const getModule = async () => {
    try {
      const response = await axios.get(`${process.env._URL}/api/modules?populate=*`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.data.data;
      setModulesState((prev) => (prev = data));
    } catch (error) {
      console.error(error);
    }

    setLoading((prev) => (prev = false));
  };

  const getUserModuleList = () => {
    setModulesState((prev) => (prev = user.moduleList));
    setLoading((prev) => (prev = false));
  };

  const getModulesByInterest = async () => {
    let userData = [];
    await Promise.all(
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
            userData.push(data);
          }
        } catch (error) {
          console.error(error);
        }
      })
    );
    setModulesState((prev) => (prev = userData));
    setLoading((prev) => (prev = false));
  };

  return (
    <View style={{ backgroundColor: GlobalStyles.primary.color, flex: 1 }}>
      <View style={width < height ? {...styles.headerCont} : {...styles.headerCont, marginTop:50 , marginBottom:50}}>
        <Text style={styles.headerTitle}>Prêt pour apprendre ?</Text>
        <Text style={width < height ? {...styles.headerText} : {...styles.headerText, fontSize:RFPercentage(1.5)}}>Choissisez votre sujet</Text>
      </View>
      <TabView
        style={{
          backgroundColor: "white",
          borderTopLeftRadius: 55,
          borderTopRightRadius: 55,
        }}
        navigationState={{ index, routes }}
        renderScene={({ route }) => (
          <RenderScene
            index={index}
            routes={routes}
            route={route}
            isLoading={isLoading}
            data={modulesState}
            component={({ item, index }) => (
              <ModuleCard
                key={index}
                index={index}
                item={item}
                checkIndexIsEven={(index) => checkIndexIsEven(index)}
              />
            )}
            loader={<Loader />}
            noResult={
              "Oups nous n'avons pas encore de contenu pour cette catégorie"
            }
          />
        )}
        renderTabBar={(props) => <RenderTabBar {...props} />}
        onIndexChange={setIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerCont: {
    paddingHorizontal: "8%",
    marginBottom: 20,
  },

  headerTitle: {
    fontFamily: "RobotoB",
    fontSize: RFPercentage(3.2),
    color: "white",
    marginBottom: 3,
  },

  headerText: {
    fontSize: RFPercentage(2.5),
    fontFamily: "RobotoL",
    color: "white",
  },

  bodyCont: {
    backgroundColor: "white",
    minHeight: 800,
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
  },

  rowOne: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
  },

  rowTwo: {
    flexDirection: "row-reverse",
    alignItems: "flex-end",

    marginVertical: 10,
    justifyContent: "space-between",
  },
});
