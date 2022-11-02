import Wrapper from "../../components/Global/Wrapper";
import { TextInput, View, Text, StyleSheet } from "react-native";
import GlobalStyles from "../../style/GlobalStyles";
import GlobalForm from "../../components/Global/Form";
import TitleCont from "../../components/Global/TitleCont";

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
    <Wrapper>
      <View style={{ flex: 2, marginTop: 50 }}>
        <TitleCont title={"Mot de passe oublié"} text={"Entrer votre email pour réinitialisé votre mot de passe !"}></TitleCont>
      </View>
      <View style={{ flex: 7, marginTop: 20 }}>
        <GlobalForm {...form} textButton={"Envoyer"}></GlobalForm>
      </View>
    </Wrapper>
  );
}
