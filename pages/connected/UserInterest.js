import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TitleCont from "../../components/Global/TitleCont";
import Wrapper from "../../components/Global/Wrapper";
import { useContext } from "react";
import { UserContext } from "../../store/User";
import GlobalButton from "../../components/Global/Button/Button";
import GlobalStyles from "../../style/GlobalStyles";
import { _URL } from "../../globalVar/url";
import {  Snackbar } from 'react-native-paper';

export default function InterestScreen() {
  const { user, saveUser } = useContext(UserContext);
  const [interestState, setinterestState] = useState([]);
  const [snackBar, setSnackBar] = useState({
    visible:false,
    message:''
  })

  useEffect(() => {
    getData();
    console.log('interestState',interestState)
  }, []);

  const userAlreadyHaveData = (data) => {
    console.log(user.interests)

    if (user.interests.length !== 0) {
      console.log('!== 0')
      const userInterests = data.map((interest) => {
        const userInterest = user.interests.find(
          (obj) => obj.id === interest.id
        );
        if (userInterest !== undefined) {
          console.log('pipi')
          return {
            ...userInterest,
            selected: true,
          };
        } else {
          console.log('fezf')
          return interest;
        }
      });
      setinterestState((prev) => (prev = userInterests));
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(`${_URL}/api/interets`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const addSelected = response.data.data.map((e) => {
        return { ...e.attributes, id: e.id, selected: false };
      });

      if(user.interests === undefined){
        setinterestState((prev) => (prev = addSelected ));
      }else{
        userAlreadyHaveData(addSelected);
      }
    } catch (error) {}
  };

  const toggle = (value) => {
    const select = interestState.map((e) => {
      if (e.id === value) {
        if (e.selected === false) {
          return { ...e, selected: true };
        } else {
          return { ...e, selected: false };
        }
      } else {
        return { ...e };
      }
    });
    setinterestState((prev) => (prev = select));
  };

  const updateInterest = () => {
    const interests = interestState.filter((interest) => {
      return interest.selected === true;
    });
    if(interests.length === 0){
      setSnackBar(prev => prev = {
        visible:true,
        message:'Vous devez choisir au moins un intéret'
      }) 
    }else{
      saveUser({
        ...user,
        interests: interests,
      });
      setSnackBar(prev => prev = {
        visible:true,
        message:'Vos intérets ont etait mis a jour'
      })
    }
    
  };

  return (
    <>
    <Wrapper>
      <TitleCont
        title={"Vos centres d'intéret"}
        text={
          "Selectionner vos centres d’interet pour obtenir du contenu personnalisé."
        }
      ></TitleCont>
      <View style={styles.toggleCont}>
        <View style={styles.interestCont}>
        {interestState.map((interest) => (
          <TouchableOpacity
            key={interest.id}
            style={
              interest.selected === true ? styles.toggleSelected : styles.toggle
            }
            onPress={() => toggle(interest.id)}
          >
            <Text
              style={
                interest.selected === true
                  ? { fontSize: 14, fontFamily: "RobotoN", color: "white" }
                  : { fontSize: 14, fontFamily: "RobotoN", color: "black" }
              }
            >
              {interest.type}
            </Text>
          </TouchableOpacity>
        ))}
        </View>
        <GlobalButton  title={"Continuer"} onPress={updateInterest}></GlobalButton>      
      </View>
      
      
    </Wrapper>
    <Snackbar
    visible={snackBar.visible}
    onDismiss={() => setSnackBar(prev => prev = {
      ...snackBar,
      visible:false
    })}
    duration={2000} 
   >
    {snackBar.message}
  </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  toggleCont: {
   
    flex:1,
    justifyContent:'space-between',
    marginBottom:70
    
  },

  interestCont:{
    paddingVertical: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  toggle: {
    width: "49%",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginVertical: 5,
    borderColor: "#E6E6E6",
    borderWidth: 1,
    alignItems: "center",
  },
  toggleSelected: {
    width: "49%",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginVertical: 5,
    borderColor: "#fff",
    borderWidth: 1,
    backgroundColor: GlobalStyles.primary.backgroundColor,
    alignItems: "center",
  },
});
