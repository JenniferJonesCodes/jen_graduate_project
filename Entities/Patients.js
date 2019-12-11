import React from "react";
import restClient from "../rest_client";

const defaultValue = {
  patients: null,
  activePatient: null,
  search: () => null,
  get: () => null
};

export const PatientsContext = React.createContext(defaultValue);

export function PatientsProvider({ children }) {
  const [patients, setPatients] = React.useState(null);
  const [activePatient, setActivePatient] = React.useState(null);

  async function search(query) {
    // call restClient.patients.search with query as q
    const result = await restClient.patient.search(query);
    if (result) {
      setPatients(result);
    }
  }

  async function get(uuid) {
    // get patient
    const result = await restClient.patient.get(uuid);
    if (result) {
      setActivePatient(result);
    }
  }

  function clearActive() {
    setActivePatient(null);
  }

  return (
    <PatientsContext.Provider
      value={{ patients, activePatient, search, get, clearActive }}
    >
      {children}
    </PatientsContext.Provider>
  );
}

export const usePatients = () => React.useContext(PatientsContext);
