import { Ionicons } from "@expo/vector-icons";
import { memo, useContext, useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { UserContext } from "../../../store/User";
import GlobalStyles from "../../../style/GlobalStyles";

export default function LikeButton(props) {
  const { user, saveUser } = useContext(UserContext);

  useEffect(() => {
  },[props.isLiked])

  const Like = () => {
      const newFavArray = [...user.favorites, props.element];
      saveUser({
        ...user,
        favorites: newFavArray,
      });
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
    props.setIsLiked((prev) => (prev = false))
  }

  return (
    <TouchableOpacity style={styles.cont} onPress={props.isLiked ? Remove : Like }>
      {props.isLiked ? (
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
