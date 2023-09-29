import React, { FC, memo, useContext } from 'react';
import moment from 'moment';
import { WeatherDetailsItemProps } from './WeatherDetailsItem.types';
import { WeatherMetricsContextType } from '../../WeatherMetricsProvider/WeatherMetricsProvider.types';
import { WEATHER_ICONS_BASE_URL } from '../../../../constants/common';
import { WeatherMetricsContext } from '../../../../constants/forecast';
import { formatTemperature } from '../../../../utils/forecast';
import { getKey } from '../../../../i18n';
import { capitalize } from '../../../../utils/common';
import styles from './WeatherDetailsItem.module.css';

const HOUR_FORMAT = 'HH:mm';

const WeatherDetailsItem: FC<WeatherDetailsItemProps> = props => {
    const { dt_txt, weather, main } = props;
    const { temp, feels_like, humidity } = main;
    const { icon, description } = weather[0];
    const { value: metric } = useContext(WeatherMetricsContext) as WeatherMetricsContextType;
    const date = moment(dt_txt);

    return (
        <div className={styles['weather-details-item']}>
            <div className={styles['time']}>
                {`${date.format(HOUR_FORMAT)}`}
            </div>
            <img
                className={styles['icon']}
                src={`${WEATHER_ICONS_BASE_URL}/${icon}@4x.png`}
                alt="Weather icon"
            />
            <div className={styles['description']}>{capitalize(description)}</div>
            <div className={styles['row']}>
                <div className={styles['label']}>{`${getKey('label.temp')}:`}</div>
                <div className={styles['value']}>{formatTemperature(temp, metric)}</div>
            </div>
            <div className={styles['row']}>
                <div className={styles['label']}>{`${getKey('label.feels')}:`}</div>
                <div className={styles['value']}>{formatTemperature(feels_like, metric)}</div>
            </div>
            <div className={styles['row']}>
                <div className={styles['label']}>{`${getKey('label.humidity')}:`}</div>
                <div className={styles['value']}>{`${humidity}%`}</div>
            </div>
        </div>
    );
};

export default memo(WeatherDetailsItem);
