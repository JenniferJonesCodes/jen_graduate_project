import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import LoginForm from "./../Components/LoginForm";

const Login = ({ onSubmit }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Login</Text>
    <LoginForm onSubmit={onSubmit} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffc3b5"
  },
  title: {
    fontSize: 40,
    fontFamily: "sans-serif-medium",
    color: "#302a29",
    paddingBottom: 20
  }
});

export default Login;
