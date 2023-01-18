import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import GlobalStyles from "../../style/GlobalStyles";
import Checkbox from "expo-checkbox";
import GlobalButton from "../Global/Button/Button";
import { AntDesign } from "@expo/vector-icons";
import { isWeb } from "../../globalVar/os";

export default function Qsm(props) {
  const [qsm, setQsm] = useState([]);
  const [loading, setloading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { width, height } = useWindowDimensions()

  useEffect(() => {
    ReorganizeData();
  }, [loading]);

  const ReorganizeData = () => {
    setQsm(
      (prev) =>
        (prev = props.questions.map((question) => {
          return {
            id: question.id,
            aswer: question.bonneReponse,
            question: question.question,
            responses: [
              {
                key: "reponse1",
                response: question.reponse1,
                isChecked: false,
                id: 0,
              },
              {
                key: "reponse2",
                response: question.reponse2,
                isChecked: false,
                id: 1,
              },
              {
                key: "reponse3",
                response: question.reponse3,
                isChecked: false,
                id: 2,
              },
              {
                key: "reponse4",
                response: question.reponse4,
                isChecked: false,
                id: 3,
              },
            ],
          };
        }))
    );
    setloading(false);
  };

  const Check = (qId, rId) => {
    const qsmChange = qsm.map((question) => {
      if (question.id === qId) {
        const responseChanged = question.responses.map((response) => {
          if (response.id !== rId && response.isChecked === true) {
            return {
              ...response,
              isChecked: false,
            };
          }
          if (response.id === rId) {
            return {
              ...response,
              isChecked: !response.isChecked,
            };
          } else {
            return response;
          }
        });
        return {
          ...question,
          responses: responseChanged,
        };
      } else {
        return question;
      }
    });
    setQsm((prev) => (prev = qsmChange));
  };

  const getError = (id) => {
    return messages.find((e) => {
      return e.id === id;
    });
  };

  const Submit = () => {
    let responseData = [];
    qsm.map((question) => {
      const equal = question.responses.find((response) => {
        return response.key === question.aswer;
      });

      if (equal.isChecked === true) {
       responseData.push({
          id: question.id,
          message: `Effectivement la réponse "${equal.response}" est bonne !`,
          color:'green'
        });
      } else {
        responseData.push({
          id: question.id,
          message: `Aie, malheureusement c'est la réponse "${equal.response}" qui est correct !`,
          color:'red'
        });
      }
    });

    setMessages( prev => prev = responseData)
  };

  return (
    <View style={styles.container}>     
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsOpen((prev) => !prev)}
      >
        <View style={styles.rowToggle}>
      <Text
        style={{
          ...GlobalStyles.title,
          fontFamily: "RobotoN",
        }}
      >
        Testez vous !
      </Text>
      <AntDesign
          name="right"
          size={24}
          style={
            isOpen
              ? {
                  marginTop: 5,
                  color: GlobalStyles.primary.color,
                  transform: [{ rotate: "90deg" }],
                }
              : { marginTop: 5, color: "black" }
          }
        />
      </View>
      </TouchableOpacity>
      <View style={isOpen ? { marginBottom: 20, height:'100%', overflow:'hidden' } : { marginBottom: 20, height:0,overflow:'hidden' }}>
        {qsm.map((question) => (
          <View style={styles.QsmCont} key={question.id}>
            <Text style={ isWeb ? {...styles.QsmQuestion, fontSize:RFPercentage(2.5)} : {...styles.QsmQuestion}}>{question.question}</Text>
            <View>
              {question.responses.map((response) => (
                <View key={response.id} style={styles.checkRow}>
                  <Checkbox
                    style={styles.checkbox}
                    value={response.isChecked}
                    onValueChange={() => Check(question.id, response.id)}
                    color={
                      response.isChecked
                        ? GlobalStyles.primary.color
                        : undefined
                    }
                  />
                  <Text style={ isWeb ? {...styles.QsmResponse, fontSize:RFPercentage(1.8)} : {...styles.QsmResponse}}>{response.response}</Text>
                </View>
              ))}
            </View>
            { getError(question.id) ? (
            <Text style={{ fontSize: 12, color: getError(question.id).color }}>
              {getError(question.id).message}
            </Text>
          ) : null}
          </View>
        ))}
        <GlobalButton title={"Voir le resultat"} onPress={() => Submit()} />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    borderTopWidth: 1,
    borderTopColor: "#E6E6E6",
    marginBottom: 60,
  },

  rowToggle:{
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
    paddingBottom: 20,
    marginBottom: 5,
    justifyContent:'space-between',
    flexDirection:'row'
  },

  QsmCont: {
    marginVertical: 20,
  },

  QsmQuestion: {
    fontFamily: "RobotoL",
    fontSize: RFPercentage(3.2),
    marginBottom: 10,
  },

  QsmResponse: {
    fontFamily: "RobotoL",
    fontSize: RFPercentage(2.5),
    marginVertical: 5,
   marginRight:40
  },

  checkbox: {
    borderColor: "#686868",
    marginRight: 10,
  },

  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
});
