import React, { useEffect, useRef, useState } from 'react';
import { VStack, Text, Input, Box, Button } from '@chakra-ui/react';
import axios from 'axios';

const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY';
const BACKEND_ENDPOINT = 'https://your-backend-api.com/save-destination';

const DestinationScreen = () => {
  const [destination, setDestination] = useState('');
  const [suggested, setSuggested] = useState([]);
  const [selected, setSelected] = useState(localStorage.getItem('selectedDestination') || '');
  const autocompleteService = useRef(null);

  useEffect(() => {
    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
  }, []);

  useEffect(() => {
    if (destination.length > 2 && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions({ input: destination }, (predictions) => {
        setSuggested(predictions || []);
      });
    } else {
      setSuggested([]);
    }
  }, [destination]);

  const handleSelect = async (place) => {
    setSelected(place.description);
    localStorage.setItem('selectedDestination', place.description);
    setSuggested([]);
    setDestination('');

    try {
      await axios.post(BACKEND_ENDPOINT, {
        destination: place.description,
      });
    } catch (err) {
      console.error('Failed to send destination to backend', err);
    }
  };

  const handleReselect = () => {
    setSelected('');
    localStorage.removeItem('selectedDestination');
  };

  return (
    <VStack mt={10} px={4} spacing={4}>
      <Text fontSize="2xl" fontWeight="bold">Select Destination</Text>
      {selected ? (
        <Box textAlign="center">
          <Text>Current Destination:</Text>
          <Text fontWeight="bold" color="purple.500">{selected}</Text>
          <Button mt={4} onClick={handleReselect} colorScheme="purple">Change</Button>
        </Box>
      ) : (
        <Box w="100%" maxW="400px">
          <Input
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <Box mt={2} bg="gray.50" borderRadius="md" boxShadow="md">
            {suggested.map((place) => (
              <Box
                key={place.place_id}
                px={4}
                py={2}
                _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                onClick={() => handleSelect(place)}
              >
                {place.description}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </VStack>
  );
};

export default DestinationScreen;