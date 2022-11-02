import { View,Text } from "react-native";
import GlobalStyles from "../../style/GlobalStyles";

export default function TitleCont(props) {
  return (
    <View>
      <Text style={GlobalStyles.title}>{props.title}</Text>
      <Text style={GlobalStyles.text}>
        {props.text}
      </Text>
    </View>
  );
}
