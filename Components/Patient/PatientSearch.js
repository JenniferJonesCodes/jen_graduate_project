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
      {/* //no selectedPatient, show search form */}
      {/* !activePatient && <SearchForm onSubmit={onSubmit} />} */}
      <SearchForm onSubmit={onSubmit} />
      {/* {activePatient && (
        //current patient name and button to clear current patient to search for new
        <View>
          <Text>Active Patient: {activePatient.display}</Text>
          <>
            <Button
              light
              rounded
              onPress={clearActive}
              style={styles.button}
              // title="Clear Active Patient"
            >
              <Text>Clear Active Patient </Text>
            </Button>
          </>
        </View>
      )} */}
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
