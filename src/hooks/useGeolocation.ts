import { useCallback, useEffect, useState } from 'react';
import {
    BROWSER_NOT_SUPPORTED,
    GENERAL_ERROR,
    GEOLOCATION_PERMISSION_DENIED,
    GEOLOCATION_POSITION_UNAVAILABLE
} from '../constants/errors';

const initialState: GeolocationPosition = {
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

const useGeolocation = () => {
    const [geolocation, setGeolocation] = useState(initialState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    const onSuccessCallback = useCallback<PositionCallback>(position => {
        setGeolocation(position);
        setLoading(false);
    }, []);

    const onErrorCallback = useCallback<PositionErrorCallback>(error => {
        switch (error.code) {
            case 1:
                setError(GEOLOCATION_PERMISSION_DENIED);

                break;
            case 2:
                setError(GEOLOCATION_POSITION_UNAVAILABLE);

                break;
            default:
                setError(GENERAL_ERROR);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        const geolocationAPI = navigator.geolocation;

        if (!!geolocationAPI) {
            geolocationAPI.getCurrentPosition(onSuccessCallback, onErrorCallback);
        } else {
            setError(BROWSER_NOT_SUPPORTED);
            setLoading(false);
        }
    }, [onSuccessCallback, onErrorCallback]);

    return { geolocation, loading, error };
};

export default useGeolocation;
