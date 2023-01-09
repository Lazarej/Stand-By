import { Animated, Image, Modal, StyleSheet, Text, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { _URL } from "../../../globalVar/url";
import { useEffect, useRef, useState } from "react";
import GlobalStyles from "../../../style/GlobalStyles";
import { TouchableOpacity } from "react-native";
import PlayerVideo from "../PlayerVideo";

export default function VideoCard(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [progressIndicator, setProgressIndicator] = useState(0);

  useEffect(() => { 
    console.log(props.item)
  }, [progressIndicator]);
  
  const updateProgress = (value) => {
     setProgressIndicator(
      (prev) =>
        (prev = value)
    );
    setIsOpen(false);
  }

  return (
    <TouchableOpacity onPress={() => setIsOpen(true)} style={styles.card}>
      <Image
        style={styles.image}
        source={{
          uri: `${_URL}${props.item.image.data.attributes.url}`,
        }}
      />
      <View style={{ ...styles.infoCont }}>
        <View>
          <Text style={styles.title}>{props.item.title}</Text>

          <Text style={{ ...GlobalStyles.text, fontSize: RFPercentage(2.1) }}>
            {props.item.time} min
          </Text>
        </View>
        <View style={styles.progress}>
          <View
            style={{
              backgroundColor: GlobalStyles.primary.color,
              height: "100%",
              width: `${progressIndicator}%`,
              borderRadius: 15,
            }}
          ></View>
        </View>
      </View>
      <PlayerVideo
        isOpen={isOpen}
        video={props.item.media.data.attributes.url}
        updateProgress={(value) =>updateProgress(value)}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 95,
    backgroundColor: "#fff",
    padding: 10,
    borderColor: "#F4F4F4",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 15,
    flexDirection: "row",
  },

  image: {
    height: 75,
    width: 75,
    marginRight: 10,
    resizeMode: "cover",
    borderRadius: 15,
  },

  infoCont: {
    justifyContent: "space-between",
  },

  title: {
    fontFamily: "RobotoN",
    fontSize: RFPercentage(2.4),
  },

  time: {
    fontFamily: "RobotoN",
    color: "#E6E6E6",
  },

  progress: {
    height: 8,
    width: 200,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    // backgroundColor:'#F1F1F1'
  },
});
