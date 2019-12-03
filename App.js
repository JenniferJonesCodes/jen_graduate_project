import React, { useState } from "react";
import { SessionProvider, useSession } from "./Entities/Session";
import { PatientsProvider } from "./Entities/Patients";
import Router from "./router";
import Login from "./Screens/Login";

function AuthGate() {
  const { user } = useSession();

  if (user) {
    return <Router />;
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
