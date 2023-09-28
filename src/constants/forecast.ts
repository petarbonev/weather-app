import { createContext } from 'react';
import { ForecastState } from '../hooks/useForecast/useForecast.types';

export const initialState: ForecastState = { ids: [], byId: {} };

export const ForecastContext = createContext({ ...initialState, dataState: 'idle' });

export const FORECAST_DATE_FORMAT = 'YYYY-MM-DD';
