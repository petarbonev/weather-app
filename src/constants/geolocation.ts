import { createContext } from 'react';

export const initialState: GeolocationPosition = {
    coords: {
        accuracy: 0,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: 0,
        longitude: 0,
        speed: null,
    },
    timestamp: 0,
};

export const GeolocationContext = createContext(initialState);
