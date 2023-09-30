import { useCallback, useContext, useEffect, useState } from 'react';
import { DataState } from '../../state/types';
import { WeatherMetricsContextType } from '../../components/weather/WeatherMetricsProvider/WeatherMetricsProvider.types';
import { GeolocationContext } from '../../constants/geolocation';
import { WeatherMetricsContext, initialState } from '../../constants/forecast';
import { REMOVE_SYMBOLS_REG_EX } from '../../constants/common';
import { getWeatherForecast } from '../../actions/forecast/forecast';
import { buildForecastState } from '../../utils/forecast';

const useForecast = () => {
    const [forecast, setForecast] = useState(initialState);
    const [dataState, setDataState] = useState<DataState>('idle');
    const geolocation = useContext(GeolocationContext);
    const { value: unit } = useContext(WeatherMetricsContext) as WeatherMetricsContextType;
    const { coords } = geolocation;
    const { latitude, longitude } = coords;

    const fetchData = useCallback(async () => {
        setDataState('pending');

        try {
            const { list, city } = await getWeatherForecast({ lat: latitude, lon: longitude, unit });

            setForecast({ ...buildForecastState(list), city: city.name.replace(REMOVE_SYMBOLS_REG_EX, ' ') });
            setDataState('fulfilled');
        } catch (error) {
            setDataState('rejected');
        }
    }, [latitude, longitude, unit]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { forecast, dataState };
};

export default useForecast;
