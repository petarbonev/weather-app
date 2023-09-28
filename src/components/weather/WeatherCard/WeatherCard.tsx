import React, { FC, memo, useContext } from 'react';
import moment from 'moment';
import { WeatherCardProps } from './WeatherCard.types';
import { ForecastContext } from '../../../constants/forecast';
import { WEATHER_ICONS_BASE_URL } from '../../../constants/common';
import { getKey } from '../../../i18n';
import styles from './WeatherCard.module.css';

const DAY_FORMAT = 'dddd';
const DATE_FORMAT = 'MMM Do YYYY';

const WeatherCard: FC<WeatherCardProps> = props => {
    const { id } = props;
    const { byId } = useContext(ForecastContext);
    const data = byId[id];
    const { dt_txt, main, weather } = data[0];
    const { description, icon } = weather[0];
    const date = moment(dt_txt);

    return (
        <div className={styles['weather-card']}>
            <div className={styles['heading']}>
                {date.format(DAY_FORMAT)}
            </div>
            <div className={styles['subheading']}>
                {`${date.format(DATE_FORMAT)}, ${description}`}
            </div>
            <img
                className={styles['icon']}
                src={`${WEATHER_ICONS_BASE_URL}/${icon}@4x.png`}
                alt="Weather icon"
            />
            <div className={styles['values-container']}>
                <div>
                    <div className={styles['label']}>{getKey('label.min-temp')}</div>
                    <div className={styles['value']}>{main.temp_min}</div>
                </div>
                <div>
                    <div className={styles['label']}>{getKey('label.max-temp')}</div>
                    <div className={styles['value']}>{main.temp_max}</div>
                </div>
            </div>
        </div>
    );
};

export default memo(WeatherCard);
