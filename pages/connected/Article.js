import { View, useWindowDimensions } from "react-native";
import { TabView } from "react-native-tab-view";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../store/User";
import GlobalStyles from "../../style/GlobalStyles";
import axios from "axios";
import ArticlesCard from "../../components/Global/Card/ArticlesCard";
import Loader from "../../components/Global/Loader";
import RenderScene from "../../components/Global/GlobalTab/RenderScene";
import RenderTabBar from "../../components/Global/GlobalTab/RenderTabBar";

export default function ArticleScreen() {

  const layout = useWindowDimensions();
  const { user } = useContext(UserContext);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {
      key: "userInterests",
      title: "Pour vous",
      color: GlobalStyles.primary.color,
    },
  ]);
  const [articlesState, setArticlesState] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getUserArticles = async () => {
    let userData = [];
    await Promise.all(
      user.interests.map(async (interest) => {
        try {
          const response = await axios.get(
            `http://192.168.0.50:1337/api/articles?populate=*&filters[interet][type][$contains]=${interest.attributes.type}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          const data = await response.data.data[0];

          if (data !== undefined) {
            console.log("push", data);
            userData.push(data);
          }
        } catch (error) {
          console.error(error);
        }
      })
    );
    setArticlesState((prev) => (prev = userData));
    setLoading((prev) => (prev = false));
  };

  const getArticles = async () => {
    console.log(index);
    try {
      const response = await axios.get(
        `http://192.168.0.50:1337/api/articles?populate=*&filters[interet][type][$contains]=${routes[index].key}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.data.data;
      setArticlesState((prev) => (prev = data));
    } catch (error) {
      console.error(error);
    }
    setLoading((prev) => (prev = false));
  };

  const getInterests = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.50:1337/api/interets?populate=*`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.data.data;
      const routesValue = data.map((interest) => {
        return {
          key: interest.attributes.type,
          title: interest.attributes.type,
          color: GlobalStyles.primary.color,
        };
      });
      const set = [routes[0], ...routesValue];
      setRoutes((prev) => (prev = set));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInterests();
    if (index === 0) {
      getUserArticles();
    } else {
      getArticles();
    }
    return () => {
      setArticlesState((prev) => (prev = []));
      setLoading((prev) => (prev = true));
    };
  }, [index]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={({ route }) => (
          <RenderScene
            index={index}
            routes={routes}
            route={route}
            isLoading={isLoading}
            data={articlesState}
            component={({ item }) => (
              <ArticlesCard
                article={item}
                key={item.id}
              />
            )}
            loader={<Loader />}
            noResult={
              "Oups nous n'avons pas encore de contenu pour cette catégorie"
            }
          />
        )}
        renderTabBar={props => <RenderTabBar {...props} />}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
}
