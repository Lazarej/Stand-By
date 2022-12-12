import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated, Button, ImageBackground, View } from "react-native";


export default function Loader(){

    const loaderAnim = useRef( new Animated.Value(-60)).current

    useEffect(()=>{
       navigation()
   
    },[loaderAnim])
    const navigation = ( ) =>{
        Animated.loop(
            Animated.timing(loaderAnim, {
                toValue: 300,
                duration:1500,
                
                useNativeDriver:true
             })

        ).start()
    }
  

    return(
        <View style={{flex:1, }}>
           <ImageBackground 
           style={{height:300 , marginTop:30,}}
           source={require('../../assets/images/loading.png')}
           >
            <Animated.View style={{height:'100%', width:100 , transform:[{translateX: loaderAnim,}, {rotate:'-160deg'}]}}>
            <LinearGradient           
            style={{height:'120%', width:100}}
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.8)' , 'rgba(255,255,255,0)']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            locations={[0.1,0.5,0.9]}
            />
            </Animated.View>
           </ImageBackground>
           <ImageBackground 
           style={{height:300 , marginTop:30,}}
           source={require('../../assets/images/loading.png')}
           >
            <Animated.View style={{height:'100%', width:100 , transform:[{translateX: loaderAnim},{rotate:'-160deg'}]}}>
            <LinearGradient           
            style={{height:'100%', width:100}}
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.8)' , 'rgba(255,255,255,0)']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            locations={[0.1,0.5,0.9]}
            />
            </Animated.View>
           </ImageBackground>

  
        </View>
    )
}