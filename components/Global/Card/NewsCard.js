import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import LikeButton from "../Button/LikeButton";
import { Entypo } from '@expo/vector-icons';
import {  useState } from "react";
import UserCategories from "../../Global/UserCategories";
import ModalGlobal from "../../Global/Modal";
import { useContext } from "react";
import { UserContext } from "../../../store/User";

export default function NewsCard(props) {

  const [isOpen, setIsOpen] = useState(false);
  const { user, saveUser } = useContext(UserContext);

  const addToCat = (e) =>{
    console.log([...user.userLikesCategories, user.userLikesCategories[0] = {...e ,newsId:[
      ...e.newsId,
      props.id
    ] }])
    console.log({
      ...user,
      userLikesCategories: [...user.userLikesCategories, user.userLikesCategories[0] = {...e ,newsId:[
        ...e.newsId,
        props.id
      ] }],
    })
  }

  return (
    <View style={styles.newContainer}>
      <View style={styles.container}>
        <View style={styles.partLeft}>
          <Image
            style={styles.image}
            source={{ uri: `http://192.168.0.50:1337${props.image}` }}
          />
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={{justifyContent:'space-between' , alignItems:'flex-end'}}>
          <LikeButton id={props.id} element={props.element}></LikeButton>
          <TouchableOpacity onPress={() => setIsOpen((prev) => !prev)}>
               <Entypo name="add-to-list" size={18} color="black" />
            </TouchableOpacity>
        </View>
      </View>
      <ModalGlobal isOpen={isOpen} close={() =>setIsOpen(!isOpen)}>
         <UserCategories title={'Ajouter une catégorie a la news'} function={addToCat}/> 
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
  },
});
