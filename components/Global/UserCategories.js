import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import GlobalStyles from "../../style/GlobalStyles";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import GlobalInput from "../Global/Form/Input";
import GlobalButton from "../Global/Button/Button";
import { useContext } from "react";
import { UserContext } from "../../store/User";


export default function UserCategories(props) {
  const { user, saveUser } = useContext(UserContext);
   
  const [index, setIndex] = useState(0);
  const [validation, setValidation] = useState({
    error: false,
    errorMessages: [],
  });
  const [newcategorie, setNewCategorie] = useState({
    value: "",
    color: "",
    newsId: [],
  });


  const catColors = [
    "#6A0136",
    "#0B5351",
    "#7A4B34",
    "#757575",
    "#E1C300",
    "#DD6000",
    "#02499c",
    "#B5050B",
  ];

  useEffect(() => {
    return () => {
      setValidation({
        error: false,
        errorMessages: [],
      });
      setNewCategorie({
        value: "",
        color: "",
        newsId: [],
      });
    };
  }, [index]);

  const getError = (id) => {
    return validation.errorMessages.find((e) => {
      return e.id === id;
    });
  };

  const createCat = async () => {
    let bool = false;
    const isTrue = validate(bool);

    if (isTrue !== true) {
      if (user.userLikesCategories !== undefined) {
        saveUser({
          ...user,
          userLikesCategories: [...user.userLikesCategories, newcategorie],
        });
      } else {
        saveUser({
          ...user,
          userLikesCategories: [newcategorie],
        });
      }
      setIndex(0);
      console.log(index);
    }
  };

  const validate = (bool) => {
    const errorData = [];
    if (
      (newcategorie.value.length < 25 && newcategorie.value.length >= 2) ===
      false
    ) {
      errorData.push({
        id: "name",
        message:
          "Le nom de votre catégorie doit  etre entre 2 et 25 charactère",
      });
    }

    if (
      user.userLikesCategories.some(
        (cat) => cat["value"] === newcategorie.value
      )
    ) {
      errorData.push({
        id: "name",
        message: "Le nom de cette categorie a déja été assigner",
      });
    }

    if (newcategorie.color.length <= 0) {
      errorData.push({
        id: "colors",
        message: "Vous devez selectionner une couleur",
      });
    }
    if (errorData.length !== 0) {
      bool = true;
      setValidation(
        (prev) =>
          (prev = {
            error: true,
            errorMessages: errorData,
          })
      );
      return bool;
    }
    return bool;
  };

  const removeCat = (e) => {
    const newCat = user.userLikesCategories.filter((cat) => {
      return cat.value !== e.value;
    });
    saveUser({
      ...user,
      userLikesCategories: newCat,
    });
  };

  return (
    <>
      {index === 0 ? (
        <View style={styles.contentContainer}>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.modalText}>{props.title}</Text>
            </View>
            <View style={{ marginTop: 20, flexWrap: "wrap" }}>
              {user.userLikesCategories ? (
                user.userLikesCategories.map((cat) => (
                  <TouchableOpacity
                    onPress={() => props.function(cat)}
                    style={styles.rowCat}
                    key={cat.color}
                  >
                    <View
                      style={styles.catCont}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{...styles.catValue ,  backgroundColor: cat.color}}
                        ></View>
                        <Text
                          style={{
                            color: "black",
                            marginLeft: 10,
                          }}
                        >
                          {cat.value}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{ marginRight: 2  }}
                        onPress={() => removeCat(cat)}
                      >
                        <Ionicons name="close-outline" size={24} color="#000" />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text>aucune cat</Text>
              )}
            </View>
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
            label={"Nom de la catégorie"}
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
            {catColors.map((catColor) =>
              user.userLikesCategories.some(
                (cat) => cat["color"] === catColor
              ) ? null : (
                <TouchableOpacity
                  key={catColor}
                  onPress={() =>
                    setNewCategorie(
                      (prev) => (prev = { ...newcategorie, color: catColor })
                    )
                  }
                >
                  <View
                    style={
                      catColor === newcategorie.color || newcategorie.color.length === 0
                        ? {
                            ...styles.colorContainer,
                            backgroundColor: catColor,
                          }
                        : {
                            ...styles.colorContainer,
                            opacity: 0.5,
                            backgroundColor: catColor,
                          }
                    }
                  ></View>
                </TouchableOpacity>
              )
            )}
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
    
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    height: "100%",
    width: "100%",
    paddingTop: 40,
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

  rowCat:{
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  catCont:{
    height: 40,
    flexDirection: "row",
    borderRadius: 25,
    padding: 5,
    width: "100%",
    borderWidth: 1,
    borderColor: "#AAAAAA",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
  },

  catValue:{
    marginHorizontal: 7,
    height: 20,
    width: 20,
    borderRadius: 25,
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
