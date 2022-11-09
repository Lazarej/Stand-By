import { useEffect, useState,  } from "react";
import {Text, View,FlatList} from "react-native";
import Wrapper from "../../components/Global/Wrapper";
import { useContext } from "react";
import { UserContext } from "../../store/User";
import NewsCard from "../../components/Global/Card/NewsCard";

export default function FavoriteScreen (){

    const {user} = useContext(UserContext)
    const [favoritesState, setFavoritesState] = useState([])

    useEffect(()=>{
        setFavoritesState(prev => prev = user.favorites)
    },[user.favorites])

    const oneNews = ({item}) =>{
        console.log(item)
        return(
            <NewsCard element={item} key={item.id} id={item.id} title={item.attributes.title} text={item.attributes.text} image={item.attributes.image.data.attributes.url}></NewsCard>
        )
    }

    return(
        <Wrapper>
            <FlatList 
            style={{paddingTop:20,}}

            showsVerticalScrollIndicator={false}
            data={favoritesState}
            renderItem={oneNews}
            />

        </Wrapper>
    )
}