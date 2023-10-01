import React, { FC, memo } from 'react';
import { BrowserRouter, Routes as RoutesRRD, Route, Navigate } from 'react-router-dom';
import { getKey } from '../../../i18n';
import WeatherDashboard from '../../weather/WeatherDashboard/WeatherDashboard';
import WeatherDetails from '../../weather/WeatherDetails/WeatherDetails';
import RouteError from './RouteError/RouteError';
import Error from '../../common/Error/Error';

export const Routes = () => (
    <RoutesRRD>
        <Route path='/weather-details/:id' element={<WeatherDetails />} errorElement={<RouteError />} />
        <Route path='/404' element={<Error error={getKey('error.NotFoundError')} />} errorElement={<RouteError />} />
        <Route path='/' element={<WeatherDashboard />} errorElement={<RouteError />} />
        <Route path='*' element={<Navigate replace to="/404" />} />
    </RoutesRRD>
);

const Router: FC = () => (
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
);

export default memo(Router);

