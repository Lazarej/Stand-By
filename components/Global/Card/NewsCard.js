import { View, StyleSheet, Text, Image, TouchableOpacity} from "react-native";
import LikeButton from "../Button/LikeButton";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../store/User";
import CatButton from "../Button/CatButton";
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-native-shared-element";

export default function NewsCard(props) {
  const { user, saveUser} = useContext(UserContext);
  const [categorie , setCategorie] = useState({})
  const [likeState, setlikeState] = useState(false);
  const navigation = useNavigation();

  useEffect(()=>{ 
    // saveUser({
    //   ...user,
    //   favorites: [],
    // });
      checkLike();  
      IsOnCategorie();
      // console.log(props.element.id ,likeState, 're render bbbbbbbbbb')
  },[user.userLikesCategories])

  const checkLike = () => {
    const isLiked = user.favorites.some((fav) => {
      return fav.id === props.element.id;
    });
      setlikeState((prev) => (prev = isLiked));
      
  };

  const IsOnCategorie = () =>{
    const filter = user.userLikesCategories.filter((e)=>{
      return e.newsId.find(item => item === props.element.id)
     })
     setCategorie(prev => prev = {...filter[0]})
  }

 

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Details',{
       image: props.element.attributes.image.data.attributes.url,
       title: props.element.attributes.title,
       text: props.element.attributes.text,
       id: props.element.id,
       questions:props.element.attributes.questions,
       from:'news',
       element: props.element
    })}>
      <View style={styles.newContainer}>
      <View style={styles.container}>
        <View style={styles.partLeft}>
          <SharedElement id={props.element.id}>
          <Image
            style={styles.image}
            source={{ uri: `http://192.168.0.50:1337${props.element.attributes.image.data.attributes.url}` }}
          />
          </SharedElement > 
          <View style={{justifyContent:'space-between', alignItems:'baseline'}}>
          <Text style={styles.title}>{props.element.attributes.title}</Text>
          {
            categorie.value ?
            <View style={{ paddingHorizontal:5, paddingVertical:2 , flexDirection:'row', alignItems:'center'}}>
             <Text style={{fontFamily:'RobotoN', fontSize:13, marginRight:7}}>{categorie.value}</Text>
             <View style={{backgroundColor: categorie.color, width:14,  height:14, borderRadius:10,borderWidth:0.8, marginTop:3}}></View>
          </View> :
          null
          }
          </View>
        </View>
        <View
          style={{ justifyContent: "space-between", alignItems: "flex-end" }}
        >
          <LikeButton  size={24} id={props.element.id} element={props.element}></LikeButton>
          {
            likeState ? <CatButton id={props.element.id}/> : null
          }
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
    paddingTop: 10,
    borderColor: "#F4F4F4",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 15,
  },

  container: {
    marginHorizontal: 10,
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
    fontSize:15
  },
});
