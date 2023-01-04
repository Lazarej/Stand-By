import { useState, useEffect } from "react";
import { View, Text, StyleSheet} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { TabView } from "react-native-tab-view";
import RenderScene from "../../../components/Global/GlobalTab/RenderScene";
import RenderTabBar from "../../../components/Global/GlobalTab/RenderTabBar";
import Loader from "../../../components/Global/Loader";
import GlobalStyles from "../../../style/GlobalStyles";
import { useContext } from "react";
import { UserContext } from "../../../store/User";
import axios from "axios";
import { _URL } from "../../../globalVar/url";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Modules() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [index, setIndex] = useState(0); 
  const [modulesState, setModulesState] = useState([]);
  const [isLoading, setLoading] = useState(true);
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
    
    const getModule = async() => {
          try {
          const response = await axios.get(
            `${_URL}/api/modules?populate=*`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
              );
              const data = await response.data.data;
              setModulesState((prev) => (prev = data));
        } catch (error) {
          console.error(error);
        }
    
    setLoading((prev) => (prev = false));
    }

    const getModulesByInterest = async() => {
    let userData = [];
    await Promise.all(
      user.interests.map(async (interest) => {
        try {
          const response = await axios.get(
            `${_URL}/api/modules?populate=*&filters[interet][type][$contains]=${interest.type}`,
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
    }

  useEffect(() => {
    if (index === 0) {
        getModule();  
      } if (index === 2) {
        getModulesByInterest() 
      } else {
         
    }
    return () => {
      setModulesState((prev) => (prev = []));
      setLoading((prev) => (prev = true));
    };
  }, [index]);
    
    

    return (
    <View style={{ backgroundColor: GlobalStyles.primary.color, flex: 1 }}>
      <View style={styles.headerCont}>
        <Text style={styles.headerTitle}>Prêt pour apprendre ?</Text>
        <Text style={styles.headerText}>Choissisez votre sujet</Text>
      </View>
      <View style={styles.bodyCont}>
                <TabView
                    style={{backgroundColor:'transparent'}}
          navigationState={{ index, routes }}
          renderScene={({ route }) => (
            <RenderScene
              index={index}
              routes={routes}
              route={route}
              isLoading={isLoading}
              data={modulesState}
              component={({ item }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('DetailsModule', {
                    item: item.attributes,
                    id: item.id
                })}
                >
                  <Text style={{marginVertical:10}}>{ item.attributes.title}</Text>
                </TouchableOpacity>
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
});
