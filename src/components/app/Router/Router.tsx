import React, { FC, memo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WeatherDashboard from '../../weather/WeatherDashboard/WeatherDashboard';
import WeatherDetails from '../../weather/WeatherDetails/WeatherDetails';

const router = createBrowserRouter([
    {
        path: '/',
        element: <WeatherDashboard />,
    },
    {
        path: 'weather-details/:id',
        element: <WeatherDetails />,
    },
]);

const Router: FC = () => <RouterProvider router={router} />;

export default memo(Router);

