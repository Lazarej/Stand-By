import Wrapper from "../Wrapper";
import { FlatList, useWindowDimensions } from "react-native";
import NoResult from "../NoResult";

export default function RenderScene(props) {
  const { width, height } = useWindowDimensions()
  
  if (props.route.key === props.routes[props.index].key) {
    return (
      <Wrapper>
        {props.isLoading ? (
          props.loader
        ) : props.data.length === 0 ? (
          <NoResult title={props.noResult} />
        ) : (
          <FlatList
                contentContainerStyle={{ paddingVertical: 30, }}
                 style={ width > height  ? { paddingTop: 20,  } : { paddingTop: 20}}
            numColumns={ width > height ? 2 : 1}
            showsVerticalScrollIndicator={false}
                data={props.data}
                 columnWrapperStyle={width > height  ? {flexWrap: 'wrap', justifyContent:'center'} : null} 
            renderItem={props.component}
          />
        )}
      </Wrapper>
    );
  }
}
