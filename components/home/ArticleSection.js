import { View, StyleSheet,Text, } from "react-native";
import GlobalStyles from "../../style/GlobalStyles";
import {RFPercentage} from "react-native-responsive-fontsize";
import { Link } from "@react-navigation/native";
import ArticlesCard from "../Global/Card/ArticlesCard";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../store/User";
import axios from "axios";

export default function ArticleSection (){

    const { user } = useContext(UserContext);
    const [articlesState, setArticlesState] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        const getData =   () => {
            const article = user.interests.map(async(interest)=>{
              try {
                const response = await axios.get(
                  `http://192.168.0.50:1337/api/articles?populate=*&filters[interet][type][$contains]=${interest.type}`,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${user.token}`,
                    },
                  }
                );
                const data =  await response.data.data[0]
                if(data !== undefined){
                 return  data
                }
              } catch (error) {
                  console.error(error)
              }
            })
            setArticlesState(prev => (article))
          };
          getData();
    },[])

    console.log('articles', articlesState)
    
    /*const test = articlesState.map((e)=>{
      return e 
    })

    console.log('state',test)*/
    return(
        <View style={styles.container}>
            <View style={styles.sectionHeader}>
              <Text style={GlobalStyles.title}>Nos petits Articles</Text>
              <Link  style={styles.headerLink} to={'/Article'}>Tout voir</Link>
           </View>
           <View>
              <ArticlesCard></ArticlesCard>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
      container:{
         width:'100%',
      },

      sectionHeader:{
        marginBottom:30,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'baseline'
    },

    headerLink:{
        fontWeight:'bold',
        color:GlobalStyles.primary.color, 
        fontSize: RFPercentage(2.1)

    },
})