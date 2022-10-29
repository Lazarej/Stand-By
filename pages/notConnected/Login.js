import { Link } from "@react-navigation/native";
import { useState } from "react";
import { Text, StyleSheet, View, Switch } from "react-native";
import GlobalInput from "../../components/Global/Input";
import Wrapper from "../../components/Global/Wrapper";
import GlobalStyles from "../../style/GlobalStyles";
import { FontAwesome } from '@expo/vector-icons';
import GlobalForm from "../../components/Global/Form";
import { useContext } from "react";
import { UserContext } from "../../store/User";

export default function LoginScreen() {

  const {login} = useContext(UserContext)

  const [saveUser , setSaveUser] = useState(false)

  const form = [
    {
      inputError:false,
      errorText:'Vous devez entrer une adresse email valide',
      name:'email',
      key:0,
      type:'email-address',
      value:'',
      placeholder:'email',
      label:'E-mail',
      secure:false
    },
    { 
      inputError:false,
      errorText:'Votre mot de passe doit commencer par une majuscule et avoir au moins un chiffre',
      name:'password',
      key:1,
      value:'',
      placeholder:'mot de passe',
      label:'Mot de passe',
      secure:true
    }
  ]
 
  return (
    <Wrapper paddingV={100}>
      <View style={{ flex: 2,}}>
        <Text style={GlobalStyles.title}>Se connecter</Text>
        <Text style={GlobalStyles.text}>
          Completer cette étape pour accédez à nos services !
        </Text>
      </View>
      <View style={styles.formCont}>
        <GlobalForm {...form} textButton={'Se connecter'} function={login}>
        <View style={styles.infoForm}>
          <View style={styles.toggleCont}>
             <Switch trackColor={{ false: '#FFBFAE', true: GlobalStyles.primary.color }}
        thumbColor={'#fff'}
        onValueChange={() => setSaveUser(prev => !prev)}
        value={saveUser}></Switch>
        <Text style={saveUser ? {color: GlobalStyles.primary.color, fontFamily:'RobotoN'}: {color:'#FFBFAE' , fontFamily:'RobotoN'}}>Se souvenir de moi</Text>
          </View>
          <Link to={{screen: 'ForgotPassword'}} style={{fontFamily:'RobotoN'}}>Mot de passe oublié ?</Link>
        </View>
        </GlobalForm>
      
      </View>
      <View style={styles.separatorCont}>
        <View style={styles.lineSeparator}/>
        <Text style={styles.textSeparator}>Se connecter avec</Text>
        <View style={styles.lineSeparator}/>  
      </View>
      <View style={{ flex: 2 }}>
        <View style={styles.iconsCont}>
          <View style={styles.iconCont}>
          <FontAwesome name="facebook-official" size={34} color={GlobalStyles.primary.color} />
          </View>
          <View style={styles.iconCont}>
          <FontAwesome name="google" size={34} color={GlobalStyles.primary.color}/>
          </View>
          <View style={styles.iconCont}>
          <FontAwesome name="apple"  size={34} color={GlobalStyles.primary.color} />
          </View>
        </View>
        <View style={styles.creationCont}>
          <Text style={{...GlobalStyles.text, marginRight:5}}>Pas de compte ?</Text>
          <Link to={'/Signup'} style={{...GlobalStyles.text, color: GlobalStyles.primary.color, fontFamily:'RobotoB'}}>Créer votre compte</Link>
        </View>
      </View>
    </Wrapper>
  );
} 

const styles = StyleSheet.create({
  formCont: {
    flex: 6,
    justifyContent: "center",
  },

  infoForm:{
   width:'100%',
   flexDirection:'row',
   justifyContent:'space-between',
   alignItems:'center'
  },

  toggleCont:{
     flexDirection:'row',
     alignItems:'center'

  },

  separatorCont:{
    flex: 1, 
    justifyContent:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },

  lineSeparator:{
     width:'30%',
     height:1,
     backgroundColor:'#D9D9D9',
     opacity:0.7
  },

  textSeparator:{
     fontFamily:'RobotoN',    
     marginBottom:4    
  },

  iconsCont:{
     width:'100%',
     marginTop:'5%',
     flexDirection:'row',
     justifyContent:'center',

  },

  iconCont:{
    borderWidth: 1,
    borderRadius:15,
    borderColor:'#E8E6EA',
    marginHorizontal:'2%',
    width:70,
    height:70,
    justifyContent:'center',
    alignItems:'center',
  },

  creationCont:{
    flexDirection:'row',
    marginTop:'10%',
    justifyContent:'center',

  }


});
