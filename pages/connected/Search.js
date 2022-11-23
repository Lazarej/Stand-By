import { Text, View, FlatList } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../store/User";
import axios from "axios";
import Wrapper from "../../components/Global/Wrapper";
import GlobalInput from "../../components/Global/Form/Input";
import GlobalStyles from "../../style/GlobalStyles";
import NewsCard from "../../components/Global/Card/NewsCard";
import ArticlesCard from "../../components/Global/Card/ArticlesCard";
import NoResult from "../../components/Global/NoResult";

export default function SearchScreen() {
  const { user, logout } = useContext(UserContext);

  const [search, setSearch] = useState("");
  const [result, setResult] = useState({
    news: [],
    articles: [],
  });
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "News" },
    { key: "second", title: "Articles" },
  ]);

  const oneNews = ({ item }) => {
    return (
      <NewsCard
        element={item}
        key={item.id}
      ></NewsCard>
    );
  };

  const oneArticle = ({ item }) => {
    return (
      <ArticlesCard
      article={item}
        key={item.id}

      ></ArticlesCard>
    );
  };

  const NewsRoute = () => (
    <View>
      {result.news.length === 0 ? (
        <NoResult title={"Aucun résultat"} />
      ) : (
        <FlatList
          style={{ paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
          data={result.news}
          renderItem={oneNews}
        />
      )}
    </View>
  );

  const ArticleRoute = () => (
    <View>
      {result.articles.length === 0 ? (
        <NoResult title={"Aucun résultat"} />
      ) : (
        <FlatList
          style={{ paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
          data={result.articles}
          renderItem={oneArticle}
        />
      )}
    </View>
  );

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: GlobalStyles.primary.color }}
      style={{ backgroundColor: "#fff", elevation: 0, height: 45 }}
      renderLabel={({ route }) => (
        <View>
          <Text
            style={{
              fontSize: 16,
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
  );

  const renderScene = SceneMap({
    first: NewsRoute,
    second: ArticleRoute,
  });

  const getData = async () => {
    console.log("value", search.length);
    if (search.length === 0) {
      setResult((prev) => (prev = { news: [], articles: [] }));
    } else {
      try {
        const articleResponse = await axios.get(
          `http://192.168.0.50:1337/api/articles?filters[title][$contains]=${search}&populate=*`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const newsResponse = await axios.get(
          `http://192.168.0.50:1337/api/news?filters[title][$contains]=${search}&populate=*`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const news = newsResponse.data.data;
        const articles = articleResponse.data.data;

        setResult((prev) => (prev = { news: news, articles: articles }));
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  console.log("base result", result);

  return (
    <Wrapper>
      <View>
        <GlobalInput
          type={"text"}
          placeholder={"Recherche"}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: "100%" }}
      />
    </Wrapper>
  );
}
