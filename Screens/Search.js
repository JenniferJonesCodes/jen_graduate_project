import React from "react";
import { StyleSheet, View } from "react-native";
import PatientSearch from "../Components/Patient/PatientSearch";

const Search = ({}) => {
  return (
    <View style={styles.container}>
      <PatientSearch />
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
    fontSize: 20,
    textAlign: "center",
    color: "#302a29",
    marginBottom: 20
  }
});

export default Search;
