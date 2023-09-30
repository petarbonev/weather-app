import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import App from './App';
import useGeolocation from './hooks/useGeolocation';

jest.mock('./hooks/useGeolocation');

const useGeolocationMock = useGeolocation as jest.Mock;

describe('App component', () => {
    beforeEach(() => {
        useGeolocationMock.mockReturnValue({
            geolocation: {},
            loading: false,
            error: '',
        });
    });

    it('displays loading indicator while fetching geolocation data', async () => {
        useGeolocationMock.mockReturnValue({
            geolocation: {},
            loading: true,
            error: '',
        });

        const { getByTestId } = render(<App />);
        const loader = getByTestId('loader');

        await waitFor(() => {
            expect(loader).toBeInTheDocument();
        });
    });

    describe('Renders GeolocationError component on error', () => {
        it('shows GeolocationPermissionDenied error', async () => {
            useGeolocationMock.mockReturnValue({
                geolocation: {},
                loading: false,
                error: 'GeolocationPermissionDenied',
            });

            render(<App />);

            await waitFor(() => {
                expect(screen.getByText('Location permissions denied! We need a permission to use your location in order to show you a weather information!')).toBeInTheDocument();
            });
        });
        it('shows GeolocationPositionUnavailable error', async () => {
            useGeolocationMock.mockReturnValue({
                geolocation: {},
                loading: false,
                error: 'GeolocationPositionUnavailable',
            });

            render(<App />);

            await waitFor(() => {
                expect(screen.getByText('Sorry! Currently we are unable to provide a weather information about your location!')).toBeInTheDocument();
            });
        });
        it('shows GeneralError error', async () => {
            useGeolocationMock.mockReturnValue({
                geolocation: {},
                loading: false,
                error: 'GeneralError',
            });

            render(<App />);

            await waitFor(() => {
                expect(screen.getByText('Something went wrong! Please try again later!')).toBeInTheDocument();
            });
        });
        it('shows BrowserNotSupported error', async () => {
            useGeolocationMock.mockReturnValue({
                geolocation: {},
                loading: false,
                error: 'BrowserNotSupported',
            });

            render(<App />);

            await waitFor(() => {
                expect(screen.getByText('It seems you are using an unsupported browser! Please use another one in order to use our services.')).toBeInTheDocument();
            });
        });
    });
    it('renders the Root component when there is no error and not loading', async () => {
        useGeolocationMock.mockReturnValue({
            geolocation: {
                coords: {
                    accuracy: 12.398,
                    altitude: null,
                    altitudeAccuracy: null,
                    heading: null,
                    latitude: 12.652153,
                    longitude: 13.3386276,
                    speed: null
                },
                timestamp: 1696090139888,
            },
            loading: false,
            error: '',
        });

        const { getByTestId } = render(<App />);
        const root = getByTestId('root');

        await waitFor(() => {
            expect(root).toBeInTheDocument();
        });
    });
});
