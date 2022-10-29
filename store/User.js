import { createContext, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext({});

export const UserStore = ({children}) => {
  const [user, setUser] = useState({});

  useEffect(()=>{
      getUser()
      
  },[])

  const getUser = () =>{
    try {
      AsyncStorage.getItem('appliUser')
      .then(value =>{
        if(value != null){
          setUser(JSON.parse(value))
        }
      })
      
    } catch (error) {
      console.log(error)
    }
  }
  console.log('dqdqz',user)

  const saveUser = async (value) => {
    console.log('before set',value, 'USER', user)
    setUser((prev) => (prev = value));
    console.log('after set',user)
    try {
      await AsyncStorage.setItem("appliUser", JSON.stringify(value));
    } catch (error) {
      console.error(error)
    }
  };

  const signup = async (value) => {
    try {
      const response = await axios.post(
        "http://192.168.0.50:1337/api/auth/local/register",
        {
          username: value.email,
          email: value.email,
          password: value.password,
          phone: value.phone
        },
        
      );
      console.log('czd',response.data.user, response.data.jwt) 
      saveUser({
        token: response.data.jwt,
        login: true,
        ...response.data.user,
      });
    } catch (e) {
      console.log(e);
    }
    
  };

  const login = async (value) => {
    console.log(value.email);
    console.log(value.password);
    try {
      const response = await axios.post(
        "http://192.168.0.50:1337/api/auth/local",
        {
          identifier: value.email,
          password: value.password,
        }
      );
      saveUser({
        token: response.data.jwt,
        login: true,
        ...response.data.user,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('appliUser')
      console.log( await AsyncStorage.getItem('appliUser'))
      setUser(prev => prev = {})
    } catch (error) {
      console.log(error)
    }
  };

  const value = {
    user,
    logout,
    signup,
    login,
    setUser,
    saveUser,
  };

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};