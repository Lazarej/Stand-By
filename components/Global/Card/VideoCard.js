import { Modal, StyleSheet, Text, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { ResizeMode, Video } from "expo-av";
import { _URL } from "../../../globalVar/url";
import { useEffect, useRef, useState } from "react";
import { color } from "react-native-reanimated";
import GlobalStyles from "../../../style/GlobalStyles";
import ModalGlobal from "../Modal";
import { TouchableOpacity } from "react-native-gesture-handler";
import VideoPlayer from "expo-video-player";
import { AntDesign } from '@expo/vector-icons';

export default function VideoCard(props) {
  const video = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState({});
  const [videoTime, setVideoTime] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("status", video.current);
    if (status.isLoaded === true) {
      convertMillisecondsToTime(status.durationMillis);
    }
  }, [status.isLoaded]);

  const convertMillisecondsToTime = (milliseconds) => {
    var minutes = Math.floor(milliseconds / 60000);
    var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    setVideoTime((prev) => (prev = `${minutes}: ${seconds}`));
    setLoading((prev) => (prev = false));
  };

  const handleFullscreenUpdate = (event) => {};

  return (
    <TouchableOpacity onPress={() => setIsOpen(true)} style={styles.card}>
      <View style={styles.image}></View>
      <View style={styles.infoCont}>
        <View>
          <Text style={styles.title}>{props.item.title}</Text>

          <Text style={{ ...GlobalStyles.text, fontSize: RFPercentage(2.1) }}>
            {videoTime} min
          </Text>
        </View>
        <View style={styles.progress}></View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        statusBarTranslucent
      >
        <AntDesign onPress={()=> setIsOpen(false)} style={{position:'absolute', top:30 , left:20 , zIndex:10}} name="close" size={28} color="white" />    
        <VideoPlayer 
          videoProps={{
            resizeMode: ResizeMode.COVER,
            ref: video,
            shouldPlay: true,
            source: {
              uri: `${_URL}${props.item.media.data.attributes.url}`,
            },
          }}
          fullscreen={true} 
            slider={{
        visible: true,
          }}
          style={{
          }}
        />
      </Modal>
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

  video: {
    height: "0%",
  },
});
