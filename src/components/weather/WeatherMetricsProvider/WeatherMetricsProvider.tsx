import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import { WeatherMetricsProviderProps } from './WeatherMetricsProvider.types';
import { ForecastMetric } from '../../../hooks/useForecast/useForecast.types';
import { FORECAST_METRIC_LS_KEY, INITIAL_FORECAST_METRIC, WeatherMetricsContext } from '../../../constants/forecast';
import storage from '../../../utils/storage';

const WeatherMetricsProvider: FC<WeatherMetricsProviderProps> = props => {
    const { children } = props;
    const [metric, setMetric] = useState<ForecastMetric>(INITIAL_FORECAST_METRIC);
    const update = useCallback((value: ForecastMetric) => {
        setMetric(value);

        storage.setItem(FORECAST_METRIC_LS_KEY, `${value}`);
    }, []);
    const value = useMemo(() => ({ value: metric, update }), [metric, update]);

    return (
        <WeatherMetricsContext.Provider value={value as never}>
            {children}
        </WeatherMetricsContext.Provider>
    );
};

export default memo(WeatherMetricsProvider);
