import {Text, View,useWindowDimensions } from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view';
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../store/User";
import axios from "axios";

export default function ArticleScreen (){

    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
      );
      
      const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
      );
      
      const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      });
   
    const layout = useWindowDimensions();
    const { user } = useContext(UserContext);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
    ]);
    const [articleState, setArticleState] = useState([])

    const getData = async () => {
        try {
          const response = await axios.get(
            "http://192.168.0.50:1337/api/articles?populate=*",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          const data = await response.data.data;
          setArticleState((prev) => ((prev) = (data)));
        } catch (error) {
            console.error(error)
        }
      };

    useEffect(()=>{     
          getData();
    },[])
     

   
  
    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    );
}