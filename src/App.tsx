import React from 'react';
import { cond, T } from 'ramda';
import { GeolocationContext } from './constants/geolocation';
import useGeolocation from './hooks/useGeolocation';
import Loader from './components/common/Loader/Loader';
import GeolocationError from './components/geolocation/GeolocationError/GeolocationError';
import styles from './App.module.css';

const App = () => {
    const { geolocation, loading, error } = useGeolocation();

    return (
        <GeolocationContext.Provider value={geolocation}>
            <div className={styles['app-container']}>
                {cond([
                    [() => loading, () => <Loader />],
                    [() => !!error, () => <GeolocationError error={error} />],
                    [T, () => null],
                ])()}
            </div>
        </GeolocationContext.Provider>
    );
};

export default App;
