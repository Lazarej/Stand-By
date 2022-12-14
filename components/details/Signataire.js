import axios from "axios";
import { useEffect, useState } from "react";
import { View , Text, Image} from "react-native";
import { _URL } from "../../globalVar/url";
import { useContext } from "react";
import { UserContext } from "../../store/User";
import { Avatar } from "react-native-paper";
import { RFPercentage } from "react-native-responsive-fontsize";


export default function Signataire (props) {

    const [state, setState] = useState({})
    const { user, saveUser } = useContext(UserContext);
    
    useEffect(()=>{
        console.log(state.attributes.image.data.attributes.url, props.image)
        getSignataire();
        
    },[])

    const getSignataire = async() =>{
        try {
            const response = await axios.get(
                `${_URL}/api/signataires/${props.id}?populate=*`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                  },
                }
              );
              const data = await response.data.data;
              setState(prev => prev= data)
        } catch (error) {
            console.error(error)
        }

    }

    return(
        <>
           {
            state.attributes &&
            <View style={{marginBottom:40}}>
                <Avatar.Image style={{marginBottom:20}}  size={80} source={{uri: `${_URL}${state.attributes.image.data.attributes.formats.small.url}`}}></Avatar.Image>
             <Text style={{ fontSize:RFPercentage(2.5), marginBottom:5 }}>Fait par : <Text style={{textTransform:'uppercase',}}>{state.attributes.nom}</Text></Text>  
             <Text style={{color:'#AAAAAA', fontWeight:'500'}}>{state.attributes.poste}</Text>
            </View>
           }
           
        </>
    )



}