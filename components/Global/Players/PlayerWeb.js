import { useEffect, useRef, useState } from "react";
import { Modal, StyleSheet, useWindowDimensions } from "react-native";
import { View } from "react-native-web";
import { _URL } from "../../../globalVar/url";
import { Ionicons } from "@expo/vector-icons";

export default function PlayerWeb(props) {
  const video = useRef(null);
  const [videoMilli, setVideoMilli] = useState(0);
  const { width, height } = useWindowDimensions();

  useEffect(() => {});

  const quitVideo = () => {
    const transformOnPourcentage = (
      (video.current.currentTime / video.current.duration) *
      100
    ).toFixed(2);
    setVideoMilli((prev) => (prev = video.current.currentTime));
    props.updateProgress(transformOnPourcentage);
  };

  const onLoad = () => {
    if (video.current.duration !== video.current.currentTime) {
      video.current.currentTime = videoMilli;
    } else {
      video.current.currentTime = 0;
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.isOpen}
      statusBarTranslucent
    >
      <View style={styles.modBackground}>
        <video
          ref={video}
          style={width < height ? { width: "90%" } : { height: "80%" }}
          src={`${_URL}${props.video}`}
          controls
          autoPlay
          onPlay={() => onLoad()}
        />
        <Ionicons
          onPress={() => quitVideo()}
          style={{
            position: "absolute",
            marginLeft: 10,
            left: 15,
            top: 15,
          }}
          name="arrow-back-outline"
          size={28}
          color="white"
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modBackground: {
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  video: {
    width: "auto",
    height: "80%",
  },
});
