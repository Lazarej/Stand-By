import { Text, View } from "react-native";
import {  TabBar } from "react-native-tab-view";

 
 
 export default function  RenderTabBar (props){
    
    return(
        <View style={{ marginLeft: "8%", overflow: "hidden" }}>
        <TabBar
          {...props}
          bounces={true}
          indicatorStyle={{
            backgroundColor:
              props.navigationState.routes[props.navigationState.index].color,
          }}
          scrollEnabled={true}
          tabStyle={{ width: "auto" }}
          style={{
            backgroundColor: "transparent",
            elevation: 0,
            height: 45,
            width: "auto",
          }}
          renderLabel={({ route }) => (
            <View>
              <Text
                style={{
                  fontSize: 14,
                  color:
                    route.key ===
                    props.navigationState.routes[props.navigationState.index].key
                      ? route.color
                      : "#AAAAAA",
                }}
              >
                {route.title}
              </Text>
            </View>
          )}
        />
      </View>
    )
 };