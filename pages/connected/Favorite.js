import { memo, useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../store/User";
import NewsCard from "../../components/Global/Card/NewsCard";
import GlobalStyles from "../../style/GlobalStyles";
import { View, useWindowDimensions } from "react-native";
import { TabView } from "react-native-tab-view";
import Loader from "../../components/Global/Loader";
import RenderScene from "../../components/Global/GlobalTab/RenderScene";
import RenderTabBar from "../../components/Global/GlobalTab/RenderTabBar";

export default function FavoriteScreen() {
  const layout = useWindowDimensions();
  const { user } = useContext(UserContext);
  const [favoritesState, setFavoritesState] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {
      key: "userInterests",
      title: "Tous",
      color: GlobalStyles.primary.color,
    },
  ]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log('fav',user.favorites)
    getUserCat();
    if (index === 0) {
      setFavoritesState((prev) => (prev = user.favorites));
      setLoading(false);
    } else {
      getCatLike();
    }
    return () => {
      setFavoritesState((prev) => (prev = []));
      setLoading((prev) => (prev = true));
    };
  }, [index, user.favorites,user.userLikesCategories ]);

  const getCatLike = async () => {
    let catFav = [];
    const selectedView = user.userLikesCategories.find((categorie) => {
      return categorie.value === routes[index].key;
    });

    await selectedView.newsId.map((d) => {
      user.favorites.map((f) => {
        if (f.id === d) {
          catFav.push(f);
        }
      });
    });

    setFavoritesState((prev) => (prev = catFav));
    setLoading(false);
  };

  const getUserCat = async () => {
    try {
      const data = await user.userLikesCategories;
      const routesValue = data.map((categorie) => {
        return {
          key: categorie.value,
          title: categorie.value,
          color: categorie.color,
        };
      });
      const set = [routes[0], ...routesValue];
      setRoutes((prev) => (prev = set));
    } catch (error) {
      console.error(error);
    }
  };

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
            data={favoritesState}
            component={({ item }) => (
              <NewsCard
                element={item}
                key={item.id}
              />
            )}
            loader={<Loader />}
            noResult={
              "Aucun favorits pour le moment"
            }
          />
        )}
        renderTabBar={(props) => <RenderTabBar {...props} />}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
}
