import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { _URL } from "../../globalVar/url";
import { useContext } from "react";
import { UserContext } from "../../store/User";
import { Avatar } from "react-native-paper";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function Signataire(props) {
  const [state, setState] = useState({});
  const { user, saveUser } = useContext(UserContext);

  useEffect(() => {
    getSignataire();
  }, []);

  const getSignataire = async () => {
    try {
      const response = await axios.get(
        `${_URL}/api/signataires/${props.id}?populate=*`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.data.data;
      setState((prev) => (prev = data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {state.attributes && (
              <View style={props.format === 'mini' ? {flexDirection:'row', alignItems:'center'} : { marginBottom: 40 }}>
          <Avatar.Image
            style={props.format === 'mini' ?  {marginRight:7} :{ marginBottom: 20 }}
            size={props.format === 'mini' ? 50 : 80}
            source={{
              uri: `${_URL}${state.attributes.image.data.attributes.formats.small.url}`,
            }}
          ></Avatar.Image>
          <View>
            <Text style={props.format === 'mini' ?  {fontSize: RFPercentage(2.3), textTransform: "uppercase" ,marginBottom: 2}:{ fontSize: RFPercentage(2.5), marginBottom: 5, textTransform: "uppercase"  }}>

                {state.attributes.nom}

            </Text>
            <Text style={{ color: "#AAAAAA", fontWeight: "500" }}>
              {state.attributes.poste}
            </Text>
          </View>
        </View>
      )}
    </>
  );
}
