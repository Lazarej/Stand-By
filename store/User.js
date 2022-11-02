import { createContext, useContext, useEffect, useState } from "react";
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
      await saveUser({
        token: response.data.jwt,
        login: true,
        ...response.data.user,
      });
    } catch (e) {
      console.log(e);
    }
    
  };

  const login = async (value) => {
    try {
      const response = await axios.post(
        "http://192.168.0.50:1337/api/auth/local?populate=*",
        {
          identifier: value.email,
          password: value.password,
        }
      );
      console.log('login response',response.data.user)
      const userPop = await axios.get('http://192.168.0.50:1337/api/users/me?populate=*',{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${response.data.jwt}`,
        },
      })
      console.log('userpop',userPop.data)
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
        'http://192.168.0.50:1337/api/users/20',
        {
          interests:[...user.interests] 
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    
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