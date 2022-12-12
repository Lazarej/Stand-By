import { useEffect, useReducer, useRef, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { validEmail, validPassword, validPhone } from "../../../globalVar/regex";
import GlobalButton from "../Button/Button";
import GlobalInput from "./Input";

export default function GlobalForm(props) {
  
  const form = Object.keys(props)
    .filter(
      (key) => key !== "children" && key !== "textButton" && key !== "function"
    )
    .reduce((obj, key) => {
      return Object.assign(obj, {
        [key]: props[key],
      });
    }, {});



  const [state, setState] = useState(form)
  const [error, setError] = useState(false)



  const buttonFunction = (e) => {
    const select = Object.values(state).map((input) => {
      return { [input.name]: input.value };
    });
    const newObj = Object.assign({}, ...select);
    e.preventDefault();
    const test = validate(newObj)
    if (test === true) {
      setError(true)   
    } else{
      props.function(newObj)
    }
  };

  const validate =  (newObj) => {
    x = false
    Object.values(state).map((value)=> {
      
      if (value.name === "email") {
        value.inputError = false;
       if (!validEmail.test(value.value)){
        value.inputError = true;
        x = true
        return x
        }
      }
      if (value.name === "password") {
        value.inputError = false;
        if (!validPassword.test(value.value)) {
          value.inputError = true;
          x = true
          return x
        }
      }
      if (value.name === "repeatPassword") {
        value.inputError = false;
        if (newObj.repeatPassword !== newObj.password) {
          value.inputError = true;
          x = true
          return x
        }
      }
      if (value.name === "phone") {
        value.inputError = false;
        if (!validPhone.test(value.value)) {
          value.inputError = true;
          x = true
          return x
        }
      }    
    });
    return x
  };
  

  return (
    <View style={{ justifyContent: "center", width: "100%" }}>
      <View style={{ marginBottom: 20 }}>
        {Object.values(state).map((input) => (
          <GlobalInput
            type={input.type}
            key={input.key}
            placeholder={input.placeholder}
            label={input.label}
            value={input.value}
            inputError={input.inputError}
            errorText={input.errorText}
            onChangeText={(text) =>
            setState({
              
                ...state , [input.key]: { ...state[input.key], value: text }
                 
            })
            }
            secure={input.secure}
          ></GlobalInput>
        ))}
        {props.children}
      </View>
      <GlobalButton
        title={props.textButton}
        onPress={buttonFunction}
      ></GlobalButton>
    </View>
  );
}
