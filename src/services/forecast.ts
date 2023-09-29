import { API_BASE_URL } from '../constants/common';
import { Endpoints } from './services.types';

const endpoints: Endpoints = {
    getWeatherForecast: {
        method: 'GET',
        urlFunction: ({ lat, lon, unit, apiKey }) => `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`,
    }
};

export default endpoints;

