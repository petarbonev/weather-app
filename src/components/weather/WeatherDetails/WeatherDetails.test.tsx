import React from 'react';
import moment from 'moment';
import { render, screen } from '@testing-library/react';
import { ForecastContext, HOUR_FORMAT } from '../../../constants/forecast';
import { ForecastData } from '../../../hooks/useForecast/useForecast.types';
import { capitalize } from '../../../utils/common';
import WeatherDetails from './WeatherDetails';

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom')),
    useParams: () => ({ id: '2023-10-01' }),
}));

const FORECAST_ID = '2023-10-01';

const FORECAST_ITEMS: ForecastData[] = [
    {
        dt: 1696172400,
        id: FORECAST_ID,
        main: {
            temp: 19.87,
            feels_like: 19.4,
            temp_min: 19.52,
            temp_max: 19.87,
            pressure: 1021,
            sea_level: 1021,
            grnd_level: 952,
            humidity: 57,
            temp_kf: 0.35
        },
        weather: [
            {
                id: 803,
                main: 'Clouds',
                description: 'broken clouds',
                icon: '04d'
            }
        ],
        clouds: {
            all: 82
        },
        wind: {
            speed: 3.73,
            deg: 326,
            gust: 6.41
        },
        visibility: 10000,
        pop: 0.02,
        sys: {
            pod: 'd'
        },
        dt_txt: '2023-10-01 15:00:00'
    }, {
        dt: 1696183200,
        id: FORECAST_ID,
        main: {
            temp: 16.92,
            feels_like: 16.47,
            temp_min: 15.36,
            temp_max: 16.92,
            pressure: 1022,
            sea_level: 1022,
            grnd_level: 953,
            humidity: 69,
            temp_kf: 1.56
        },
        weather: [
            {
                id: 804,
                main: 'Clouds',
                description: 'overcast clouds',
                icon: '04n'
            }
        ],
        clouds: {
            all: 85
        },
        wind: {
            speed: 2.35,
            deg: 305,
            gust: 5.16
        },
        visibility: 10000,
        pop: 0.02,
        sys: {
            pod: 'n'
        },
        dt_txt: '2023-10-01 18:00:00'
    }, {
        dt: 1696194000,
        id: FORECAST_ID,
        main: {
            temp: 13.62,
            feels_like: 13.15,
            temp_min: 13.62,
            temp_max: 13.62,
            pressure: 1023,
            sea_level: 1023,
            grnd_level: 953,
            humidity: 81,
            temp_kf: 0
        },
        weather: [
            {
                id: 804,
                main: 'Clouds',
                description: 'overcast clouds',
                icon: '04n'
            }
        ],
        clouds: {
            all: 93
        },
        wind: {
            speed: 1.73,
            deg: 272,
            gust: 2.8
        },
        visibility: 10000,
        pop: 0,
        sys: {
            pod: 'n'
        },
        dt_txt: '2023-10-01 21:00:00'
    }];

describe('Weather Details component', () => {
    it('should show the date and the day for the selected item', () => {
        render(
            <ForecastContext.Provider value={{ ids: [], byId: { [FORECAST_ID]: FORECAST_ITEMS }, dataState: 'fulfilled', city: '' }}>
                <WeatherDetails />
            </ForecastContext.Provider>
        );

        expect(screen.getByText('Sunday')).toBeInTheDocument();
        expect(screen.getByText('Oct 1st 2023')).toBeInTheDocument();
    });

    it('should show the correct data', () => {
        render(
            <ForecastContext.Provider value={{ ids: [], byId: { [FORECAST_ID]: FORECAST_ITEMS }, dataState: 'fulfilled', city: '' }}>
                <WeatherDetails />
            </ForecastContext.Provider>
        );

        for (const item of FORECAST_ITEMS) {
            const { dt, dt_txt, weather } = item;
            const date = moment(dt_txt).format(HOUR_FORMAT);
            const { description } = weather[0];

            expect(screen.getByTestId(`weather-details-item-time-${dt}`)).toHaveTextContent(date);
            expect(screen.getByTestId(`weather-details-item-description-${dt}`)).toHaveTextContent(capitalize(description));
        }
    });

    it('should renders a loader if there is no data', () => {
        render(
            <ForecastContext.Provider value={{ ids: [], byId: { [FORECAST_ID]: [] }, dataState: 'fulfilled', city: '' }}>
                <WeatherDetails />
            </ForecastContext.Provider>
        );

        const loader = screen.getByTestId('loader');

        expect(loader).toBeInTheDocument();
    });
});
