import { createContext, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _URL } from "../globalVar/url";

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


  const saveUser = async (value) => {
    setUser((prev) => (prev = value));
    try {
      await AsyncStorage.setItem("appliUser", JSON.stringify(value));
    } catch (error) {
      console.error(error)
    }
    console.log(user)
  };

  const signup = async (value) => {
    try {
      const response = await axios.post(
        `${_URL}/api/auth/local/register?populate=*`,
        {
          username: value.email,
          email: value.email,
          password: value.password,
          phone: value.phone
        },
        
      );
      await saveUser({
        ...response.data.user,
        token: response.data.jwt,
        login: true,
        userLikesCategories:[],
        favorites: [], 
        moduleList:[]
      });
    } catch (e) {
      console.error(e);
    }
    
  };

  const login = async (value) => {
    console.log(value)
    try {
      const response = await axios.post(
        `${_URL}/api/auth/local?populate=*`,
        {
          identifier: value.email,
          password: value.password,
        }
      );
      const userPop = await axios.get(`${_URL}/api/users/me?populate=*` ,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${response.data.jwt}`,
        },
      })
      console.log('login data',userPop)
      saveUser({
        token: response.data.jwt,
        login: true,
        ...userPop.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    console.log(user.token)
    try {
      await AsyncStorage.removeItem('appliUser')
      await axios.put(
        `${_URL}/api/users/${user.id}`,
        {
          interests: user.interests,
          favorites : user.favorites,
          userLikesCategories: user.userLikesCategories
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setUser(prev => prev = {
        userLikesCategories:[],
        favorites:[], 
      })
    } catch (error) {
      console.error(error)
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