import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import GlobalStyles from "../../../style/GlobalStyles";
import { UserContext } from "../../../store/User";

export default function AddButton(props) {
  const { user, saveUser } = useContext(UserContext);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    Added();
    console.log(user.moduleList);
  },[isAdded]);

    const Added = () => {
      console.log(user)
    if (user.moduleList) {
      const isAdded = user.moduleList.some((mod) => {
        return mod.id === props.id;
      });
      setIsAdded((prev) => (prev = isAdded));
    }
  };

    const Add = () => {
         
        if (isAdded !== true) {
         console.log('press')
      const newModuleArray = [...user.moduleList, props.item];
      saveUser({
        ...user,
        moduleList: newModuleArray,
      });
    } else {
      const removeModule = user.moduleList.filter((mod) => {
        return mod.id !== props.id;
      });
      saveUser({
        ...user,
        moduleList: removeModule,
      });
    }
  };

    return (
      isAdded ? (
    <MaterialIcons
      onPress={() => Add()}
      name="remove"
      size={28}
      color={GlobalStyles.primary.color}
    />
  ) : (
    <MaterialIcons
      onPress={() => Add()}
      name="add"
      size={28}
      color={GlobalStyles.primary.color}
    />
  )
  )
}
