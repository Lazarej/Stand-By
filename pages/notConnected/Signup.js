import { useState } from 'react';
import {Text,StyleSheet, View } from 'react-native';
import GlobalInput from '../../components/Global/Input';
import Wrapper from '../../components/Global/Wrapper';
import GlobalStyles from '../../style/GlobalStyles';

export default function SignupScreen() {

    const [signup, setSignup] = useState({
      email:'dqzdqz',
      password:''
    });  

        
    return (
      <Wrapper  paddingV={0}>
        <View style={{flex:2, backgroundColor:'green'}}>
        <Text style={GlobalStyles.title}>Se connecter</Text>
        <Text style={GlobalStyles.text}>completer cette étape pour accédez à nos services !</Text>
        </View>
        <View style={styles.formCont}>
         <GlobalInput name='email' placeholder={'email'} label={'E-mail'} value={signup.email} onChangeText={(text) => setSignup({...signup, email: text}) }></GlobalInput>
         <GlobalInput name='password' placeholder={''} label={'Mot de passe '} value={signup.password} onChangeText={(text) => setSignup({...signup, password: text})} secure={true} ></GlobalInput>
        </View>
        <View style={{flex:1, backgroundColor:'blue'}}>

        </View>
        <View style={{flex:6, backgroundColor:'yellow'}}>

        </View>

      </Wrapper>
    );
  }
  

  const styles = StyleSheet.create({
    formCont:{
      flex:8,
      justifyContent:'center'
    }
  })