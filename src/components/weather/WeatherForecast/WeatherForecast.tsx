import React, { FC, memo, useCallback, useContext, useMemo } from 'react';
import { FORECAST_MAX_VISIBLE_ITEMS, ForecastContext } from '../../../constants/forecast';
import WeatherCard from '../WeatherCard/WeatherCard';
import styles from './WeatherForecast.module.css';

const WeatherForecast: FC = () => {
    const { ids } = useContext(ForecastContext);
    const forecastIds = useMemo(() => ids.slice(0, FORECAST_MAX_VISIBLE_ITEMS), [ids]);

    const renderItem = useCallback((id: string) => (
        <WeatherCard key={id} id={id} />
    ), []);

    return (
        <div className={styles['weather-forecast-container']}>
            {forecastIds.map(renderItem)}
        </div>
    );
};

export default memo(WeatherForecast);
