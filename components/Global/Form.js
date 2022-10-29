import {  useState } from "react";
import { View, Text, Button } from "react-native";
import { validEmail,validPassword,validPhone } from "../../regex/regex";
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
  const [error, setError] = useState(false);

   const buttonFunction = (e)=>{
    e.preventDefault();
   const select = Object.values(inputs).map(input => {  
  return {[input.name]: input.value,}
  })
  const newObj = Object.assign({}, ...select );
  console.log('newObject', newObj)

  Object.entries(newObj).map((entrie)=>{
    setError( prev => prev = false);
      if(entrie[0] === 'email'){
        console.log('email') 
        if(!validEmail.test(entrie[1])){
          setError( prev => prev = true)
          inputError(entrie[0])
          console.log('error email')
        }        
      }
      if(entrie[0] === 'password'){
        console.log('password') 
        if(!validPassword.test(entrie[1])){
          setError( prev => prev = true) 
          inputError(entrie[0])
          console.log('error password')
        }   
      }
      if(entrie[0] === 'repeatPassword'){
        if(newObj.repeatPassword !== newObj.password){
          setError( prev => prev = true) 
          inputError(entrie[0])
          console.log('error repeatPassword')
        }     
      }
      if(entrie[0] === 'phone'){
        console.log('phone') 
        if(!validPhone.test(entrie[1])){
          setError( prev => prev = true) 
          inputError(entrie[0])
          console.log('error phone')
        }   
      }
  })
  if(error === true){
    console.log('nononono', error)
  }else{
    console.log('youpie' , error)
  }

   }

   const inputError = (value) =>{
    Object.entries(inputs).map((e)=>{
      e[1].inputError = false;
      if(e[1].name  === value){
        console.log('inp', e[1].name)
        e[1].inputError = true
      }
     }) 
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
          inputError={input.inputError}
          errorText={input.errorText}
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
