import React from "react";
import { StyleSheet, View, Text } from "react-native";

export function Data({ label, children }) {
  return (
    <View style={styles.dataContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{children}</Text>
    </View>
  );
}

export function DataContainer({ children, title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    borderBottomColor: "gray",
    borderBottomWidth: 1
  },
  title: {
    fontWeight: "700",
    padding: 10
  },
  label: {
    fontWeight: "500"
  },
  value: {},
  dataContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
