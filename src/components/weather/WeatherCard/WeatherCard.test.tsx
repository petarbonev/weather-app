import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ForecastContext } from '../../../constants/forecast';
import WeatherCard from './WeatherCard';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom')),
    useNavigate: () => mockedUseNavigate,
}));

describe('Weather Card component', () => {
    it('should navigates to the weather details page on click', () => {
        const id = '2023-10-01';
        const byId = {
            [id]: [{
                dt: 1696150800,
                id,
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
        } as never;

        const { getByTestId } = render(
            <ForecastContext.Provider value={{ ids: [], byId, city: '', dataState: 'filfilled' }}>
                <WeatherCard id={id} />
            </ForecastContext.Provider>
        );

        const weatherCard = getByTestId('weather-card');

        fireEvent.click(weatherCard);

        expect(mockedUseNavigate).toBeCalledWith(`weather-details/${id}`);
        mockedUseNavigate.mockRestore();
    });
});
