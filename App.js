import { Button, StyleSheet, Text, View } from "react-native";

import { useState, useEffect, useCallback } from "react";
import {UserStore} from "./store/User"
import Navigation from "./router/navigation";



export default function App() {
 
  const [test , setTest] = useState(false)
  
  
  

  const changeState = () => {
    setIsSignIn((prev) => !prev);
  };

  return (
      <UserStore>
       <Navigation/>
      </UserStore>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
