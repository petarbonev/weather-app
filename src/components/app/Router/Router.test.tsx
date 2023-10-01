import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Routes } from './Router';
import { ForecastContext } from '../../../constants/forecast';
import { ForecastState } from '../../../hooks/useForecast/useForecast.types';
import { DataState } from '../../../state/types';

const WEATHER_DETAILS_ID = '2023-10-01';

const FORECAST_CONTEXT_MOCK: ForecastState & { dataState: DataState } = {
    ids: [WEATHER_DETAILS_ID],
    byId: {
        [WEATHER_DETAILS_ID]: [{
            dt: 1696150800,
            id: WEATHER_DETAILS_ID,
            main: {
                temp: 19.57,
                feels_like: 19.04,
                temp_min: 19.57,
                temp_max: 21.28,
                pressure: 1022,
                sea_level: 1022,
                grnd_level: 953,
                humidity: 56,
                temp_kf: -1.71
            },
            weather: [
                {
                    id: 800,
                    main: 'Clear',
                    description: 'clear sky',
                    icon: '01d'
                }
            ],
            clouds: {
                all: 0
            },
            wind: {
                speed: 2.84,
                deg: 314,
                gust: 3.57
            },
            visibility: 10000,
            pop: 0,
            sys: {
                pod: 'd'
            },
            dt_txt: '2023-10-01 09:00:00'
        }]
    },
    city: 'Sofia',
    dataState: 'fulfilled'
};

describe('Router component', () => {
    it('renders the initial route', async () => {
        const { getByTestId } = render(
            <ForecastContext.Provider value={FORECAST_CONTEXT_MOCK}>
                <MemoryRouter initialEntries={['/']}>
                    <Routes />
                </MemoryRouter>
            </ForecastContext.Provider>
        );
        const weatherDashboard = getByTestId('weather-dashboard');

        await waitFor(() => {
            expect(weatherDashboard).toBeInTheDocument();
        });
    });

    it('renders the weather details route', async () => {
        const { getByTestId } = render(
            <ForecastContext.Provider value={FORECAST_CONTEXT_MOCK}>
                <MemoryRouter initialEntries={[`/weather-details/${WEATHER_DETAILS_ID}`]}>
                    <Routes />
                </MemoryRouter>
            </ForecastContext.Provider>
        );
        const weatherDetails = getByTestId('weather-details');

        await waitFor(() => {
            expect(weatherDetails).toBeInTheDocument();
        });
    });

    it('renders 404 page for non-existing routes', () => {
        const badRoute = '/non-existing-route';

        render(
            <MemoryRouter initialEntries={[badRoute]}>
                <Routes />
            </MemoryRouter>
        );

        expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
    });
});
