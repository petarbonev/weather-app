import React from 'react';
import { cond, stubTrue } from 'lodash';
import { GeolocationContext } from './constants/geolocation';
import useGeolocation from './hooks/useGeolocation';
import Loader from './components/common/Loader/Loader';
import GeolocationError from './components/geolocation/GeolocationError/GeolocationError';
import Root from './components/app/Root/Root';
import WeatherMetricsProvider from './components/weather/WeatherMetricsProvider/WeatherMetricsProvider';
import styles from './App.module.css';

const App = () => {
    const { geolocation, loading, error } = useGeolocation();

    return (
        <GeolocationContext.Provider value={geolocation}>
            <WeatherMetricsProvider>
                <div className={styles['app-container']}>
                    <div className={styles['app']}>
                        {cond([
                            [() => loading, () => <Loader />],
                            [() => !!error, () => <GeolocationError error={error} />],
                            [stubTrue, () => <Root />],
                        ])()}
                    </div>
                </div>
            </WeatherMetricsProvider>
        </GeolocationContext.Provider>
    );
};

export default App;
