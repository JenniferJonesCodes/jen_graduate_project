import React from "react";
import restClient from "../rest_client";

const defaultValue = {
  encounterType: "Patient Document",
  activeEncounter: null,
  create: () => null
};

export const EncounterContext = React.createContext(defaultValue);

export function EncounterProvider({ children }) {
  const [activeEncounter, setEncounter] = React.useState(null);
  async function create(uuid, data) {
    const result = await restClient.encounter.create(uuid, data);
    console.log("TCL: create -> result", result);
    console.log("running create encounter");
    if (result) {
      setEncounter(result);
    }
  }

  return (
    <EncounterContext.Provider value={{ create, activeEncounter }}>
      {children}
    </EncounterContext.Provider>
  );
}

export const useEncounter = () => React.useContext(EncounterContext);
