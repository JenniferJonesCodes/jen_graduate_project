import React, { useState } from "react";
import { SessionProvider, useSession } from "./Entities/Session";
import { PatientsProvider } from "./Entities/Patients";
import { EncounterProvider } from "./Entities/Encounter";
import Router from "./router";
import Login from "./Screens/Login";
import { ConceptsProvider } from "./Entities/Concepts";

//if logged in show router, if not logged in show login page
function AuthGate() {
  const { user } = useSession();

  if (user) {
    return (
      <ConceptsProvider>
        <EncounterProvider>
          <Router />
        </EncounterProvider>
      </ConceptsProvider>
    );
  } else {
    return <Login />;
  }
}

function App() {
  return (
    <SessionProvider>
      <PatientsProvider>
        <AuthGate />
      </PatientsProvider>
    </SessionProvider>
  );
}

export default App;
