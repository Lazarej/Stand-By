import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import { _URL } from "../../../globalVar/url";
import GlobalStyles from "../../../style/GlobalStyles";
import Wrapper from "../../../components/Global/Wrapper";
import { RFPercentage } from "react-native-responsive-fontsize";
import Signataire from "../../../components/details/Signataire";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../../store/User";
import { Entypo } from "@expo/vector-icons";
import VideoCard from "../../../components/Global/Card/VideoCard";
import AddButton from "../../../components/Global/Button/AddButton";

export default function DetailModule({ navigation }) {
  const route = useRoute();
  const { user } = useContext(UserContext);
  const [video, setVideo] = useState([]);
  const [moduleTime, setModuleTime] = useState(``);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getModule();
  }, []);

  const getModule = async () => {
    try {
      const response = await axios.get(
        `${_URL}/api/modules/${route.params.id}?populate[video][populate]=*`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.data.data;
      setVideo((prev) => (prev = data.attributes.video));
      convertMinutesToHours(data.attributes.video);
    } catch (error) {
      console.error(error);
    }
  };

  const convertMinutesToHours = (video) => {
    const array = video.map((item) => {
      return parseInt(item.time);
    });
    const totalMinutes = array.reduce((prev, next) => {
      return prev + next;
    });
    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    setModuleTime((prev) => (prev = `${hours}h ${remainingMinutes}`));
    setLoading(false);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.iconCont}>
        <TouchableOpacity
          style={{ ...styles.iconButton, left: 20, top: 50 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color={GlobalStyles.primary.color}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.iconButton, right: 20, top: 190 }}>
          <AddButton id={route.params.item.id} item={route.params.item} />
        </TouchableOpacity>
      </View>
      <SharedElement id={route.params.item.attributes.image}>
        <Image
          style={styles.image}
          source={{
            uri: `${_URL}${route.params.item.attributes.image.data.attributes.url}`,
          }}
        ></Image>
      </SharedElement>
      <Wrapper>
        <View style={styles.bodyHeader}>
          <View style={styles.textCont}>
            <Text style={styles.title}>{route.params.item.attributes.title}</Text>
            <Text style={{ ...GlobalStyles.text, fontSize: RFPercentage(2.5) }}>
              {route.params.item.attributes.description}
            </Text>
          </View>
          <Signataire
            id={route.params.item.attributes.signataire.data.id}
            image={route.params.item.attributes.image}
            format="mini"
          />
        </View>
        <View style={styles.rowInfo}>
          <Text style={styles.videoLength}>{video.length} vidéos</Text>

          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Entypo
              style={{ marginRight: 5 }}
              name="time-slot"
              size={18}
              color="#AAAAAA"
            />
            <Text style={{ fontSize: RFPercentage(2.2), ...GlobalStyles.text }}>
              {moduleTime}
            </Text>
          </View>
        </View>
        <View>
          {video.map((item, index) => (
            <VideoCard key={index} item={item} />
          ))}
        </View>
      </Wrapper>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  iconCont: {
    width: "100%",
    zIndex: 10,
    position: "relative",
  },

  image: {
    height: 250,
    width: "100%",
    marginRight: 10,
    resizeMode: "cover",
  },

  iconButton: {
    height: 40,
    width: 40,
    backgroundColor: "#fff",
    position: "absolute",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  bodyHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
    paddingBottom: 25,
  },

  textCont: {
    paddingVertical: 25,
  },

  title: {
    fontFamily: "RobotoB",
    fontSize: RFPercentage(3.5),
    marginBottom: 15,
  },

  rowInfo: {
    flexDirection: "row",
    marginVertical: 30,
    justifyContent: "space-between",
  },

  videoLength: {
    fontFamily: "RobotoB",
    fontSize: RFPercentage(3),
  },
});
