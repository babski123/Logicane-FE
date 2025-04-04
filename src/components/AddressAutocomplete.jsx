// src/components/AddressAutocomplete.jsx
import { useState, useEffect, useRef } from "react";

const AddressAutocomplete = ({ onSelect, errorClearer }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const autocompleteService = useRef(null);

  useEffect(() => {
    if (!window.google) return;

    if (!autocompleteService.current) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }

    if (query.length > 2) {
      autocompleteService.current.getPlacePredictions(
        { input: query },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setSuggestions(predictions);
          } else {
            setSuggestions([]);
          }
        }
      );
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClick={() => errorClearer("")}
        placeholder="Enter destination"
        className="input"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => {
                onSelect(suggestion.description);
                setQuery(suggestion.description);
                setSuggestions([]);
              }}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
