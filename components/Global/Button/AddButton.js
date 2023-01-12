import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import GlobalStyles from "../../../style/GlobalStyles";
import { UserContext } from "../../../store/User";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

export default function AddButton(props) {
  const { user, saveUser } = useContext(UserContext);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    Added();
  }, [isAdded]);

  const Added = () => {
    const isAdded = user.moduleList.some((mod) => {
      return mod.id === props.id;
    });
    setIsAdded((prev) => (prev = isAdded));
  };

  const Add = () => {
    const newModuleArray = [...user.moduleList, props.item];
    saveUser({
      ...user,
      moduleList: newModuleArray,
    });
    setIsAdded(true);
  };

  const Remove = () => {
    const removeModule = user.moduleList.filter((mod) => {
      return mod.id !== props.id;
    });
    saveUser({
      ...user,
      moduleList: removeModule,
    });
    setIsAdded(false);
  };

  return (
    <TouchableOpacity onPress={isAdded ? Remove : Add} style={styles.addCont}>
      {isAdded ? (
        <MaterialIcons
          name="remove"
          size={28}
          color={GlobalStyles.primary.color}
        />
      ) : (
        <MaterialIcons
          name="add"
          size={28}
          color={GlobalStyles.primary.color}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addCont: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E6E6E6",
    borderWidth: 1,
    borderRadius: 50,
    height: 40,
    width: 40,
  },
});
