// src/App.jsx
import { useState } from "react";
import Passcode from "./components/Passcode";
import MainUI from "./components/MainUI";
import "./App.css";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const handlePasscodeCorrect = () => {
    setAuthenticated(true);
  };

  return (
    <div className="app-container">
      {!authenticated ? (
        <Passcode onPasscodeCorrect={handlePasscodeCorrect} />
      ) : (
        <MainUI />
      )}
    </div>
  );
};

export default App;
