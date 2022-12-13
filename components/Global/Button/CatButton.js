import { TouchableOpacity } from "react-native";
import UserCategories from "../../Global/UserCategories";
import ModalGlobal from "../../Global/Modal";
import { useContext } from "react";
import { UserContext } from "../../../store/User";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";


export default function CatButton (props){

    const { user, saveUser } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const [snackBar, setSnackBar] = useState({
      visible:false,
      message:''
    })

    const addToCat = (e) => {
        console.log('element',e)
        const newArray = {
          ...user,
          userLikesCategories: user.userLikesCategories.map((obj) => {
            if(obj.newsId.includes(props.id) && obj.value !== e.value){
              setSnackBar(prev => prev = {
                visible:true,
                message:`"${props.title}" est maintenant dans la categorie "${e.value}"`
              })
               const newNewsId = obj.newsId.filter((id) =>{
                return id !== props.id
               })
               return {
                ...obj,
                newsId: newNewsId,
              };
            }
            if (obj.value === e.value && obj.newsId.includes(props.id) === false ) {
              
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
        saveUser(newArray)
      };

    return(
       <>
        <TouchableOpacity onPress={() => setIsOpen((prev) => !prev)}>
            <Entypo name="add-to-list" size={18} color="black" />
          </TouchableOpacity>
          <ModalGlobal isOpen={isOpen} close={() => setIsOpen(!isOpen)} snackBar={snackBar}
            onDismiss={() => setSnackBar(prev => prev = {
              ...snackBar,
              visible:false
            })}>
          <UserCategories
            title={"Ajouter une catégorie a la news"}
            function={addToCat}
            
          />
        </ModalGlobal>
       </>
    )
}