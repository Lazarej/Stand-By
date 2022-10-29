import {Text, View } from 'react-native';
import GlobalButton from '../../components/Global/Button';
import Wrapper from '../../components/Global/Wrapper';
import GlobalStyles from '../../style/GlobalStyles';
import { useContext } from "react";
import { UserContext } from "../../store/User";


export default function HomeScreen({navigation}) {
   
  const {logout} = useContext(UserContext)

    return (
      <Wrapper paddingV={0}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={GlobalStyles.title}>Homepage</Text>
        <GlobalButton onPress={logout} title={"S'inscrire"}></GlobalButton>
      </View>
      </Wrapper>
    );
  }