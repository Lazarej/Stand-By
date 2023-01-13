import Wrapper from "../../components/Global/Wrapper";
import { StyleSheet, Text, View, Switch } from "react-native";
import GlobalStyles from "../../style/GlobalStyles";
import GlobalForm from "../../components/Global/Form/Form";
import { Link } from "@react-navigation/native";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../store/User";
import TitleCont from "../../components/Global/TitleCont";
import { isWeb } from "../../globalVar/os";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function SignupScreen() {
  const { signup } = useContext(UserContext);
  const [saveUser, setSaveUser] = useState(false);
  const form = [
    {
      inputError: false,
      errorText: "Vous devez entrer une adresse email valide",
      name: "email",
      key: 0,
      type: "email-address",
      value: "",
      placeholder: "email",
      label: "E-mail",
      secure: false,
    },
    {
      inputError: false,
      errorText:
        "Votre mot de passe doit commencer par une majuscule et avoir au moins un chiffre",
      name: "password",
      key: 1,
      value: "",
      placeholder: "mot de passe",
      label: "Mot de passe",
      secure: true,
    },
    {
      inputError: false,
      errorText:
        "Le contenu de ce champ doit etre identique a votre mot de passe",
      name: "repeatPassword",
      key: 2,
      value: "",
      placeholder: "répéter le mot de passe",
      label: "Sécuriser le mot de passe",
      secure: true,
    },
    {
      inputError: false,
      errorText: "Vous devez entrer un numéro valide",
      name: "phone",
      key: 3,
      type: "phone-pad",
      value: "",
      placeholder: "numéro de téléhpone",
      label: "Numéro de télephone",
      secure: true,
    },
  ];

  return (
    <View style={isWeb ? { alignItems: "center" } :  {flex:1}}>
      <View style={isWeb ? { width: "50%" } :  {flex:1}}>
        <Wrapper paddingT={100}>
          <View style={{ flex: 3 }}>
            <TitleCont
              title={"S'inscrire"}
              text={
                "Completer cette étape vous créer  un compte sur la platforme !"
              }
            ></TitleCont>
          </View>
          <View style={{ flex: 10 }}>
            <GlobalForm {...form} textButton={"S'inscrire"} function={signup}>
              <View style={styles.infoForm}></View>
            </GlobalForm>
          </View>
          <View style={styles.creationCont}>
            <Text
              style={
                isWeb
                  ? {
                      ...GlobalStyles.text,
                      marginRight: 5,
                      fontSize: RFPercentage(1.2),
                    }
                  : { ...GlobalStyles.text, marginRight: 5 }
              }
            >
              Déja un compte ?
            </Text>
            <Link
              to={{ screen: "Login" }}
              style={
                isWeb
                  ? {
                      fontSize: RFPercentage(1.2),
                      color: GlobalStyles.primary.color,
                      fontFamily: "RobotoB",
                    }
                  : {
                      ...GlobalStyles.text,
                      color: GlobalStyles.primary.color,
                      fontFamily: "RobotoB",
                    }
              }
            >
              Se connecter
            </Link>
          </View>
        </Wrapper>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  creationCont: {
    flex: 2,
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "center",
  },
  infoForm: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
