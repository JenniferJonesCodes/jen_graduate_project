import React from "react";
import restClient from "../rest_client";

const defaultValue = {
  getConcepts: () => null
};

export const ConceptsContext = React.createContext(defaultValue);

export function ConceptsProvider({ children }) {
  const [currentConcepts, setConcepts] = React.useState(null);
  async function getConcepts() {
    const result = await restClient.concept.getParamConcepts();
    if (result) {
      setConcepts(result);
      console.log("concepts ", currentConcepts);
    }
  }

  React.useEffect(() => {
    getConcepts();
  }, []);

  return (
    <ConceptsContext.Provider value={{ concepts: currentConcepts }}>
      {children}
    </ConceptsContext.Provider>
  );
}

export const useConcepts = () => React.useContext(ConceptsContext);
