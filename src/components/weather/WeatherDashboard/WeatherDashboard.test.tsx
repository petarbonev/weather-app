import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import WeatherDashboard from './WeatherDashboard';
import { ForecastContext, WeatherMetricsContext } from '../../../constants/forecast';
import { ForecastState } from '../../../hooks/useForecast/useForecast.types';
import { DataState } from '../../../state/types';
import { MemoryRouter } from 'react-router-dom';

const WEATHER_DETAILS_ID = '2023-09-29';

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

describe('Weather Dashboard component', () => {
    it('displays loading indicator while there is no forecast data', async () => {
        const { getByTestId } = render(
            <ForecastContext.Provider value={{ ids: [], byId: {}, city: '', dataState: 'idle' }}>
                <WeatherDashboard />
            </ForecastContext.Provider>
        );
        const loader = getByTestId('loader');

        await waitFor(() => {
            expect(loader).toBeInTheDocument();
        });
    });

    it('displays loading indicator while fetching the forecast data', async () => {
        const { getByTestId } = render(
            <ForecastContext.Provider value={{ ids: [], byId: {}, city: '', dataState: 'pending' }}>
                <WeatherDashboard />
            </ForecastContext.Provider>
        );
        const loader = getByTestId('loader');

        await waitFor(() => {
            expect(loader).toBeInTheDocument();
        });
    });

    it('tells the user that there is an error when the fata fetching is unsuccessful', async () => {
        render(
            <ForecastContext.Provider value={{ ids: [], byId: {}, city: '', dataState: 'rejected' }}>
                <WeatherDashboard />
            </ForecastContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Couldn\'t load data')).toBeInTheDocument();
        });
    });

    it('should render the current location of the user', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <ForecastContext.Provider value={FORECAST_CONTEXT_MOCK}>
                    <WeatherDashboard />
                </ForecastContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText(FORECAST_CONTEXT_MOCK.city)).toBeInTheDocument();
    });

    it('should render buttons to change the metric system', () => {
        const { getByTestId } = render(
            <MemoryRouter initialEntries={['/']}>
                <ForecastContext.Provider value={FORECAST_CONTEXT_MOCK}>
                    <WeatherDashboard />
                </ForecastContext.Provider>
            </MemoryRouter>
        );

        const celsiusMetricButton = getByTestId('weather-metric-button-celsius');
        const farenheitMetricButton = getByTestId('weather-metric-button-farenheit');

        expect(celsiusMetricButton).toBeInTheDocument();
        expect(farenheitMetricButton).toBeInTheDocument();
    });

    describe('Metric system button', () => {
        it('should be disabled when its value is the selected metric', () => {
            const { getByTestId } = render(
                <MemoryRouter initialEntries={['/']}>
                    <WeatherMetricsContext.Provider value={{ value: 'metric', update: jest.fn() }}>
                        <ForecastContext.Provider value={FORECAST_CONTEXT_MOCK}>
                            <WeatherDashboard />
                        </ForecastContext.Provider>
                    </WeatherMetricsContext.Provider>
                </MemoryRouter>
            );

            const celsiusMetricButton = getByTestId('weather-metric-button-celsius');
            const farenheitMetricButton = getByTestId('weather-metric-button-farenheit');

            expect(celsiusMetricButton).toBeDisabled();
            expect(farenheitMetricButton).toBeEnabled();
        });

        it('should triggers update of the metrics on button click', () => {
            const updateMetric = jest.fn();

            const { getByTestId } = render(
                <MemoryRouter initialEntries={['/']}>
                    <WeatherMetricsContext.Provider value={{ value: 'metric', update: updateMetric }}>
                        <ForecastContext.Provider value={FORECAST_CONTEXT_MOCK}>
                            <WeatherDashboard />
                        </ForecastContext.Provider>
                    </WeatherMetricsContext.Provider>
                </MemoryRouter>
            );

            const celsiusMetricButton = getByTestId('weather-metric-button-celsius');
            const farenheitMetricButton = getByTestId('weather-metric-button-farenheit');

            expect(celsiusMetricButton).toBeDisabled();

            fireEvent.click(farenheitMetricButton);

            expect(updateMetric).toHaveBeenCalledWith('imperial');
        });
    });
});
