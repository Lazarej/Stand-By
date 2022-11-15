import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import LikeButton from "../Button/LikeButton";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import UserCategories from "../../Global/UserCategories";
import ModalGlobal from "../../Global/Modal";
import { useContext } from "react";
import { UserContext } from "../../../store/User";

export default function NewsCard(props) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, saveUser } = useContext(UserContext);
  const [newsCat , setNewsCat] = useState({})

  console.log(newsCat.value)

  useEffect(()=>{

      // saveUser({
      //   ...user,
      //   userLikesCategories:[]
      // })
      IsOnCategorie();
  },[user.userLikesCategories])

  const IsOnCategorie = () =>{
    const filter = user.userLikesCategories.filter((e)=>{
      return e.newsId.find(item => item === props.id)
     })
    setNewsCat(prev => prev = {...filter[0]})
  }

  const addToCat = (e) => {
    const selectedCat = user.userLikesCategories.findIndex((obj) => {
      return obj.newsId.includes(props.id)
    });
    const newArray = {
      ...user,
      userLikesCategories: user.userLikesCategories.map((obj) => {
        if(obj.newsId.includes(props.id) && obj.value !== e.value){
           console.log('un autre', obj)
           return {
            ...obj,
            newsId: [],
          };
        }
        if (obj.value === e.value && obj.newsId.includes(props.id) === false ) {
          console.log('we add this because no categorie here')
          return {
            ...obj,
            newsId: [...obj.newsId, props.id],
          };
        }else{
          return{
            ...obj
          }
        }
      }),
    };

    console.log('newArray',newArray.userLikesCategories)
    saveUser(newArray)
  };
  return (
    <View style={styles.newContainer}>
      <View style={styles.container}>
        <View style={styles.partLeft}>
          <Image
            style={styles.image}
            source={{ uri: `http://192.168.0.50:1337${props.image}` }}
          />
          <View style={{justifyContent:'space-between', alignItems:'baseline'}}>
          <Text style={styles.title}>{props.title}</Text>
          {
            newsCat.value ?
            <View style={{ paddingHorizontal:5, paddingVertical:2 , flexDirection:'row', alignItems:'center'}}>
             <Text style={{fontFamily:'RobotoN', fontSize:13, marginRight:7}}>{newsCat.value}</Text>
             <View style={{backgroundColor: newsCat.color, width:14,  height:14, borderRadius:10,borderWidth:0.8, marginTop:3}}></View>
          </View> :
          null
          }
          </View>
        </View>
        <View
          style={{ justifyContent: "space-between", alignItems: "flex-end" }}
        >
          <LikeButton id={props.id} element={props.element}></LikeButton>
          <TouchableOpacity onPress={() => setIsOpen((prev) => !prev)}>
            <Entypo name="add-to-list" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ModalGlobal isOpen={isOpen} close={() => setIsOpen(!isOpen)}>
        <UserCategories
          title={"Ajouter une catégorie a la news"}
          function={addToCat}
        />
      </ModalGlobal>
    </View>
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
