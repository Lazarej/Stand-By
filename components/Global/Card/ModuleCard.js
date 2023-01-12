import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, Image, StyleSheet, View, Text } from "react-native";
import { _URL } from "../../../globalVar/url";
import { useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import AddButton from "../Button/AddButton";

export default function ModuleCard(props) {
  const navigation = useNavigation();

  useEffect(() => {});

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("DetailsModule", {
          item: props.item,
          id: props.item.id,
        })
      }
      style={styles.card}
    >
     
      <Image
        style={styles.image}
        resizeMode={"contain"}
        source={{
          uri: `${_URL}${props.item.attributes.image.data.attributes.url}`,
        }}
      />
      <Text style={styles.cardTitle}>{props.item.attributes.title}</Text>
      <Text style={styles.videoLength}>
        {props.item.attributes.video.length} vidéos
      </Text>
       <View style={styles.addCont}>
        <AddButton  id={props.item.id} item={props.item} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 190,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#E6E6E6",
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },

  image: {
    height: 100,
    width: 150,
    backgroundColor: "purple",
  },

  cardTitle: {
    textAlign: "center",
    fontSize: RFPercentage(3.2),
    fontFamily: "RobotoB",
    marginTop: 10,
  },

  videoLength: {
    textAlign: "center",
    fontSize: RFPercentage(2.3),
    fontFamily: "RobotoN",
    color: "#AAAAAA",
  },

  addCont: {

    position: "absolute",
    top: 10,
    zIndex:1000,
    right: 10,

  },
});
