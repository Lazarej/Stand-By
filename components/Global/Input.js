import { TextInput, View, Text, StyleSheet } from "react-native";
import GlobalStyles from "../../style/GlobalStyles";

export default function GlobalInput(props) {
  return (
    <View style={styles.inputCont}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
      name={props.name}
        keyboardType={props.type}
        secureTextEntry={props.secure}
        underlineColorAndroid="transparent"
        selectionColor={GlobalStyles.primary.color}
        style={styles.input}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  inputCont: {
    width: "100%",
    height: 85,
    flexDirection: "column",
    justifyContent: "flex-end",

  },

  label: {
    fontFamily: "RobotoB",
    fontSize: 17,
    marginBottom: 2,
  },

  input: {
    backgroundColor: "#F8F8F8",
    width: "100%",
    height: 45,
    borderRadius: 13,
    paddingLeft: 10,
  },
});
