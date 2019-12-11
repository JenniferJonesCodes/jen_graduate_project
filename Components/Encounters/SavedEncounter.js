import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "native-base";
import { useEncounter } from "../../Entities/Encounter";
import { usePatients } from "../../Entities/Patients";

export default function SavedEncounter() {
  const { activeEncounter } = useEncounter();
  console.log("in saved encounter ", activeEncounter.display);
  return (
    <View>
      <Text style={styles.title}>Saved Encounter</Text>
      <Text style={styles.text}>{activeEncounter.display}</Text>
      <Text style={styles.text}>
        Patient: {activeEncounter.patient.display}
      </Text>
      {Array.isArray(activeEncounter.obs) &&
        activeEncounter.obs.map(({ display, uuid }) => (
          <Text key={uuid} style={styles.text}>
            {display}
          </Text>
        ))}
      <ClearPatient />
      <ClearEncounter />
    </View>
  );
}

function ClearPatient() {
  const { clearActive } = usePatients();
  const { clearEncounter } = useEncounter();

  function clearAllData() {
    clearActive();
    clearEncounter();
  }
  return (
    <Button
      light
      rounded
      large
      block
      style={styles.button}
      onPress={clearAllData}
    >
      <Text>New Patient</Text>
    </Button>
  );
}

function ClearEncounter() {
  const { clearEncounter } = useEncounter();
  return (
    <Button
      light
      rounded
      large
      block
      style={styles.button}
      onPress={clearEncounter}
    >
      <Text>New Encounter</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#302a29",
    marginBottom: 20,
    fontWeight: "500"
  },
  text: {
    fontSize: 20,
    padding: 5
  },
  button: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "monospace",
    margin: 10
  }
});
