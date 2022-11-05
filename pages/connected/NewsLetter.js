import {FlatList, Text, View,} from "react-native";
import Wrapper from "../../components/Global/Wrapper";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../store/User";
import axios from "axios";
import NewsCard from "../../components/Global/Card/NewsCard";


export default function NewsLetterScreen (){

    const { user } = useContext(UserContext);
    const [newsState , setNewsState] = useState([])

    const getData = async () => {
        try {
          const response = await axios.get(
            "http://192.168.0.50:1337/api/news?populate=*",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          const data = await response.data.data;
          setNewsState((prev) => ((prev) = (data)));
        } catch (error) {
            console.error(error)
        }
      };

    useEffect(()=>{     
          getData();
    },[])

    const oneNews = ({item}) =>{
        return(
            <NewsCard element={item} key={item.id} id={item.id} title={item.attributes.title} text={item.attributes.text} image={item.attributes.image.data.attributes.url}></NewsCard>
        )
    }

    return(
        <Wrapper>
            <FlatList 
            style={{paddingTop:20,}}

            showsVerticalScrollIndicator={false}
            data={newsState}
            renderItem={oneNews}
            />

        </Wrapper>
    )
}