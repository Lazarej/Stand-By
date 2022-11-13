import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import GlobalStyles from "../../style/GlobalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import GlobalInput from "../Global/Form/Input";
import GlobalButton from "../Global/Button/Button";
import { useContext } from "react";
import { UserContext } from "../../store/User";

export default function UserFavCategories() {
  const { user, saveUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [validation, setValidation] = useState({
    error: false,
    errorMessages: [],
  });
  const [newcategorie, setNewCategorie] = useState({
    value: "",
    color: "",
  });

  const catColors = [
    "#ffb3ba",
    "#ffc9de",
    "#ffdfba",
    "#ffffba",
    "#fcf4dd",
    "#baffc9",
    "#bae1ff",
    "#fcc2ff",
  ];

  useEffect(() => {
    console.log("render", validation);
    return () => {
      setValidation({
        error: false,
        errorMessages: [],
      });
    };
  }, [index]);

  const createCat = async () => {
    validate();
    if (validation.error !== true) {
      if(user.userLikesCategories !== undefined){
        saveUser({
            ...user,
            userLikesCategories: [...userLikesCategories, newcategorie],
          });
      }else{
        saveUser({
            ...user,
            userLikesCategories: [newcategorie],
          });
      }
      setIndex(0)
    }
  };

  const getError = (id) => {
    return validation.errorMessages.find((e) => {
      return e.id === id;
    });
  };

  const validate = () => {
    let errorData = [];
    if (
      (newcategorie.value.length < 25 && newcategorie.value.length >= 2) ===
      false
    ) {
      console.log("name");
      errorData.push({
        id: "name",
        message:
          "Le nom de votre catégorie doit  etre entre 2 et 25 charactère",
      });
    }

    if (newcategorie.color.length <= 0) {
      console.log("colors");
      errorData.push({
        id: "colors",
        message: "Vous devez selectionner une couleur",
      });
    }
    if (errorData.length !== 0) {
      setValidation(
        (prev) =>
          (prev = {
            error: true,
            errorMessages: errorData,
          })
      );
    }
  };

  console.log( user.userLikesCategories[0].value);

  return (
    <View style={styles.rowContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsOpen((prev) => !prev)}
      >
        <Text
          style={
            isOpen
              ? { ...styles.text, color: GlobalStyles.primary.color }
              : { ...styles.text }
          }
        >
          Catégories
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
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setIsOpen(!isOpen);
        }}
      >
        <View style={styles.modal}>
          <View style={styles.categoriesContainer}>
            <TouchableOpacity
              style={{ position: "absolute", top: 10, right: 10 }}
              onPress={() => setIsOpen(!isOpen)}
            >
              <Ionicons name="close-outline" size={34} color="black" />
            </TouchableOpacity>
            {index === 0 ? (
              <View style={styles.contentContainer}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.modalText}>Mes catégories</Text>
                </View>
                <View>
                    {
                       user.userLikesCategories ? 
                       user.userLikesCategories.map((cat)=>(
                        <View style={{ backgroundColor: cat.color, height:30, borderRadius:5, padding:5, width:'48%', alignItems:'center'}}>
                            <Text style={{color:'#fff', fontFamily:'RobotoN', textTransform:'uppercase'}}>{cat.value}</Text>
                        </View>
                     ))
                     : <Text>aucune cat</Text>
                    }
                </View>
                <TouchableOpacity
                  style={styles.addRow}
                  onPress={() => setIndex((prev) => prev + 1)}
                >
                  <Text style={styles.addRowText}>Ajouter une categorie</Text>
                  <Ionicons
                    name="add-circle-outline"
                    size={24}
                    color={GlobalStyles.primary.color}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.contentContainer}>
                <GlobalInput
                  id={"name"}
                  type={"text"}
                  placeholder={"nom de la catégorie"}
                  value={newcategorie.value}
                  onChangeText={(text) =>
                    setNewCategorie(
                      (prev) => (prev = { ...newcategorie, value: text })
                    )
                  }
                />
                {validation.error && getError("name") ? (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {getError("name").message}
                  </Text>
                ) : null}

                <View
                  id={"colors"}
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {catColors.map((catColor) => (
                    <TouchableOpacity
                      key={catColor}
                      onPress={() =>
                        setNewCategorie(
                          (prev) =>
                            (prev = { ...newcategorie, color: catColor })
                        )
                      }
                    >
                      <View
                        style={
                          catColor === newcategorie.color
                            ? {
                                ...styles.colorContainer,
                                borderColor: "#BDBDBD",
                                borderWidth: 1,
                                backgroundColor: catColor,
                              }
                            : {
                                ...styles.colorContainer,
                                backgroundColor: catColor,
                              }
                        }
                      ></View>
                    </TouchableOpacity>
                  ))}
                  {validation.error && getError("colors") ? (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {getError("colors").message}
                    </Text>
                  ) : null}
                </View>

                <GlobalButton title={"Ajouter"} onPress={() => createCat()} />

                <TouchableOpacity
                  style={styles.addRow}
                  onPress={() => setIndex((prev) => prev - 1)}
                >
                  <Text style={styles.addRowText}>Retour aux catégories</Text>
                  <Ionicons
                    name="arrow-back-circle-outline"
                    size={24}
                    color={GlobalStyles.primary.color}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
  },

  rowContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 30,
  },

  text: {
    fontFamily: "RobotoN",
    fontSize: RFPercentage(3.3),
    marginRight: 10,
  },

  modal: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  categoriesContainer: {
    height: 400,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 20,
  },

  contentContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
  },

  modalText: {
    fontFamily: "RobotoL",
    fontSize: RFPercentage(3),
  },

  addRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  addRowText: {
    fontFamily: "RobotoL",
    marginRight: 5,
    fontSize: RFPercentage(2.3),
  },

  colorContainer: {
    height: 50,
    width: 50,
    borderRadius: 5,
    margin: 5,
  },
});
