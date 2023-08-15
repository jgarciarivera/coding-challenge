import "./App.css";
import React, { useState } from "react";
import { Login } from "./components/Login";
import { People } from "./components/People";

export const App = () => {
  const [token, setToken] = useState("");

  const handleLogin = (bearerToken) => {
    setToken(bearerToken);
  };

  return (
    <div className="App">
      {token ? <People token={token} /> : <Login onLogin={handleLogin} />}
    </div>
  );
};

export default App;
