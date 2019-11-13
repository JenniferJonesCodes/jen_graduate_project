import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import SearchForm from "./../Components/SearchForm";

const Search = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Search Patient</Text>
    <SearchForm />
  </View>
);

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
