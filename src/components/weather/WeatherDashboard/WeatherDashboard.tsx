import React, { FC, memo, useContext } from 'react';
import { WeatherMetricsContextType } from '../WeatherMetricsProvider/WeatherMetricsProvider.types';
import { WeatherMetricsContext } from '../../../constants/forecast';
import { getKey } from '../../../i18n';
import WeatherForecast from '../WeatherForecast/WeatherForecast';
import styles from './WeatherDashboard.module.css';

const WeatherDashboard: FC = () => {
    const { value: metric, update } = useContext(WeatherMetricsContext) as WeatherMetricsContextType;

    return (
        <div className={styles['weather-dashboard']}>
            <div className={`${styles['metric-switch']} ${styles[metric]}`}>
                <button className={styles['celsius']} onClick={() => update('metric')}>
                    {getKey('sign.celsius')}
                </button>
                <div className={styles['separator']} />
                <button className={styles['farenheit']} onClick={() => update('imperial')}>
                    {getKey('sign.farenheit')}
                </button>
            </div>
            <WeatherForecast />
        </div>
    );
};

export default memo(WeatherDashboard);
