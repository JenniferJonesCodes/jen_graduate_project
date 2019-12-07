import React from "react";
import { Dimensions } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Search from "./Screens/Search";
import Bluetooth from "./Screens/Bluetooth";
import { usePatients } from "./Entities/Patients";

let screen = Dimensions.get("window");

// const TabNavigator = createBottomTabNavigator(
//   {
//     Bluetooth,
//     Search
//   },
//   {
//     tabBarOptions: {
//       activeTintColor: "black",
//       inactiveTintColor: "gray"
//     }
//   }
// );

// export default createAppContainer(TabNavigator);

function Router() {
  const { activePatient } = usePatients();

  if (activePatient) {
    return <Bluetooth />;
  } else {
    return <Search />;
  }
}

export default Router;
