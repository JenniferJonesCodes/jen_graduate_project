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
  console.log("TCL: EncounterProvider -> activeEncounter", activeEncounter);

  async function create(uuid, data) {
    console.log("TCL: create -> data", data);
    const result = await restClient.encounter.create(uuid, data);
    if (result) {
      setEncounter(result);
      console.log("TCL: create -> result", result);
    }
  }

  function clearEncounter() {
    setEncounter(null);
  }

  return (
    <EncounterContext.Provider
      value={{
        create,
        activeEncounter,
        encounterType: "Patient Document",
        clearEncounter
      }}
    >
      {children}
    </EncounterContext.Provider>
  );
}

export const useEncounter = () => React.useContext(EncounterContext);
