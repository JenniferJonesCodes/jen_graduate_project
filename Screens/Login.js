import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import LoginForm from "./../Components/LoginForm";

const Login = () => (
  <View style={styles.conatiner}>
    <Text style={styles.title}>Login</Text>
    <LoginForm />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  title: {
    fontSize: 20
  }
});

export default Login;
