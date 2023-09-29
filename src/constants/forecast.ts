import { createContext } from 'react';
import { ForecastState } from '../hooks/useForecast/useForecast.types';

export const initialState: ForecastState = { ids: [], byId: {} };

export const ForecastContext = createContext({ ...initialState, dataState: 'idle' });
export const WeatherMetricsContext = createContext({ value: '', update: () => undefined });

export const FORECAST_DATE_FORMAT = 'YYYY-MM-DD';
export const FORECAST_MAX_VISIBLE_ITEMS = 5;
