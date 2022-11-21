import { useEffect, useState } from "react";
import { View, StyleSheet, Text} from "react-native";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../store/User";
import ArticlesCard from "../Global/Card/ArticlesCard";
import GlobalStyles from "../../style/GlobalStyles";

export default function OtherArticle(props) {
  const { user } = useContext(UserContext);
  const [randomArticle, setRandomArticle] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.50:1337/api/articles?populate=*&filters[interet][type][$contains]=${props.interest.data.attributes.type}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.data.data.filter((e) =>{
        return e.id !== props.id
      });
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      const slice = shuffled.slice(0, 2);
      setRandomArticle((prev) => (prev = slice));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    {
        randomArticle.length !== 0 ?
        <View style={styles.container}>
        <View>
            <Text style={{...GlobalStyles.title, marginBottom:30}}>Décrouvrez nos articles semblable</Text>
        </View>
      {randomArticle.map((article) => (
        <ArticlesCard
          interest={article.attributes.interet}
          key={article.id}
          title={article.attributes.title}
          text={article.attributes.text}
          image={article.attributes.image.data.attributes.url}
        />
      ))}
    </View> : null
    }
    </>
  );
}

const styles  = StyleSheet.create({

    container:{
        paddingTop:60,
      borderTopWidth:1,
      borderTopColor:"#E6E6E6",
      marginBottom:60
    }
})
