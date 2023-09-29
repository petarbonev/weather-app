import { createContext } from 'react';
import { ForecastMetric, ForecastState } from '../hooks/useForecast/useForecast.types';
import storage from '../utils/storage';

export const initialState: ForecastState = { ids: [], byId: {} };

export const ForecastContext = createContext({ ...initialState, dataState: 'idle' });
export const WeatherMetricsContext = createContext({ value: '', update: () => undefined });

export const FORECAST_DATE_FORMAT = 'YYYY-MM-DD';
export const FORECAST_MAX_VISIBLE_ITEMS = 5;
export const FORECAST_METRIC_LS_KEY = 'forecast-metric';
export const INITIAL_FORECAST_METRIC = (storage.getItem(FORECAST_METRIC_LS_KEY) || 'metric') as ForecastMetric;
