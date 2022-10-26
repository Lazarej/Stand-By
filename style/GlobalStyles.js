import { StyleSheet } from 'react-native';
import {RFPercentage} from "react-native-responsive-fontsize";

export default StyleSheet.create({
  primary: {
    color: '#FE724C',
    backgroundColor:'#FE724C',
  },

  title:{  
    fontSize: RFPercentage(3.5),
    fontFamily:'RobotoB',
    textTransform: 'uppercase',
    marginBottom:5
    
  },

  text:{
    fontSize: RFPercentage(2.1),
    fontFamily:'Roboto',
    color:'#AAAAAA'
    
  }
});