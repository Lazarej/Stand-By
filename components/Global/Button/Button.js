import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import GlobalStyles from "../../../style/GlobalStyles";

export default function GlobalButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    width: "100%",
    height: 50,
    backgroundColor: GlobalStyles.primary.backgroundColor,
    borderRadius: 7,
    justifyContent: "center",
  },
  appButtonText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "RobotoB",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
