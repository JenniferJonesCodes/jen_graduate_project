import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import BluetoothClassic from "../Components/Bluetooth/BluetoothClassic";

const Bluetooth = () => (
  <ScrollView style={styles.container}>
    <BluetoothClassic />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffc3b5"
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    marginTop: 30,
    color: "#302a29",
    fontFamily: "sans-serif-medium"
  }
});

export default Bluetooth;
