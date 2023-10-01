import React from 'react';
import { render } from '@testing-library/react';
import WeatherForecast from './WeatherForecast';
import { FORECAST_MAX_VISIBLE_ITEMS, ForecastContext } from '../../../constants/forecast';

jest.mock('../WeatherCard/WeatherCard', () => ({
    __esModule: true,
    default: () => <div data-testid="weather-card" />
}));

describe('Weather Forecast component', () => {
    it('should render list with cards for the daily weather', () => {
    const ids = ['id1', 'id2', 'id3'];

        const { getAllByTestId } = render(
            <ForecastContext.Provider value={{ ids, byId: {}, dataState: 'idle', city: '' }}>
                <WeatherForecast />
            </ForecastContext.Provider>
        );

        const forecastCards = getAllByTestId('weather-card');
        expect(forecastCards).toHaveLength(3);
    });

    it('should render list with cards for five days', () => {
        const ids = ['id1', 'id2', 'id3, id4', 'id5', 'id6', 'id7'];

        const { getAllByTestId } = render(
            <ForecastContext.Provider value={{ ids, byId: {}, dataState: 'idle', city: '' }}>
                <WeatherForecast />
            </ForecastContext.Provider>
        );

        const forecastCards = getAllByTestId('weather-card');
        expect(forecastCards).toHaveLength(FORECAST_MAX_VISIBLE_ITEMS);
    });
});
