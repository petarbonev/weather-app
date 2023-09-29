import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import { WeatherMetricsProviderProps } from './WeatherMetricsProvider.types';
import { ForecastMetric } from '../../../hooks/useForecast/useForecast.types';
import { WeatherMetricsContext } from '../../../constants/forecast';

const WeatherMetricsProvider: FC<WeatherMetricsProviderProps> = props => {
    const { children } = props;
    const [metric, setMetric] = useState<ForecastMetric>('metric');
    const update = useCallback((value: ForecastMetric) => setMetric(value), []);
    const value = useMemo(() => ({ value: metric, update }), [metric, update]);

    return (
        <WeatherMetricsContext.Provider value={value as never}>
            {children}
        </WeatherMetricsContext.Provider>
    );
};

export default memo(WeatherMetricsProvider);
