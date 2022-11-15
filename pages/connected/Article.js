import { Text, View, useWindowDimensions, FlatList } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../store/User";
import GlobalStyles from "../../style/GlobalStyles";
import axios from "axios";
import Wrapper from "../../components/Global/Wrapper";
import ArticlesCard from "../../components/Global/Card/ArticlesCard";
import Loader from "../../components/Global/Loader";
import NoResult from "../../components/Global/NoResult";

export default function ArticleScreen() {
  const oneArticle = ({ item }) => {
    // console.log('item', item)
    return (
      <ArticlesCard
        key={item.id}
        id={item.id}
        title={item.attributes.title}
        text={item.attributes.text}
        image={item.attributes.image.data.attributes.url}
      ></ArticlesCard>
    );
  };

  function FilterView(props) {
    //  console.log('props',props.data)
    return (
      <Wrapper>
        {isLoading ? (
          <Loader></Loader>
        ) : (
          props.data.length === 0 ?
          <NoResult
          title={"Oups, pas encore d'article dans cette catégorie"}
          />
          :
          <FlatList
            style={{ paddingTop: 20 }}
            showsVerticalScrollIndicator={false}
            data={props.data}
            renderItem={oneArticle}
          />
        )}
      </Wrapper>
    );
  }

  const renderTabBar = (props) => (
    <View style={{ marginLeft: "8%", overflow: "hidden" }}>
      <TabBar
        {...props}
        bounces={true}
        indicatorStyle={{ backgroundColor: GlobalStyles.primary.color }}
        scrollEnabled={true}
        tabStyle={{ width: "auto" }}
        style={{
          backgroundColor: "#fff",
          elevation: 0,
          height: 45,
          width: "auto",
        }}
        renderLabel={({ route }) => (
          <View>
            <Text
              style={{
                fontSize: 14,
                color:
                  route.key ===
                  props.navigationState.routes[props.navigationState.index].key
                    ? GlobalStyles.primary.color
                    : "#AAAAAA",
              }}
            >
              {route.title}
            </Text>
          </View>
        )}
      />
    </View>
  );

  const layout = useWindowDimensions();
  const { user } = useContext(UserContext);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: "userInterests", title: "Pour vous" },
  ]);
  const [articlesState, setArticlesState] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getUserArticles = async  () => {

     let  userData =  []
    await Promise.all(
        user.interests.map(async (interest) => {
        try {
          
          const response = await axios.get(
            `http://192.168.0.50:1337/api/articles?populate=*&filters[interet][type][$contains]=${interest.type}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          const data = await response.data.data[0];
          
          if (data !== undefined) {
            console.log('push', data)
            userData.push(data)        
          }
        } catch (error) {
          console.error(error);
        }
      })  
    )
      console.log('should be after' , userData )
      setArticlesState((prev) =>  prev = userData);
      setLoading(prev => prev = false)
      
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
    setLoading(prev => prev = false)
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
      setLoading(prev => prev = true )
    };
  }, [index]);

  const renderScene = ({ route }) => {
    if (route.key === routes[index].key) {
      return <FilterView data={articlesState} />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
}
