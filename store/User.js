import { createContext, useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext({});

export const UserStore = ({children}) => {
  const [user, setUser] = useState( async () => {
    const us = await AsyncStorage.getItem('appliUser')
    console.log('dz',us)
    return !us ? null : await JSON.parse(us);
    
  });

  console.log('',user)

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

  const login = async (email, password) => {
    console.log(email);
    console.log(password);
    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/local",
        {
          identifier: email,
          password: password,
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

  const logout = () => {
    saveUser({});
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