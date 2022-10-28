import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import GlobalButton from "./Button";
import GlobalInput from "./Input";

export default function GlobalForm(props) {
  const form = Object.keys(props)
    .filter((key) => key !== "children" && key !=='textButton' && key !=='function')
    .reduce((obj, key) => {
      return Object.assign(obj, {
        [key]: props[key],
      });
    }, {});

  

  const [inputs, setInputs] = useState(form);

   const buttonFunction = (e)=>{
    e.preventDefault();
   const select = Object.values(inputs).map(input => {  
  return {[input.name]: input.value,}
  })
  const newObj = Object.assign({}, ...select );
  console.log('newObject', newObj)
  props.function(newObj)
   }


  return (
    <View style={{ justifyContent: "center", width: "100%" }}>
      <View style={{marginBottom:40}}>
      {Object.values(inputs).map((input) => (
        <GlobalInput
          type={input.type}
          key={input.key}
          placeholder={input.placeholder}
          label={input.label}
          value={input.value}
          onChangeText={(text) =>
            setInputs({
              ...inputs,
              [input.key]: { ...inputs[input.key], value: text },
            })
          }
          secure={input.secure}
        ></GlobalInput>
      ))}
      {props.children}
      </View>
      <GlobalButton title={props.textButton} onPress={buttonFunction}></GlobalButton>
    </View>
  );
}
