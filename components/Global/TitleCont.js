import { View,Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { isWeb } from "../../globalVar/os";
import GlobalStyles from "../../style/GlobalStyles";

export default function TitleCont(props) {
  return (
    <View>
      <Text style={GlobalStyles.title}>{props.title}</Text>
      <Text style={ isWeb ? {...GlobalStyles.text , fontSize: RFPercentage(1.5)} : {...GlobalStyles.text}}>
        {props.text}
      </Text>
    </View>
  );
}
