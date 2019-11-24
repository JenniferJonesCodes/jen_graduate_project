import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useSession } from "../Entities/Session";
import LoginForm from "./../Components/LoginForm";

const Login = ({}) => {
  const { login } = useSession();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <LoginForm onSubmit={login} />
    </View>
  );
};

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
