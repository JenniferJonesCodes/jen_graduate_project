import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import BluetoothClassic from "../Components/Bluetooth/BluetoothClassic";

const Bluetooth = () => (
  <ScrollView>
    <Text style={styles.title}>Bluetooth Devices</Text>
    <BluetoothClassic />
  </ScrollView>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    marginTop: 100
  }
});

export default Bluetooth;
