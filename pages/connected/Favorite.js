import { useEffect, useState } from "react";
import {Text, View,} from "react-native";
import Wrapper from "../../components/Global/Wrapper";
import { useContext } from "react";
import { UserContext } from "../../store/User";

export default function FavoriteScreen (){

    const {user} = useContext(UserContext)
    const [favoritesState, setFavoritesState] = useState(user.favorites)

    console.log(favoritesState)
    return(
        <Wrapper paddingV={100}>
            
        </Wrapper>
    )
}