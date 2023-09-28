import { useCallback, useContext, useEffect, useState } from 'react';
import { DataState } from '../../state/types';
import { GeolocationContext } from '../../constants/geolocation';
import { initialState } from '../../constants/forecast';
import { getWeatherForecast } from '../../actions/forecast/forecast';
import { buildForecastState } from '../../utils/forecast';

const useForecast = () => {
    const [forecast, setForecast] = useState(initialState);
    const [dataState, setDataState] = useState<DataState>('idle');
    const geolocation = useContext(GeolocationContext);
    const { coords } = geolocation;
    const { latitude, longitude } = coords;

    const fetchData = useCallback(async () => {
        setDataState('pending');

        try {
            const { list } = await getWeatherForecast({ lat: latitude, lon: longitude });

            setForecast(buildForecastState(list));
            setDataState('fulfilled');
        } catch (error) {
            setDataState('rejected');
        }
    }, [latitude, longitude]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { forecast, dataState };
};

export default useForecast;
