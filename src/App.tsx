import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  emitterKey as isAuthenticatedKey,
  LoginService,
} from "./services/login/login.service";
import Login from "./components/pages/login.page";
import PrivateZone from "./components/pages/private.page";

export const SessionContext = createContext<boolean>(false);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    LoginService.instance.isAuthenticated,
  );

  const handleLoginState = () => {
    setIsAuthenticated(LoginService.instance.isAuthenticated);
  };

  useEffect(() => {
    LoginService.instance.on(isAuthenticatedKey, handleLoginState);
    return () => {
      LoginService.instance.off(isAuthenticatedKey, handleLoginState);
    };
  }, [isAuthenticated]);

  return (
    <React.StrictMode>
      <SessionContext.Provider value={isAuthenticated}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/private-zone" element={<PrivateZone />} />
          </Routes>
        </BrowserRouter>
      </SessionContext.Provider>
    </React.StrictMode>
  );
}

export default App;
