import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import AnimatedLottieView from "lottie-react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { Animated, Modal, StyleSheet, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { _URL } from "../../globalVar/url";
import GlobalStyles from "../../style/GlobalStyles";
import { isWeb } from "../../globalVar/os";

export default function PlayerVideo(props) {
  const video = useRef(null);
  const fade = useRef(new Animated.Value(0)).current;
  const [videoPause, setVideoPause] = useState(false);
  const [status, setStatus] = useState({});
  const [playerOpen, setPlayerOpen] = useState(false);
  const [videoMilli, setVideoMilli] = useState(0);

  const quitVideo = () => {
    const transformOnPourcentage = (
      (status.positionMillis / status.durationMillis) *
      100
    ).toFixed(2);
    setVideoMilli((prev) => (prev = status.positionMillis));
    setPlayerOpen(false);
    props.updateProgress(transformOnPourcentage);
  };

  const updateVideoMilli = (value) => {
    video.current.playFromPositionAsync(value);
  };

  const onLoad = () => {
    if (status.durationMillis !== status.positionMillis) {
      video.current.playFromPositionAsync(videoMilli);
    } else {
      video.current.playFromPositionAsync(0);
    }
  };

  const displayPlayer = () => {
    setPlayerOpen((prev) => (prev = !prev));
    Animated.spring(fade, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const removePlayer = async () => {
    Animated.spring(fade, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setPlayerOpen((prev) => (prev = !prev));
    });
  };
  const play = () => {
    video.current.playAsync();
    if (status.isPlaying) {
      setVideoPause(false);
    }
  };

  const pause = () => {
    setVideoPause(true);
    video.current.pauseAsync();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.isOpen}
      statusBarTranslucent
      style={{ position: "relative" }}
    >
      <TouchableOpacity onPressIn={() => displayPlayer()}>
        {
          isWeb ?
            <video
              src={`${_URL}${props.video}`}
              controls
            >

          </video> : <Video
          ref={video}
          source={{ uri: `${_URL}${props.video}` }}
          resizeMode="cover"
          fullscreen={false}
          shouldPlay
          useNativeControls={false}
          onError={(error) => console.log(error)}
          onLoad={() => onLoad()}
          onLoadStart={() => ""}
          videoStyle={{height: "100%"}}
          onPlaybackStatusUpdate={(status) => {
            setStatus((prev) => (prev = status));
          }}
        
        />
        }
      </TouchableOpacity>
      {playerOpen ? (
        <Animated.View style={{ ...styles.player, opacity: fade }}>
          <TouchableOpacity onPress={() => removePlayer()}>
            <View
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
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

                    {status.durationMillis !== status.positionMillis ? (
                      status.isPlaying ? (
                        <Ionicons
                          name="pause"
                          size={36}
                          color="white"
                          onPress={() => pause()}
                        />
                      ) : (
                        <Ionicons
                          name="play"
                          size={36}
                          color="white"
                          onPress={() => play()}
                        />
                      )
                    ) : (
                      <MaterialCommunityIcons
                        name="replay"
                        size={36}
                        color="white"
                        onPress={() => video.current.playFromPositionAsync(0)}
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
            </View>
          </TouchableOpacity>
        </Animated.View>
      ) : null}
      {/* {status.isPlaying !== true &&
      videoPause !== true &&
      status.positionMillis !== status.durationMillis ? (
        <AnimatedLottieView
          styles={{ position: "absolute", zIndex: 10000 }}
          source={require("../../assets/lotties/97203-loader.json")}
          autoPlay
          loop
        />
      ) : null} */}
    </Modal>
  );
}

const styles = StyleSheet.create({
  player: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: "100%",
    zIndex: 10,
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
