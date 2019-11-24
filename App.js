import React, { useState } from "react";
import { SessionProvider, useSession } from "./Entities/Session";
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
      <AuthGate />
    </SessionProvider>
  );
}

export default App;
