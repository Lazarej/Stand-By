import { StyleSheet, TouchableOpacity } from "react-native";
import UserCategories from "../../Global/UserCategories";
import ModalGlobal from "../../Global/Modal";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../store/User";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";

export default function CatButton(props) {
  const { user, saveUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [snackBar, setSnackBar] = useState({
    visible: false,
    message: "",
  });

  const filterCat = (cat) => {
    const filter = cat.filter((id) => {
      return id !== props.id;
    });
    return filter;
  };

  const addToCat = (e) => {
    const newArray = {
      ...user,
      userLikesCategories: user.userLikesCategories.map((obj) => {
        const OnArrayButDiffCat =
          obj.newsId.includes(props.id) && obj.value !== e.value;

        const NotonArray =
          obj.value === e.value && obj.newsId.includes(props.id) === false;

        const OnArrayAndCat =
          obj.value === e.value && obj.newsId.includes(props.id) === true;

        if (OnArrayButDiffCat) {
          setSnackBar(
            (prev) =>
              (prev = {
                visible: true,
                message: `Vous avez ajouté "${props.title}" à la catégorie "${e.value}"`,
              })
          );
          const newNewsId = filterCat(obj.newsId);
          return {
            ...obj,
            newsId: newNewsId,
          };
        }
        if (NotonArray) {
          setSnackBar(
            (prev) =>
              (prev = {
                visible: true,
                message: `Vous avez ajouté "${props.title}" à la catégorie "${e.value}"`,
              })
          );

          return {
            ...obj,
            newsId: [...obj.newsId, props.id],
          };
        }
        if (OnArrayAndCat) {
          setSnackBar(
            (prev) =>
              (prev = {
                visible: true,
                message: `Vous avez enlevé "${props.title}" à la catégorie "${e.value}"`,
              })
          );
          const newNewsId = filterCat(obj.newsId);
          return {
            ...obj,
            newsId: newNewsId,
          };
        } else {
          return {
            ...obj,
          };
        }
      }),
    };
    saveUser(newArray);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.cont}
        onPress={() => setIsOpen((prev) => !prev)}
      >
        <Entypo name="add-to-list" size={18} color="black" />
      </TouchableOpacity>
      <ModalGlobal
        isOpen={isOpen}
        close={() => setIsOpen(!isOpen)}
        snackBar={snackBar}
        onDismiss={() =>
          setSnackBar(
            (prev) =>
              (prev = {
                ...snackBar,
                visible: false,
              })
          )
        }
      >
        <UserCategories
          title={"Ajouter une catégorie a la news"}
          function={addToCat}
        />
      </ModalGlobal>
    </>
  );
}

const styles = StyleSheet.create({
  cont: {
    display: "flex",
    height: "50%",
    width: 40,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
