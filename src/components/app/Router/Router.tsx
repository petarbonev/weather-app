import React, { FC, memo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WeatherDashboard from '../../weather/WeatherDashboard/WeatherDashboard';

const router = createBrowserRouter([
    {
        path: '/',
        element: <WeatherDashboard />,
    },
]);

const Router: FC = () => <RouterProvider router={router} />;

export default memo(Router);

