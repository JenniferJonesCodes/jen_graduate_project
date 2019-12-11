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
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "700",
    fontSize: 30,
    padding: 10
  },
  label: {
    fontWeight: "500",
    fontSize: 25
  },
  value: {
    fontSize: 25
  },
  dataContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
