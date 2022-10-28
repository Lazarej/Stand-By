import Wrapper from "../../components/Global/Wrapper";
import { Button, StyleSheet, Text, View, Switch } from "react-native";
import GlobalStyles from "../../style/GlobalStyles";
import GlobalForm from "../../components/Global/Form";
import { Link } from "@react-navigation/native";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../store/User";

export default function SignupScreen() {

  const {signup} = useContext(UserContext)
  const [saveUser, setSaveUser] = useState(false);

  const form = [
    {
      name:'email',
      key: 0,
      type:'email-address',
      value: "",
      placeholder: "email",
      label: "E-mail",
      secure: false,
    },
    {
      name:'password',
      key: 1,
      value: "",
      placeholder: "mot de passe",
      label: "Mot de passe",
      secure: true,
    },
    {
      name:'repeatPassword',
      key: 2,
      value: "",
      placeholder: "répéter le mot de passe",
      label: "Sécuriser le mot de passe",
      secure: false,
    },
    {
      name:'phone',
      key: 3,
      type:'phone-pad',
      value: "",
      placeholder: "numéro de téléhpone",
      label: "Numéro de télephone",
      secure: true,
    },
  ];

  return (
    <Wrapper paddingT={100}>
      <View style={{flex:3}}>
        <Text style={GlobalStyles.title}>S'inscrire</Text>
        <Text style={GlobalStyles.text}>
          Completer cette étape pour accédez à nos services !
        </Text>
      </View>
      <View style={{flex:10}}>
        <GlobalForm {...form} textButton={"S'inscrire"} function={signup}>
        <View style={styles.infoForm}>
          <View style={styles.toggleCont}>
             <Switch trackColor={{ false: '#FFBFAE', true: GlobalStyles.primary.color }}
        thumbColor={'#fff'}
        onValueChange={() => setSaveUser(prev => !prev)}
        value={saveUser}></Switch>
        <Text style={saveUser ? {color: GlobalStyles.primary.color, fontFamily:'RobotoN'}: {color:'#FFBFAE' , fontFamily:'RobotoN'}}>Se souvenir de moi</Text>
          </View>
        </View>
        </GlobalForm>
      </View>
      <View style={styles.creationCont}>
        <Text style={{ ...GlobalStyles.text, marginRight: 5 }}>
          Déja un compte ?
        </Text>
        <Link
          to={"/Login"}
          style={{
            ...GlobalStyles.text,
            color: GlobalStyles.primary.color,
            fontFamily: "RobotoB",
          }}
        >
          Se connecter
        </Link>
      </View>
    </Wrapper>
  );
}


const styles = StyleSheet.create({
    creationCont:{
        flex:2,
        flexDirection:'row',
        marginTop:'30%',
        justifyContent:'center', 
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
     
  });