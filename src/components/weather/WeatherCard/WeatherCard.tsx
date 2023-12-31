import React, { FC, memo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { WeatherCardProps } from './WeatherCard.types';
import { WeatherMetricsContextType } from '../WeatherMetricsProvider/WeatherMetricsProvider.types';
import { DATE_FORMAT, DAY_FORMAT, ForecastContext, WeatherMetricsContext } from '../../../constants/forecast';
import { WEATHER_ICONS_BASE_URL } from '../../../constants/common';
import { getKey } from '../../../i18n';
import { formatTemperature } from '../../../utils/forecast';
import { capitalize } from '../../../utils/common';
import styles from './WeatherCard.module.css';

const WeatherCard: FC<WeatherCardProps> = props => {
    const { id } = props;
    const navigate = useNavigate();
    const { byId } = useContext(ForecastContext);
    const { value: metric } = useContext(WeatherMetricsContext) as WeatherMetricsContextType;
    const data = byId[id];
    const { dt_txt, main, weather } = data[0];
    const { description, icon } = weather[0];
    const date = moment(dt_txt);

    return (
        <div data-testid="weather-card" className={styles['weather-card']} onClick={() => navigate(`weather-details/${id}`)}>
            <div className={styles['heading']}>
                {date.format(DAY_FORMAT)}
            </div>
            <div className={styles['subheading']}>
                {date.format(DATE_FORMAT)}
            </div>
            <img
                className={styles['icon']}
                src={`${WEATHER_ICONS_BASE_URL}/${icon}@4x.png`}
                alt="Weather icon"
            />
            <div className={styles['description']}>{capitalize(description)}</div>
            <div className={styles['values-container']}>
                <div>
                    <div className={styles['label']}>{getKey('label.min-temp')}</div>
                    <div className={styles['value']}>{formatTemperature(main.temp_min, metric)}</div>
                </div>
                <div>
                    <div className={styles['label']}>{getKey('label.max-temp')}</div>
                    <div className={styles['value']}>{formatTemperature(main.temp_max, metric)}</div>
                </div>
            </div>
        </div>
    );
};

export default memo(WeatherCard);
