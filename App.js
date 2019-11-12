import React, { Component, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Router from "./router";
import Login from "./Screens/Login";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

// const testInitialState = {
//   isLoggedIn: true
// };

function App() {
  const [isLoggedIn, setUser] = useState(false);
  //setUser(true);
  if (isLoggedIn == true) {
    console.log("is loggedin", isLoggedIn);
    return <Router />;
  } else {
    console.log("notloggedin", isLoggedIn);
    return <Login />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default App;
