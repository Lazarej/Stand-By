import { Link } from "@react-navigation/native";
import { View,StyleSheet, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import GlobalStyles from "../../style/GlobalStyles";
import Wrapper from "../Global/Wrapper";
import {RFPercentage} from "react-native-responsive-fontsize";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../store/User";
import axios from "axios";
import NewsCard from "../Global/NewsCard";

export default function NewsSection (){

    const { user } = useContext(UserContext);
    const [newsState , setNewsState] = useState([])

    useEffect(()=>{
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
              const data = await response.data.data.slice(0,2)
              setNewsState((prev) => ((prev) = (data)));
            } catch (error) {
                console.error(error)
            }
          };
          getData();
    },[user])

    

    

    console.log('test', newsState)
    
    return(
       <Wrapper paddingV={60}>
        <View style={styles.container}>
        <View style={styles.sectionHeader}>
            <Text style={GlobalStyles.title}>Quoi de neuf ?</Text>
            <Link style={styles.headerLink} to={'/NewsLetter'}>Tout voir</Link>
        </View>
        <View style={styles.newsContainer}>
           {
            Object.values(newsState).map((e)=>(
                <NewsCard key={e.id} title={e.attributes.title} text={e.attributes.text} image={e.attributes.image.data.attributes.url}></NewsCard>
            ))
           }

        </View>
       </View>
       </Wrapper>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flex:1,

    },
    sectionHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'baseline'
    },

    headerLink:{
        fontFamily:'RobotoB',
        color:GlobalStyles.primary.color,
        fontSize: RFPercentage(2.4)

    },
    newsContainer:{
        
    }

  })   