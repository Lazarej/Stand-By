import { View, StyleSheet, Text, Image, TouchableOpacity, useWindowDimensions } from "react-native";
import LikeButton from "../Button/LikeButton";
import { useCallback, useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../store/User";
import CatButton from "../Button/CatButton";
import { useNavigation, useRoute } from "@react-navigation/native";


export default function NewsCard(props) {
  const { user, saveUser } = useContext(UserContext);
  const [categorie, setCategorie] = useState({});
  const [likeState, setlikeState] = useState(false);
  const navigation = useNavigation();
  const [loading , setLoading] = useState(true)
  const {width , height} = useWindowDimensions()
  useEffect(() => {
    
    checkLike();
    IsOnCategorie();
    setLoading(false)
    // console.log('card', user.favorites, user.favorites.includes(props.element.id))

  },[user.favorites,user.userLikesCategories]);
  
  
  const checkLike = () => {
    const isLiked = user.favorites.some((fav) => {
      return fav.id === props.element.id;
    });
    console.log('check' , isLiked , props.element.id)
    setlikeState((prev) => (prev = isLiked));
  };

  const IsOnCategorie = () => {
    const filter = user.userLikesCategories.filter((e) => {
      return e.newsId.find((item) => item === props.element.id);
    });
    setCategorie((prev) => (prev = { ...filter[0] }));
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Details", {
          image: props.element.attributes.image.data.attributes.url,
          title: props.element.attributes.title,
          text: props.element.attributes.text,
          id: props.element.id,
          questions: props.element.attributes.questions,
          signataire: props.element.attributes.signataire,
          duree: props.element.attributes.duree,
          date: props.element.attributes.date,
          from: "news",
          categorie: categorie,
          element: props.element,
          isLiked:likeState,
              setIsLiked: setlikeState
        })
      }
    >
      <View style={ width < height ? {...styles.newContainer} : {...styles.newContainer, width:'30vw' , minWidth:350, maxWidth:500}}>
        <View style={styles.container}>
          <View style={styles.partLeft}>
              <Image
                style={styles.image}
                source={{
                  uri: `${process.env._URL}${props.element.attributes.image.data.attributes.formats.small.url}`,
                }}
              />
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <Text style={styles.title}>{props.element.attributes.title}</Text>
              {categorie.value ? (
                <View
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 3,
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#AAAAAA",
                    borderRadius: 15,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: categorie.color,
                      width: 14,
                      height: 14,
                      borderRadius: 10,
                    }}
                  ></View>
                  <Text
                    style={{
                      fontFamily: "RobotoN",
                      fontSize: 13,
                      marginHorizontal: 7,
                    }}
                  >
                    {categorie.value}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
          <View
            style={{ justifyContent: "space-between", alignItems: "flex-end" }}
          >
            {
              loading ? null :  <LikeButton
              isLiked={likeState}
              setIsLiked={setlikeState}
              size={24}
              id={props.element.id}
              element={props.element}
            ></LikeButton>
            }
            {likeState ? (
              <CatButton
                id={props.element.id}
                title={props.element.attributes.title}
              />
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  newContainer: {
    width: "100%",
    height: 95,
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderColor: "#E6E6E6",
    borderWidth: 1,
    marginBottom: 20,
    marginRight:10,
    borderRadius: 15,
  },

  container: {
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  partLeft: {
    flexDirection: "row",
  },

  image: {
    height: 75,
    width: 75,
    marginRight: 10,
    resizeMode: "cover",
    borderRadius: 15,
  },
  title: {
    fontFamily: "RobotoN",
    fontSize: 15,
  },
});
