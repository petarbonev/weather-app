import { ReactNode } from 'react';
import { ForecastMetric } from '../../../hooks/useForecast/useForecast.types';

export type WeatherMetricsProviderProps = {
    children: ReactNode;
};

export type WeatherMetricsContextType = {
    value: ForecastMetric,
    update: (value: ForecastMetric) => void;
}
