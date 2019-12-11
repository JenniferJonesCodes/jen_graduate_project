import React from "react";
import { StyleSheet, View } from "react-native";
import SavedEncounter from "../Components/Encounters/SavedEncounter";

const Encounter = ({}) => {
  return (
    <View style={styles.container}>
      <SavedEncounter />
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

export default Encounter;
