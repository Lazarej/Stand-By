import {Text, View } from 'react-native';
import GlobalButton from '../../components/Global/Button';

import Wrapper from '../../components/Global/Wrapper';
import GlobalStyles from '../../style/GlobalStyles';



export default function HomeScreen({navigation}) {
    return (
      <Wrapper paddingV={0}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={GlobalStyles.title}>s'inscrire</Text>
        <GlobalButton title={"S'inscrire"}></GlobalButton>
      </View>
      </Wrapper>
    );
  }