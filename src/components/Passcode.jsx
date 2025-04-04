// src/components/Passcode.jsx
import { useState } from "react";

const Passcode = ({ onPasscodeCorrect }) => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setPasscode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // For simplicity, let's assume the passcode is "1234"
    if (passcode === "1234") {
      onPasscodeCorrect();
    } else {
      setError(true);
    }
  };

  return (
    <div className="passcode-container">
      <h2>Enter Passcode</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={passcode}
          onChange={handleChange}
          placeholder="Enter passcode"
          className="input"
          style={{width: '80%', textAlign: 'center'}}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">Incorrect passcode!</p>}
    </div>
  );
};

export default Passcode;
