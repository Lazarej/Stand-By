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
    height: 100,
    flexDirection: "column",
    justifyContent: "center",
  },

  label: {
    fontFamily: "RobotoB",
    fontSize: 19,
    marginBottom: 2,
  },

  input: {
    backgroundColor: "#F8F8F8",
    width: "100%",
    height: 50,
    borderRadius: 13,
    paddingLeft: 10,
  },
});
