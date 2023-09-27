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

export const GEOLOCATION_API_OPTIONS = {
    maximumAge: 30 * 60 * 1000, // 30 minutes in miliseconds
    timeout: Infinity,
    enableHighAccuracy: false,
};

export const GeolocationContext = createContext(initialState);
