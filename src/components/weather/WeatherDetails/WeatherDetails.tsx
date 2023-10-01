import React, { FC, memo, useCallback, useContext } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { ForecastData } from '../../../hooks/useForecast/useForecast.types';
import { DATE_FORMAT, DAY_FORMAT, ForecastContext } from '../../../constants/forecast';
import Loader from '../../common/Loader/Loader';
import WeatherDetailsItem from './WeatherDetailsItem/WeatherDetailsItem';
import styles from './WeatherDetails.module.css';

const ITEMS_PER_GROUP = 2;

const WeatherDetails: FC = () => {
    const { id = '' } = useParams();
    const { byId } = useContext(ForecastContext);
    const data = byId[id];
    const weatherGroupsCount = data ? Math.ceil(data.length / ITEMS_PER_GROUP) : 0;
    const date = moment(id);

    const renderDetails = useCallback((item: ForecastData) => (
        <WeatherDetailsItem key={`${item.dt}`} {...item} />
    ), []);

    const renderWeatherGroup = useCallback((_: unknown, index: number ) => {
        const startIndex = index * ITEMS_PER_GROUP;
        const items = data.slice(startIndex, startIndex + ITEMS_PER_GROUP);

        return (
            <div key={index} className={styles['weather-details-group']}>
                {items.map(renderDetails)}
            </div>
        );
    }, [data, renderDetails]);

    return id && weatherGroupsCount ? (
        <div data-testid="weather-details" className={styles['weather-details-container']}>
            <div className={styles['weather-details-heading']}>
                {date.format(DAY_FORMAT)}
            </div>
            <div className={styles['weather-details-subheading']}>
                {date.format(DATE_FORMAT)}
            </div>
            <div className={styles['weather-details']}>
                {Array.from({ length: weatherGroupsCount }).map(renderWeatherGroup)}
            </div>
        </div>
    ) : <Loader />;
};

export default memo(WeatherDetails);
