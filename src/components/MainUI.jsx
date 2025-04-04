// src/components/MainUI.jsx
import { useState } from "react";
import AddressAutocomplete from "./AddressAutocomplete";

const MainUI = () => {
  const [destination, setDestination] = useState(
    localStorage.getItem("destination") || ""
  );
  const [error, setError] = useState("");

  const handleDestinationChange = async (address) => {
    const success = await sendAddressToAPI(address);
    if (success) {
      setDestination(address);
      localStorage.setItem("destination", address);
      setError(""); // Clear error if successful
    } else {
      setError("Failed to save destination. Please try again.");
    }
  };

  const sendAddressToAPI = async (address) => {
    try {
      const response = await fetch("https://your-api.com/destination", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) throw new Error("Failed to send address");

      return true;
    } catch (err) {
      console.error("API error:", err);
      return false;
    }
  };

  return (
    <div className="main-ui">
      <h1>Welcome to Logicane</h1>
      <h2>Select your destination</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {destination ? (
        <>
          <p>Selected destination: {destination}</p>
          <button
            onClick={() => {
              setDestination("");
              setError(""); // Clear error if user resets
            }}
          >
            Reselect Address
          </button>
        </>
      ) : (
        <AddressAutocomplete onSelect={handleDestinationChange} />
      )}
    </div>
  );
};

export default MainUI;
