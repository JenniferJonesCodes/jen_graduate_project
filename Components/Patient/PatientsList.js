import React from "react";
import { Text } from "react-native";
import { ListItem } from "react-native-elements";
import { usePatients } from "../../Entities/Patients";

export default function PatientList() {
  const { get, patients } = usePatients();

  if (Array.isArray(patients) && patients.length > 0) {
    return (
      <>
        {patients.map(patient => (
          <ListItem
            title={patient.display}
            key={patient.uuid}
            onPress={() => get(patient.uuid)}
          />
        ))}
      </>
    );
  } else if (Array.isArray(patients)) {
    return <Text>No patients found</Text>;
  } else {
    return null;
  }
}
