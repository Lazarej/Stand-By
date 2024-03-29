import { Animated, Image, Modal, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

import { useEffect, useRef, useState } from "react";
import GlobalStyles from "../../../style/GlobalStyles";
import { TouchableOpacity } from "react-native";
import PlayerVideo from "../Players/PlayerVideo";
import { isWeb } from "../../../globalVar/os";
import PlayerWeb from "../Players/PlayerWeb";
export default function VideoCard(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [progressIndicator, setProgressIndicator] = useState(0);
  const { width, height } = useWindowDimensions()

  useEffect(() => { 
    
  }, [progressIndicator]);
  
  const updateProgress = (value) => {
     setProgressIndicator(
      (prev) =>
        (prev = value)
    );
    setIsOpen(false);
  }

  return (
    <TouchableOpacity onPress={() => setIsOpen(true)} style={width >  height ? {...styles.card , width:"45%"} : {...styles.card}}>
      <Image
        style={styles.image}
        source={{
          uri: `${process.env._URL}${props.item.image.data.attributes.url}`,
        }}
      />
      <View style={{ ...styles.infoCont }}>
        <View>
          <Text style={width >  height ? {...styles.title, fontSize:20} : {...styles.title}}>{props.item.title}</Text>

          <Text style={width >  height ?{ ...GlobalStyles.text, fontSize: 16 } :{ ...GlobalStyles.text, fontSize: RFPercentage(2.1) }  }>
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
      {
        isWeb ? <PlayerWeb
        isOpen={isOpen}
        video={props.item.media.data.attributes.url}
        updateProgress={(value) =>updateProgress(value)}
        /> : <PlayerVideo
        isOpen={isOpen}
        video={props.item.media.data.attributes.url}
        updateProgress={(value) =>updateProgress(value)}
      />
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 95,
    backgroundColor: "#fff",
    padding: 10,
    borderColor: "#E6E6E6",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 15,
    flexDirection: "row",
  },

  image: {
    height: 75,
    width:75,
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
