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
      
    }
  }


  const saveUser = async (value) => {
    setUser((prev) => (prev = value));
    try {
      await AsyncStorage.setItem("appliUser", JSON.stringify(value));
    } catch (error) {
      console.error(error)
    }
    
  };

  const signup = async (value) => {
    try {
      const response = await axios.post(
        `${process.env._URL}/api/auth/local/register?populate=*`,
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
    
    try {
      const response = await axios.post(
        `${process.env._URL}/api/auth/local?populate=*`,
        {
          identifier: value.email,
          password: value.password,
        }
      );
      const userPop = await axios.get(`${process.env._URL}/api/users/me?populate=*` ,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${response.data.jwt}`,
        },
      })
      
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
    try {
      await AsyncStorage.removeItem('appliUser')
      await axios.put(
        `${process.env._URL}/api/users/${user.id}`,
        {
          interests: user.interests,
          favorites : user.favorites,
          userLikesCategories: user.userLikesCategories,
          moduleList: user.moduleList
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