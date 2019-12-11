import React from "react";
import { Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

export default function DeviceList({ devices, onSelect }) {
  if (Array.isArray(devices) && devices.length > 0) {
    return (
      <>
        <Text style={styles.title}>Bluetooth Devices</Text>
        <Text style={styles.text}>Select a device to connect to:</Text>
        {devices.map(device => (
          <ListItem
            key={device.id}
            title={device.name}
            subtitle={device.id}
            onPress={() => onSelect(device)}
          />
        ))}
      </>
    );
  } else {
    return <Text>No devices found</Text>;
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontFamily: "sans-serif-medium",
    color: "#302a29",
    paddingBottom: 20
  },
  text: {
    fontSize: 25,
    padding: 5,
    color: "#302a29",
    fontFamily: "sans-serif-medium"
  }
});
