import React from "react";
import restClient from "../rest_client";

const defaultValue = {
  visits=[],
  activeVisit: null,
  search: () => null,
  get: () => null,
  post: ()=> null,

}

export const VisitsContext = React.createContext(defaultValue);

export function VisitsProvider({ children }) {
  const [visits, setVisits] = React.useState([]);
  const [activeVisit, setActiveVisit] = React.useState(null);

  async function search(query) {
    // call restClient.patients.search with query as q
    const result = await restClient.visit.search(query);
    if (result) {
      setVisits(result);
    }
  }

  async function get(uuid) {
    // get patient
    const result = await restClient.patient.get(uuid);
    if (result) {
      setActiveVisit(result);
    }
  }

  return (
    <VisitsContext.Provider value={{ visits, activeVisit, search, get }}>
      {children}
    </VisitsContext.Provider>
  );
}

export const useVisits = () => React.useContext(VisitsContext);