import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { ForecastContext, WeatherMetricsContext } from '../../../constants/forecast';
import WeatherDashboard from './WeatherDashboard';

jest.mock('../WeatherForecast/WeatherForecast', () => ({
    __esModule: true,
    default: () => <div />
}));

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
        const city = 'Sofia';

        render(
            <ForecastContext.Provider value={{ ids: [], byId: {}, dataState: 'fulfilled', city }}>
                <WeatherDashboard />
            </ForecastContext.Provider>
        );

        expect(screen.getByText(city)).toBeInTheDocument();
    });

    it('should render buttons to change the metric system', () => {
        const { getByTestId } = render(
            <ForecastContext.Provider value={{ ids: [], byId: {}, dataState: 'fulfilled', city: '' }}>
                <WeatherDashboard />
            </ForecastContext.Provider>
        );

        const celsiusMetricButton = getByTestId('weather-metric-button-celsius');
        const farenheitMetricButton = getByTestId('weather-metric-button-farenheit');

        expect(celsiusMetricButton).toBeInTheDocument();
        expect(farenheitMetricButton).toBeInTheDocument();
    });

    describe('Metric system button', () => {
        it('should be disabled when its value is the selected metric', () => {
            const { getByTestId } = render(
                <WeatherMetricsContext.Provider value={{ value: 'metric', update: jest.fn() }}>
                    <ForecastContext.Provider value={{ ids: [], byId: {}, dataState: 'fulfilled', city: '' }}>
                        <WeatherDashboard />
                    </ForecastContext.Provider>
                </WeatherMetricsContext.Provider>
            );

            const celsiusMetricButton = getByTestId('weather-metric-button-celsius');
            const farenheitMetricButton = getByTestId('weather-metric-button-farenheit');

            expect(celsiusMetricButton).toBeDisabled();
            expect(farenheitMetricButton).toBeEnabled();
        });

        it('should triggers update of the metrics on button click', () => {
            const updateMetric = jest.fn();

            const { getByTestId } = render(
                <WeatherMetricsContext.Provider value={{ value: 'metric', update: updateMetric }}>
                    <ForecastContext.Provider value={{ ids: [], byId: {}, dataState: 'fulfilled', city: '' }}>
                        <WeatherDashboard />
                    </ForecastContext.Provider>
                </WeatherMetricsContext.Provider>
            );

            const celsiusMetricButton = getByTestId('weather-metric-button-celsius');
            const farenheitMetricButton = getByTestId('weather-metric-button-farenheit');

            expect(celsiusMetricButton).toBeDisabled();

            fireEvent.click(farenheitMetricButton);

            expect(updateMetric).toHaveBeenCalledWith('imperial');
        });
    });
});
