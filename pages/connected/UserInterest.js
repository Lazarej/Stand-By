import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TitleCont from "../../components/Global/TitleCont";
import Wrapper from "../../components/Global/Wrapper";
import { useContext } from "react";
import { UserContext } from "../../store/User";
import GlobalButton from "../../components/Global/Button/Button";
import GlobalStyles from "../../style/GlobalStyles";

export default function InterestScreen() {
  const { user, saveUser } = useContext(UserContext);
  const [interestState, setinterestState] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.50:1337/api/interets",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const addSelected = response.data.data.map((e) => {
          return { ...e, selected: false };
        });
        setinterestState((prev) => (prev = addSelected));
      } catch (error) {}
    };
    getData();
  }, [user]);

  const toggle = (value) => {
    const select = interestState.map((e) => {
      if (e.id === value) {
        if (e.selected === false) {
          return { ...e, selected: true };
        } else {
          return { ...e, selected: false };
        }
      } else {
        return { ...e };
      }
    });
    setinterestState((prev) => (prev = select));
  };

  const updateInterest = () => {
    const interests = interestState.filter((interest) => {
      return interest.selected === true;
    });
    saveUser({
      ...user,
      interests: interests,
    });
  };

  return (
    <Wrapper>
      <TitleCont
        title={"Vos centres d'intéret"}
        text={
          "Selectionner vos centres d’interet pour obtenir du contenu personnalisé."
        }
      ></TitleCont>
      <View style={styles.toggleCont}>
        {interestState.map((interest) => (
          <TouchableOpacity
            key={interest.id}
            style={
              interest.selected === true ? styles.toggleSelected : styles.toggle
            }
            onPress={() => toggle(interest.id)}
          >
            <Text style={styles.toggleText}>{interest.attributes.type}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <GlobalButton title={"Continuer"} onPress={updateInterest}></GlobalButton>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  toggleCont: {
    paddingVertical: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  toggle: {
    width: "49%",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginVertical: 5,
    borderColor: "#E6E6E6",
    borderWidth: 1,
    alignItems: "center",
  },
  toggleSelected: {
    width: "49%",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginVertical: 5,
    borderColor: "#fff",
    borderWidth: 1,
    backgroundColor: GlobalStyles.primary.backgroundColor,
    alignItems: "center",
  },
  toggleText: {
    fontSize: 14,
    fontFamily: "RobotoN",
  },
});
