import { FlatList, Text, useWindowDimensions, View } from "react-native";
import Wrapper from "../../components/Global/Wrapper";
import { memo, useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../store/User";
import axios from "axios";
import NewsCard from "../../components/Global/Card/NewsCard";

export default function NewsLetterScreen() {
  const { user } = useContext(UserContext);
  const { width, height } = useWindowDimensions();
  const [newsState, setNewsState] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(`${process.env._URL}/api/news?populate=*`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.data.data;
      setNewsState((prev) => (prev = data));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    console.log('news',user.favorites)
    getData();
  },[]);

  return (
    <Wrapper>
      <FlatList
        style={
          width > height
            ? { paddingTop: 20, flexWrap: "wrap" }
            : { paddingTop: 20 }
        }
        numColumns={width > height ? 2 : 1}
        showsVerticalScrollIndicator={false}
        data={newsState}
        columnWrapperStyle={
          width > height ? { justifyContent: "center" ,flexDirection:'row', flexWrap:'wrap' } : null
        }
        renderItem={({ item }) => (
          <NewsCard element={item} key={item.id}></NewsCard>
        )}
      />
    </Wrapper>
  );
}
