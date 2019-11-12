import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import SearchForm from "./../Components/SearchForm";

const Search = () => (
  <View style={styles.conatiner}>
    <Text style={styles.title}>Search Patient</Text>
    <SearchForm />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    textAlign: "center"
    // margin: 10,
  }
});

export default Search;
