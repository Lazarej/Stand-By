import { Button, Image, Modal, StyleSheet, Text,View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Video } from "expo-av";
import { _URL } from "../../../globalVar/url";
import { useEffect, useRef, useState } from "react";
import GlobalStyles from "../../../style/GlobalStyles";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";

export default function VideoCard(props) {
  const video = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState({});
  const [playerOpen, setPlayerOpen] = useState(false)
  const [videoMilli, setVideoMilli] = useState(0);
  const [progressIndicator, setProgressIndicator] = useState(0);

  useEffect(() => {}, [progressIndicator]);

  const quitVideo = () => {
    setProgressIndicator(
      (prev) =>
        (prev = ((status.positionMillis / status.durationMillis) * 100).toFixed(
          2
        ))
    );
    setVideoMilli((prev) => (prev = status.positionMillis));

    setIsOpen(false);
  };

  const openVideo = () => {
    setIsOpen(true);
    if (isOpen === true) {
      console.log(status.positionMillis);
    }
  };

  const updateVideoMilli = (value) => {
    video.current.playFromPositionAsync(value);
  };

  const displayPlayer = () => {
    setPlayerOpen(prev => prev =! prev)
  }

  return (
    <TouchableOpacity onPress={() => openVideo()} style={styles.card}>
      <Image
        style={styles.image}
        source={{
          uri: `${_URL}${props.item.image.data.attributes.url}`,
        }}
      />
      <View style={styles.infoCont}>
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
      
         <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        statusBarTranslucent
        style={{ position: 'relative' }}
      >
        <TouchableOpacity
         onPressIn={() => displayPlayer()}
        >
              <Video
          
          ref={video}
          source={{ uri: `${_URL}${props.item.media.data.attributes.url}` }}
          resizeMode="cover"
          fullscreen={false}
          shouldPlay
          positionMillis={videoMilli}
          useNativeControls={false}
          onError={(error) => console.log(error)}
          onLoad={() => console.log("load")}
          onLoadStart={() => ""}
          onPlaybackStatusUpdate={(status) => {
            setStatus((prev) => (prev = status));
          }}
          style={{height: '100%',}}
        />
      </TouchableOpacity>
        {
          playerOpen ? 
            <View style={styles.player}>
          <View style={styles.playerTop}>
            <LinearGradient
              style={{ height: "100%", width: "100%" }}
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.6)", "rgba(0,0,0,1)"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              locations={[0.1, 0.5, 1]}
            />
            <Ionicons
              onPress={() => quitVideo()}
              style={{
                position: "absolute",
                marginLeft: 10,
              }}
              name="arrow-back-outline"
              size={28}
              color="white"
            />
          </View>
          <View style={styles.playerBottom}>
            <LinearGradient
              style={{ height: "100%", width: "100%" }}
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.6)", "rgba(0,0,0,1)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              locations={[0.1, 0.5, 1]}
            />
            <View style={styles.contentBottom}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: 150,
                  height: 35,
                }}
              >
                <Ionicons
                  name="play-skip-forward"
                  size={24}
                  color="white"
                  style={{ transform: [{ rotateY: "180deg" }] }}
                  onPress={() =>
                    video.current.playFromPositionAsync(
                      status.positionMillis - 5000
                    )
                  }
                />

                {status.isPlaying ? (
                  <Ionicons
                    name="pause"
                    size={36}
                    color="white"
                    onPress={() => video.current.pauseAsync()}
                  />
                ) : (
                  <Ionicons
                    name="play"
                    size={36}
                    color="white"
                    onPress={() => video.current.playAsync()}
                  />
                )}
                <Ionicons
                  name="play-skip-forward"
                  size={24}
                  color="white"
                  onPress={() =>
                    video.current.playFromPositionAsync(
                      status.positionMillis + 5000
                    )
                  }
                />
              </View>
              <Slider
                style={{
                  width: 300,
                  height: 40,
                }}
                minimumTrackTintColor={GlobalStyles.primary.color}
                minimumValue={0}
                maximumValue={status.durationMillis}
                value={status.positionMillis}
                onSlidingComplete={(value) => updateVideoMilli(value)}
                maximumTrackTintColor={"white"}
                thumbTintColor={"white"}
              />
            </View>
          </View>
        </View> : null
        }
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

  player: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: "100%",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "space-between",
  },

  playerTop: {
    height: "20%",
    justifyContent: "center",
  },

  playerBottom: {
    height: "20%",
    flexDirection: "row",
    justifyContent: "center",
  },

  contentBottom: {
    position: "absolute",
    bottom: 30,
    alignItems: "center",
  },
});
