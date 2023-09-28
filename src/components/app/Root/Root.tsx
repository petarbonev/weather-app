import React, { FC, memo } from 'react';
import Router from '../Router/Router';
import useForecast from '../../../hooks/useForecast/useForecast';
import { ForecastContext } from '../../../constants/forecast';

const Root: FC = () => {
    const { forecast, dataState } = useForecast();

    return (
        <ForecastContext.Provider value={{ ...forecast, dataState }}>
            <Router />
        </ForecastContext.Provider>
    );
};

export default memo(Root);
