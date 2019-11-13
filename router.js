import React, { Component } from "react";
import { Dimensions, Platform } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
// import { Icon } from 'react-native-elements';

//import Login from "./Screens/Login";
import Profile from "./Screens/Profile";
import Search from "./Screens/Search";
import Vitals from "./Screens/Vitals";
import Bluetooth from "./Screens/Bluetooth";

let screen = Dimensions.get("window");

const TabNavigator = createBottomTabNavigator(
  {
    //Login,
    Bluetooth,
    Search
    //Vitals,
    //Profile
  },
  {
    tabBarOptions: {
      activeTintColor: "black",
      inactiveTintColor: "gray"
    }
  }
);

export default createAppContainer(TabNavigator);
