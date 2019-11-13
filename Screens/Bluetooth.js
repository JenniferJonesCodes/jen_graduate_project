import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import BluetoothClassic from "../Components/Bluetooth/BluetoothClassic";

const Bluetooth = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.title}>Bluetooth Devices</Text>
    <BluetoothClassic />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffc3b5"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    marginTop: 100,
    color: "#302a29",
    fontFamily: "sans-serif-medium"
  }
});

export default Bluetooth;
