import React, { FC, memo } from 'react';
import WeatherForecast from '../WeatherForecast/WeatherForecast';
import styles from './WeatherDashboard.module.css';

const WeatherDashboard: FC = () => {

    return (
        <div className={styles['weather-dashboard']}>
            <WeatherForecast />
        </div>
    );
};

export default memo(WeatherDashboard);
