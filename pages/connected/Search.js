import {Text, View,} from "react-native";
import GlobalButton from "../../components/Global/Button/Button";
import { useContext } from "react";
import { UserContext } from "../../store/User";
import Wrapper from "../../components/Global/Wrapper";

export default function SearchScreen (){

    const {logout} = useContext(UserContext)

    return(
        
            <Wrapper paddingV={100}>
                <GlobalButton onPress={logout} title={"logout"}></GlobalButton>
            </Wrapper>
        
    )
}