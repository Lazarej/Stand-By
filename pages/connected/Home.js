import {Text, View,ScrollView ,StyleSheet} from 'react-native';
import Wrapper from '../../components/Global/Wrapper';
import GlobalStyles from '../../style/GlobalStyles';
import { useContext } from "react";
import { UserContext } from "../../store/User";
import {RFPercentage} from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons'; 
import NewsSection from '../../components/home/NewsSection';

export default function HomeScreen({navigation}) {
   
  const {user,logout} = useContext(UserContext)

    return (

        <ScrollView style={{ flex: 1 }}
      contentContainerStyle={{ minHeight: "100%" }}>
          
        <View style={{ width:'100%', flex:1, justifyContent: 'space-evenly', backgroundColor: GlobalStyles.primary.backgroundColor }}>
        <Feather style={{marginLeft:'10%'}} name="menu" size={44} color="#fff" />
        <View style={styles.titleContentCont}>       
        <Text style={styles.tilteText}>Les</Text>
        <Text style={styles.tilteText}>News</Text>
        <Text style={styles.tilteText}>Du</Text>
        <Text style={styles.tilteText}>Moment !</Text>
        </View>
        
      </View>

         <NewsSection></NewsSection>

      </ScrollView>

   
    );
  }

  const styles = StyleSheet.create({
    titleContentCont: {
      width:'100%',
      marginLeft:'10%'
    },

    tilteText:{
      fontFamily:'RobotoB',
      color:'#fff',
      fontSize:RFPercentage(9),
      textTransform:'uppercase',
      lineHeight:58,
      letterSpacing:-3,
    }

  })    