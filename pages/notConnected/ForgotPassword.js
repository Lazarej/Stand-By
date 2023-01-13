import Wrapper from "../../components/Global/Wrapper";
import { TextInput, View, Text, StyleSheet } from "react-native";
import GlobalStyles from "../../style/GlobalStyles";
import GlobalForm from "../../components/Global/Form/Form";
import TitleCont from "../../components/Global/TitleCont";
import { isWeb } from "../../globalVar/os";

export default function ForgotPasswordScreen() {
  const form = [
    {
      key: 0,
      type: "email-address",
      value: "",
      placeholder: "email",
      label: "E-mail",
      secure: false,
    },
  ];

  return (
    <View style={isWeb ? { alignItems: "center" } : {flex:1}}> 
      <View style={isWeb ? { width: "50%" } :  {flex:1}}> 
        <Wrapper>
      <View style={ isWeb ? { flex: 2, marginVertical: 50 } : { flex: 2, marginTop: 50 }}>
        <TitleCont title={"Mot de passe oublié"} text={"Entrer votre email pour réinitialisé votre mot de passe !"}></TitleCont>
      </View>
      <View style={{ flex: 7, marginTop: 20 }}>
        <GlobalForm {...form} textButton={"Envoyer"}></GlobalForm>
      </View>
    </Wrapper>
      </View>
    </View>
  );
}
