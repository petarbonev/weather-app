import { ForecastMetric } from '../../hooks/useForecast/useForecast.types';

export type GetForecastAction = {
    lat: number;
    lon: number;
    unit: ForecastMetric
};
