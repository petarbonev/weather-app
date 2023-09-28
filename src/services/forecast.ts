import { API_BASE_URL, API_KEY } from '../constants/common';
import { Endpoints } from './services.types';

const endpoints: Endpoints = {
    getWeatherForecast: {
        method: 'GET',
        urlFunction: ({ lat, lon }) => `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    }
};

export default endpoints;

