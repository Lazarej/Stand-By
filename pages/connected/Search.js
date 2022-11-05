import {Text, View,} from "react-native";
import GlobalButton from "../../components/Global/Button/Button";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../store/User";
import axios from "axios";
import Wrapper from "../../components/Global/Wrapper";
import GlobalInput from "../../components/Global/Form/Input";

export default function SearchScreen (){

    const {user,logout} = useContext(UserContext)

    const [search, setSearch] = useState()
    const [result, setResult] = useState([])
    const getData = async () => {
        try {
          const article = await axios.get(
            `http://192.168.0.50:1337/api/articles?filters[title][$contains]=${search}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          const news = await axios.get(
            `http://192.168.0.50:1337/api/news?filters[title][$contains]=${search}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          
          const data = [...article.data.data, ...news.data.data];
          console.log('base result', data)
        setResult((prev) => ((prev) = (data)));
        } catch (error) {
            console.error(error)
        }
      };

    useEffect(()=>{     
          getData();
    },[search])

    return(
        
            <Wrapper>
               <View>
               <GlobalInput
                 type={'text'}
                 placeholder={'Recherche'}
                 value={search}
                 onChangeText={(text) => setSearch(text)}
               />
               </View>
               {
                result.map((e)=>(
                    <Text>{e.attributes.title}</Text> 
                ))
               }
            </Wrapper>
        
    )
}