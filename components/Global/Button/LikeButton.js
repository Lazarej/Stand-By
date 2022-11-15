import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from "react";
import { TouchableOpacity , Text} from 'react-native';
import { UserContext } from "../../../store/User";
import GlobalStyles from '../../../style/GlobalStyles';

export default function LikeButton (props){
    const {user, saveUser} = useContext(UserContext)
    const [likeState, setlikeState] = useState(false)

    const checkLike = () =>{
        const filter = user.favorites.filter((fav)=>{
               return fav.id === props.id 
        })
        if(filter.length !== 0){
            setlikeState(prev => prev = true)
        }
    }

    useEffect(()=>{
       checkLike()
       return() =>{
        setlikeState(prev => prev = false)
       }
    },[user.favorites])
    
    const like = () =>{
           if(likeState !== true){
            saveUser(               
                {
                 ...user,
                 favorites: [...user.favorites, props.element]
                }             
             )
             
           }else{
           const removeFav =  user.favorites.filter((fav)=>{
                return fav.id !== props.id 
         })

         saveUser(               
            {
             ...user,
             favorites: removeFav
            }             
         )
         

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