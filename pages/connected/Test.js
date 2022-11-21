
import Wrapper from "../../components/Global/Wrapper";
import { memo, useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/User";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, FlatList, View , Text, TextInput, Button } from "react-native";

import GlobalStyles from "../../style/GlobalStyles";

function TestButton (props){

    const { user, saveUser} = useContext(UserContext);
    const [likeState, setlikeState] = useState(false);


    useEffect(() =>{
            // console.log('test', props.id)
           const Liked = ()=>{
            const isLiked = user.favorites.some((fav) => {
                return fav.id === props.id;
              });
                setlikeState((prev) => (prev = isLiked));
           }

           Liked()
              
  
    })

    const Like = () => {

        if (likeState !== true) {
          saveUser({
            ...user,
            favorites: [...user.favorites, props.element],
          });
        }else{ 

          const removeFav = user.favorites.filter((fav) => {
            return fav.id !== props.id;
          });
          const removeCat = user.userLikesCategories.map((cat)=>{
            if(cat.newsId.includes(props.id)){
               const filter = cat.newsId.filter((id)=>{
                    return id !== props.id
                  })
                return {
                    ...cat,
                    newsId: filter
                } 
              }else{
                return cat
              }
          })
          saveUser({
            ...user,
            favorites: removeFav,
            userLikesCategories: removeCat
          });
        }
      };

     return(
        <TouchableOpacity onPress={Like}>
      {likeState ? (
        <Ionicons
          name="heart-sharp"
          size={props.size}
          color={GlobalStyles.primary.color}
        />
      ) : (
        <Ionicons name="heart-outline" size={props.size} color="black" />
      )}
    </TouchableOpacity>
     )
    
}


function CardTest (props){
    
    
    useEffect(() =>{
        console.log('re render card' , props.element)

    },)

    return(
        <View style={{width:'100%', backgroundColor:'blue', marginVertical:20, height:80 , flexDirection:'row' , justifyContent:'space-between'}}> 
        <Text>{props.title}</Text>
         <TestButton size={24} id={props.id} element={props.element} />
        </View>
    )
}

export default function Test() {
 
    const { user, saveUser} = useContext(UserContext);
    const [state, setState] = useState() 

    useEffect(() =>{
        console.log('re render page' )
       setState( prev => prev =  user.favorites)

    }, )

    

  return (
    <Wrapper>
      <FlatList
        style={{ paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
        data={state}
        renderItem={({ item }) => (
          <CardTest
            element={item}
            key={item.id}
            id={item.id}
            title={item.attributes.title}
            text={item.attributes.text}
            image={item.attributes.image.data.attributes.url}
          ></CardTest>
        )}
      />
    </Wrapper>
  );
}
