import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import FormField from "./../Components/Form/FormField";

export default class Vitals extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Vitals</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffc3b5"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
