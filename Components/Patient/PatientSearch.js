import React from "react";
import { View, StyleSheet } from "react-native";
import { usePatients } from "../../Entities/Patients";
import SearchForm from "../SearchForm";

function PatientSearch() {
  const { search } = usePatients();

  async function onSubmit(term) {
    await search(term);
  }

  return (
    <View>
      <SearchForm onSubmit={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "monospace",
    marginTop: 20
  }
});

export default PatientSearch;
