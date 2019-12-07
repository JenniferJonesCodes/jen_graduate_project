import React from "react";
import { ListItem } from "react-native-elements";
import { usePatients } from "../../Entities/Patients";

export default function PatientList({ patients }) {
  const { get } = usePatients();

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
  } else {
    return null;
  }
}
