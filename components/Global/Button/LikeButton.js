import { Ionicons } from "@expo/vector-icons";
import { memo, useContext, useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { UserContext } from "../../../store/User";
import GlobalStyles from "../../../style/GlobalStyles";

export default function LikeButton(props) {
  const { user, saveUser } = useContext(UserContext);
  const [likeState, setlikeState] = useState(false);

  useEffect(() => {
    setlikeState(prev => prev = props.isLiked)
    
    
  },[])

  const Like = () => {
      const newFavArray = [...user.favorites, props.element];
      saveUser({
        ...user,
        favorites: newFavArray,
      });
    setlikeState((prev) => (prev = true));
    props.setIsLiked((prev) => (prev = true))
  };

  const Remove = () => {
    const removeFav = user.favorites.filter((fav) => {
        return fav.id !== props.id;
      });
      const removeCat = user.userLikesCategories.map((cat) => {
        if (cat.newsId.includes(props.id)) {
          const filter = cat.newsId.filter((id) => {
            return id !== props.id;
          });
          return {
            ...cat,
            newsId: filter,
          };
        } else {
          return cat;
        }
      });
      saveUser({
        ...user,
        favorites: removeFav,
        userLikesCategories: removeCat,
      });
    setlikeState((prev) => (prev = false));
    props.setIsLiked((prev) => (prev = false))
  }

  return (
    <TouchableOpacity style={styles.cont} onPress={likeState ? Remove : Like }>
      {likeState ? (
        <Ionicons
          name="heart-sharp"
          size={props.size}
          color={GlobalStyles.primary.color}
        />
      ) : (
        <Ionicons name="heart-outline" size={props.size} color="black" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cont: {
    display: "flex",
    height: 30,
    width: 40,
    paddingTop: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
