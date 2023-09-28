import { GetForecastAction } from './forecast.types';
import ForecastEndponts from '../../services/forecast';

export const getWeatherForecast = async(payload: GetForecastAction) => {
    const { urlFunction } = ForecastEndponts.getWeatherForecast;
    const response = await fetch(urlFunction?.(payload) as RequestInfo);
    const forecast = await response.json();

    return forecast;
};
