import React from "react";
import restClient from "../rest_client";
export const SessionContext = React.createContext({});

//provider
export function SessionProvider({ children }) {
  const [user, setUser] = React.useState(null);

  async function login({ username, password }) {
    try {
      const result = await restClient.session.create(username, password);
      setTimeout(async () => {
        setUser(result);
      }, 0);
    } catch (error) {
      setUser(null);
      throw error;
    }
  }

  function logout() {
    setUser(null);
  }

  return (
    <SessionContext.Provider value={{ user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

// hook consumer
export const useSession = () => React.useContext(SessionContext);
