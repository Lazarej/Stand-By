import {Text, View} from "react-native";

export default function NoResult (props){

    return(
    <View style={{height:'100%' ,width:'100%', justifyContent:'center', alignItems:'center', }}>
        <Text style={{textTransform:'uppercase', fontFamily:'RobotoN', color:'#AAAAAA', fontSize:18, textAlign:'center', width:'90%'}}>{props.title}</Text>
    </View>
    )
}