import Wrapper from "../Wrapper";
import { FlatList } from "react-native";
import NoResult from "../NoResult";

export default function RenderScene(props) {
  if (props.route.key === props.routes[props.index].key) {
    return (
      <Wrapper>
        {props.isLoading ? (
          props.loader
        ) : props.data.length === 0 ? (
          <NoResult title={props.noResult} />
        ) : (
          <FlatList
            style={{ paddingTop: 20 }}
            showsVerticalScrollIndicator={false}
            data={props.data}
            renderItem={props.component}
          />
        )}
      </Wrapper>
    );
  }
}
