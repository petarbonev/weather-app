import React, { FC, memo, useCallback, useContext } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { ForecastData } from '../../../hooks/useForecast/useForecast.types';
import { DATE_FORMAT, DAY_FORMAT, ForecastContext } from '../../../constants/forecast';
import Loader from '../../common/Loader/Loader';
import WeatherDetailsItem from './WeatherDetailsItem/WeatherDetailsItem';
import styles from './WeatherDetails.module.css';

const WeatherDetails: FC = () => {
    const { id = '' } = useParams();
    const { byId } = useContext(ForecastContext);
    const data = byId[id];
    const date = moment(id);

    const renderDetails = useCallback((item: ForecastData) => (
        <WeatherDetailsItem key={`${item.dt}`} {...item} />
    ), []);

    return id && data ? (
        <div className={styles['weather-details-container']}>
            <div className={styles['weather-details-heading']}>
                {date.format(DAY_FORMAT)}
            </div>
            <div className={styles['weather-details-subheading']}>
                {date.format(DATE_FORMAT)}
            </div>
            <div className={styles['weather-details']}>
                {data.map(renderDetails)}
            </div>
        </div>
    ) : <Loader />;
};

export default memo(WeatherDetails);
