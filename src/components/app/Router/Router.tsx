import React, { FC, memo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WeatherDashboard from '../../weather/WeatherDashboard/WeatherDashboard';
import WeatherDetails from '../../weather/WeatherDetails/WeatherDetails';
import RouteError from './RouteError/RouteError';

const router = createBrowserRouter([
    {
        path: '/',
        element: <WeatherDashboard />,
        errorElement: <RouteError />
    },
    {
        path: 'weather-details/:id',
        element: <WeatherDetails />,
        errorElement: <RouteError />
    },
]);

const Router: FC = () => <RouterProvider router={router} />;

export default memo(Router);

