import { GetForecastAction } from './forecast.types';
import ForecastEndponts from '../../services/forecast';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const getWeatherForecast = async(payload: GetForecastAction) => {
    const { urlFunction } = ForecastEndponts.getWeatherForecast;
    const response = await fetch(urlFunction?.({ ...payload, apiKey: API_KEY || '' }) as RequestInfo);
    const forecast = await response.json();

    return forecast;
};
