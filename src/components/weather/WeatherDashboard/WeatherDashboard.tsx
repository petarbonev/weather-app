import React, { FC, memo, useContext } from 'react';
import { cond, stubTrue } from 'lodash';
import { WeatherMetricsContextType } from '../WeatherMetricsProvider/WeatherMetricsProvider.types';
import { DataState } from '../../../state/types';
import { ForecastContext, WeatherMetricsContext } from '../../../constants/forecast';
import { getKey } from '../../../i18n';
import WeatherForecast from '../WeatherForecast/WeatherForecast';
import Loader from '../../common/Loader/Loader';
import styles from './WeatherDashboard.module.css';

const WeatherDashboard: FC = () => {
    const { value: metric, update } = useContext(WeatherMetricsContext) as WeatherMetricsContextType;
    const { dataState, city } = useContext(ForecastContext);

    return (
        cond<DataState, JSX.Element>([
            [dataState => dataState === 'fulfilled', () => (
                <div className={styles['weather-dashboard']}>
                    <div className={styles['city']}>{city}</div>
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
            )],
            [dataState => dataState === 'rejected', () => (
                <div className={styles['error-container']}>
                    <div className={styles['error-title']}>{getKey('label.oops')}</div>
                    <div className={styles['error-subtitle']}>
                        {getKey('label.data-error')}
                    </div>
                </div>
            )],
            [stubTrue, () => <Loader />],
        ])(dataState as DataState)
    );
};

export default memo(WeatherDashboard);
