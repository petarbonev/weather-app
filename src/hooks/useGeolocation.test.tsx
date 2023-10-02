import { renderHook } from '@testing-library/react';
import { BROWSER_NOT_SUPPORTED, GENERAL_ERROR, GEOLOCATION_PERMISSION_DENIED, GEOLOCATION_POSITION_UNAVAILABLE } from '../constants/errors';
import { initialState } from '../constants/geolocation';
import useGeolocation from './useGeolocation';

const geolocationMock = {
    getCurrentPosition: jest.fn(),
};

afterAll(() => {
    jest.restoreAllMocks();
});

describe('useGeolocation', () => {
    beforeAll(() => {
        Object.defineProperty(global, 'navigator', {
            value: { geolocation: geolocationMock },
            configurable: true,
        });
    });

    it('should return geolocation data when the user\'s geolocation is available and the permissions are enabled', () => {
        const data = {
            coords: {
                accuracy: 0,
                altitude: null,
                altitudeAccuracy: null,
                heading: null,
                latitude: 12.34,
                longitude: 10.01,
                speed: null,
            },
            timestamp: 123123123,
        };

        geolocationMock.getCurrentPosition.mockImplementationOnce(success => {
            success(data);
        });

        const { result } = renderHook(() => useGeolocation());

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe('');
        expect(result.current.geolocation).toBe(data);
    });

    it('should return error when the geolocation permissions are denied', () => {
        const errorData = {
            code: 1
        };

        geolocationMock.getCurrentPosition.mockImplementationOnce((_, error) => {
            error(errorData);
        });

        const { result } = renderHook(() => useGeolocation());

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(GEOLOCATION_PERMISSION_DENIED);
        expect(result.current.geolocation).toBe(initialState);
    });

    it('should return error when the geolocation position cannot be determined', () => {
        const errorData = {
            code: 2
        };

        geolocationMock.getCurrentPosition.mockImplementationOnce((_, error) => {
            error(errorData);
        });

        const { result } = renderHook(() => useGeolocation());

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(GEOLOCATION_POSITION_UNAVAILABLE);
        expect(result.current.geolocation).toBe(initialState);
    });

    it('should return general error for error code different from 1 and 2', () => {
        const errorData = {
            code: 3
        };

        geolocationMock.getCurrentPosition.mockImplementationOnce((_, error) => {
            error(errorData);
        });

        const { result } = renderHook(() => useGeolocation());

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(GENERAL_ERROR);
        expect(result.current.geolocation).toBe(initialState);
    });

    it('should return error if the browser that is running the application is not supported', () => {
        Object.defineProperty(global.navigator, 'geolocation', {
            value: undefined,
            configurable: true,
        });

        const { result } = renderHook(() => useGeolocation());

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(BROWSER_NOT_SUPPORTED);
        expect(result.current.geolocation).toBe(initialState);
    });
});
