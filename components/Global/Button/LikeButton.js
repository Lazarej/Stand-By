import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from "react";
import { TouchableOpacity , Text} from 'react-native';
import { UserContext } from "../../../store/User";
import GlobalStyles from '../../../style/GlobalStyles';

export default function LikeButton (props){

    const {user, saveUser} = useContext(UserContext)
    const [likeState, setlikeState] = useState(false)

    useEffect(()=>{
        const  isLike = ()=>{
            Object.values(user.favorites).map((fav)=>{
                console.log('nhnh',fav)
                if(fav.id === props.id){
                    console.log(props.element, 'is true' ,fav.id, props.id)
                   setlikeState(true)
                }
               })
        }
        isLike()
    },[user])

    const like = () =>{
       if(likeState === true){
        const newArray = user.favorites.filter((fav) => fav.id !== props.id)
        saveUser({
            ...user,
            favorites: newArray
        })
        setlikeState(false)
       }else{  
        const newLike = props.element
        saveUser({
            ...user,
            favorites: [
                
                    ...user.favorites,
                    {...newLike, id: props.id}
                
            ]
        })
        setlikeState(true)
        console.log('favvvv',user.favorites)
       }
    }
    
     return(
        <TouchableOpacity onPress={like} >
        {
            likeState ?
            <Ionicons name="heart-sharp" size={24} color={GlobalStyles.primary.color}/>: <Ionicons name="heart-outline" size={24} color="black" /> 
        }
        
  </TouchableOpacity>
     )
}