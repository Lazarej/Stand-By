import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, Image, StyleSheet, View, Text } from "react-native";
import { _URL } from "../../../globalVar/url";
import { useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function ModuleCard(props) {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {});

  return (
    <TouchableOpacity
      style={
        props.checkIndexIsEven(props.index)
          ? {
              ...styles.cardOne,
              width: windowWidth / 2.8,
              height: windowWidth / 2.2,
            }
          : {
              ...styles.cardTwo,
              height: windowWidth / 2.7,
              width: windowWidth / 2.2,
            }
      }
      onPress={() =>
        navigation.navigate("DetailsModule", {
          item: props.item.attributes,
          id: props.item.id,
        })
      }
    >
      <View
        style={
          props.checkIndexIsEven(props.index)
            ? {}
            : {
                flexDirection: "column-reverse",
              }
        }
      >
        <Image
          style={styles.image}
          source={{
            uri: `${_URL}${props.item.attributes.image.data.attributes.url}`,
          }}
        />
        <View style={styles.infoCont}>
          <Text style={styles.cardTitle}>{props.item.attributes.title}</Text>
          <Text style={styles.videoLength}>
            {props.item.attributes.video.length} vidéos
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardOne: {
    padding: 5,
    borderColor: "#AAAAAA",
    borderWidth: 1,
    borderRadius: 15,
  },

  cardTwo: {
    padding: 5,

    borderColor: "#AAAAAA",
    borderWidth: 1,
    borderRadius: 15,
  },

  mainCont: {},

  image: {
    height: "70%",
    borderRadius: 15,
  },

  infoCont: {
    paddingHorizontal: 5,
  },

  cardTitle: {
    textAlign: "center",
    fontSize: RFPercentage(2),
    fontFamily: "RobotoB",
  },

  videoLength: {
    textAlign: "center",
    fontSize: RFPercentage(2),
    fontFamily: "RobotoN",
    color: "#AAAAAA",
  },
});
