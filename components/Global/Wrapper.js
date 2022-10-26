
import { View, Text } from 'react-native';
export default function Wrapper (props){
    return(
       <View style={{ flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal:'8%',
        paddingV: props.paddingV}}>
           {props.children}
       </View>
    )
}

